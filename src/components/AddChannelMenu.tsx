import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { createChannel } from '../store/chat';
import IAddMenu from './subcomponents/IAddMenu';

const AddChannelMenu = ({
  addChannelMenuOpen: menuOpen,
  setAddChannelMenuOpen: setMenuOpen,
  activeServerId,
}: {
  addChannelMenuOpen: boolean;
  setAddChannelMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeServerId: number;
}) => {
  const [channelName, setChannelName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch();

  const onChannelCreateSubmit = () => {
    setMenuOpen(false);
    dispatch(createChannel({ channelName, serverId: activeServerId, isPrivate: false }));
  };

  return (
    <IAddMenu
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      onSubmit={onChannelCreateSubmit}
      titleProps={{ children: 'Create a new Channel' }}
      description={{
        children: 'Here you can create your own channel! You can invite anyone you like, now or later.',
      }}
      textFields={[
        {
          label: 'Channel Name',
          value: channelName,
          onChange: e => {
            setChannelName(e.target.value);
          },
        },
        {
          label: 'Description (optional)',
          value: description,
          onChange: e => {
            setDescription(e.target.value);
          },
        },
      ]}
      validation={{ firstFieldRequired: true }}
    />
  );
};

const mapStateToProps = (state: RootState) => {
  return { activeServerId: state.chat.activeServerId };
};

export default memo(connect(mapStateToProps)(AddChannelMenu));
