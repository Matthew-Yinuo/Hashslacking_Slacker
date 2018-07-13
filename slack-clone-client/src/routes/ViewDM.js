import React from 'react';
import { compose, graphql } from 'react-apollo';
import findIndex from 'lodash/findIndex';
import { Redirect } from 'react-router-dom';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Header from "../components/Header";
import Sidebar from '../containers/Sidebar';
import DMContainer from '../containers/DMContainer';
import { meQuery } from '../graphql/team';
import gql from 'graphql-tag';

const ViewTeam = ({ mutate, data: { loading, me }, match: { params: { teamId, userId } } }) => {
  if (loading) {
    return null;
  }

  const { username, teams } = me;

  if (!teams.length) {
    return <Redirect to="/create-team" />;
  }

  const teamIdInteger = parseInt(teamId, 10);
  const teamIdx = teamIdInteger ? findIndex(teams, ['id', teamIdInteger]) : 0;
  const team = teamIdx === -1 ? teams[0] : teams[teamIdx];

  return (
    <AppLayout>
        <Sidebar
            teams={teams.map(t => ({
                    id: t.id,
                    letter: t.name.charAt(0).toUpperCase(),
                }))}
            team={team}
            username={username}
            />
        <Header channelName={"Name Here"} />
        <DMContainer teamId={teamId}  userId={userId}/>
        <SendMessage
            onSubmit={async (text) => {
            await mutate({
            variables: {
                text,
                receiverId: userId,
            },
            });
            }}
            placeholder={userId}
            />
      </AppLayout>
  );
};

const createDirectMessageMutation = gql`
    mutation($receiverId: Int!, $text: String!) {
    createDirectMessage(receiverId: $receiverId, text: $text)
  }
`;

export default compose(
  graphql(meQuery, { options: { fetchPolicy: 'network-only' } }),
  graphql(createDirectMessageMutation),
)(ViewTeam);
