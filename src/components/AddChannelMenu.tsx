import React, { Fragment, memo, useState } from 'react';
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
    ///\todo:  private controlled by ui toggle
    dispatch(createChannel({ channelName, serverId: activeServerId, isPrivate: false }));

    setChannelName('');
    setDescription('');
  };

  const renderExtraContent = () => {
    return <Fragment></Fragment>;
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
          autoFocus: true,
        },
        {
          label: 'Description (optional)',
          value: description,
          onChange: e => {
            setDescription(e.target.value);
          },
        },
      ]}
      validateTextFields={{ firstFieldRequired: true }}
      extraContent={renderExtraContent()}
    />
  );
};

const mapStateToProps = (state: RootState) => {
  return { activeServerId: state.chat.activeServerId };
};

export default memo(connect(mapStateToProps)(AddChannelMenu));
