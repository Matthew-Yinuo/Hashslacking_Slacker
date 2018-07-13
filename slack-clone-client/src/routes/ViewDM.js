import React from "react";
import { compose, graphql } from "react-apollo";
import findIndex from "lodash/findIndex";
import { Redirect } from "react-router-dom";
import Header from "../components/Header";
import SendMessage from "../components/SendMessage";
import AppLayout from "../components/AppLayout";
import Sidebar from "../containers/Sidebar";
import MessageContainer from "../containers/MessageContainer";
import { meQuery } from "../graphql/team";
import gql from 'graphql-tag';

const ViewTeam = ({
    data: { loading, me, ...otherProps },
    match: {
        params: { teamId, userId }
    }
}) => {
    if (loading) {
        return null;
    }

    const { teams, username } = me;

    if (!teams.length) {
        return <Redirect to="/create-team" />;
    }

    const teamIdInteger = parseInt(teamId, 10);
    const teamIdx = teamIdInteger ? findIndex(teams, ["id", teamIdInteger]) : 0;
    const team = teamIdx === -1 ? teams[0] : teams[teamIdx];

    return (
        <AppLayout>
            <Sidebar
                teams={teams.map(t => ({
                    id: t.id,
                    letter: t.name.charAt(0).toUpperCase()
                }))}
                team={team}
                username={username}
            />
            <SendMessage onSubmit={() => {}} placeholder ={userId}/>
        </AppLayout>
    );
};

const createDirectMessageMutation = gql`
  mutation($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;

export default compose(
    graphql(meQuery, { options: { fetchPolicy: "network-only" } }),
    graphql(createDirectMessageMutation),
)(ViewTeam);
