import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Comment } from "semantic-ui-react";

import Messages from "../components/Messages";


class DMMessageContainer extends React.Component {
  render() {
    const {
      data: { loading, directMessages }
    } = this.props;
    return loading ? null : (
      <Messages>
        <Comment.Group>
          {directMessages.map(m => (
            <Comment key={`${m.id}-message`}>
              <Comment.Content>
                <Comment.Author as="a">{m.user.username}</Comment.Author>
                <Comment.Metadata>
                  <div>{m.created_at}</div>
                </Comment.Metadata>
                <Comment.Text>{m.text}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Messages>
    );
  }
}

const directMessagesQuery = gql`
  query($teamId: Int!,$otherUserId: Int!) {
    directMessages(teamId:$teamId, otherUserId:$otherUserId) {
      id
      sender {
        username
      }
      text
      created_at
    }
  }
`;

export default graphql(directMessagesQuery, {
  variables: props => ({
    teamId: props.teamId,
    otherUserId: props.otherUserId
  }),
  options: {
    fetchPolicy: "network-only"
  }
})(DMMessageContainer);
