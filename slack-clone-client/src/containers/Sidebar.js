import React from 'react';
import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/addChannelModal';
import InvitePeopleModal from '../components/invitePeopleModal';
import DMModal from "../components/dmModal";


export default class Sidebar extends React.Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false,
    openDMModal: false,
  };

   handleToggleChannelModal = () => {
     this.setState({openAddChannelModal: !this.state.openAddChannelModal})
   }

  handleToggleInvitePeopleModal= () => {
    this.setState({openInvitePeopleModal: !this.state.openInvitePeopleModal})
  }
  handleToggleDMModal = () => {
    this.setState({ openDMModal: !this.state.openDMModal });
  }

  render() {
    const { teams, team, username} = this.props;
    const { openInvitePeopleModal, openAddChannelModal ,openDMModal} = this.state;
    
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
        onDMClick={this.handleToggleDMModal}
        isOwner={team.admin}
      />,
      <DMModal
        teamId={team.id}
        onClose={this.handleToggleDMModal}
        open={openDMModal}
        key="sidebar-dm-modal"
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