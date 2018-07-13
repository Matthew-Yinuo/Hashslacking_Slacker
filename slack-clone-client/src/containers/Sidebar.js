import React from 'react';
import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/addChannelModal';
import InvitePeopleModal from '../components/invitePeopleModal';


export default class Sidebar extends React.Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false,
  };

   handleToggleChannelModal = () => {
     this.setState({openAddChannelModal: !this.state.openAddChannelModal})
   }

  handleToggleInvitePeopleModal= () => {
    this.setState({openInvitePeopleModal: !this.state.openInvitePeopleModal})
  }

  render() {
    const { teams, team, username} = this.props;
    const { openInvitePeopleModal, openAddChannelModal } = this.state;
    
    return [
      <Teams key="team-sidebar" teams={teams} />,
      <Channels
        key="channels-sidebar"
        teamName={team.name}
        username={username}
        teamId={team.id}
        channels={team.channels}
        users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
        onAddChannelClick={this.handleToggleChannelModal}
        onInvitePeopleClick={this.handleToggleInvitePeopleModal}
        isOwner={team.admin}
      />,
      <AddChannelModal
        teamId={team.id}
        onClose={this.handleToggleChannelModal}
        open={openAddChannelModal}
        key="sidebar-add-channel-modal"
      />,
      <InvitePeopleModal
        teamId={team.id}
        onClose={this.handleToggleInvitePeopleModal}
        open={openInvitePeopleModal}
        key="invite-people-modal"
      />,
    ];
  }
}