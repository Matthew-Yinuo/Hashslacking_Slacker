import requiresAuth from '../permissions';
import { PubSub, withFilter } from "graphql-subscriptions"; 

const pubsub = new PubSub();

const NEW_CHANNEL_MESSAGE = "NEW_CHANNEL_MESSAGE"; 


export default {
    Subscription: {
        newChannelMessage: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(NEW_CHANNEL_MESSAGE),
                (payload, args) => payload.channelId === args.channelId
            )
        }
    }, 
    DirectMessage: {
        sender: ({ sender, senderId }, args, { models }) => {
            if (sender) {
                return sender;
            }

            return models.User.findOne({ where: { id: senderId } }, { raw: true });
        },
    },
    Query: {
        directMessages: requiresAuth.createResolver(async (parent, { teamId, otherUserId }, { models, user }) =>
            models.DirectMessage.findAll(
                {
                    order: [['created_at', 'ASC']],
                    where: {
                        teamId,
                        [models.sequelize.Op.or]: [
                            {
                                [models.sequelize.Op.and]: [{ receiverId: otherUserId }, { senderId: user.id }],
                            },
                            {
                                [models.sequelize.Op.and]: [{ receiverId: user.id }, { senderId: otherUserId }],
                            },
                        ],
                    },
                },
                { raw: true },
            )),
    },
    Mutation: {
        createDirectMessage: requiresAuth.createResolver(async (parent, args, { models, user }) => {
            try {
                const directMessage = await models.DirectMessage.create({
                    ...args,
                    senderId: user.id,
                });

                const asyncFunc = async () => {
                 const currentUser = await models.User.findOne({
                    where: {
                       id: user.id,
                     },
                   });

                 pubsub.publish(NEW_CHANNEL_MESSAGE, {
                    channelId: args.channelId,
                    newChannelMessage: {
                      ...message.dataValues,
                      user: currentUser.dataValues,
                     },
                   });
                 };

                // asyncFunc();

                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }),
    },
};