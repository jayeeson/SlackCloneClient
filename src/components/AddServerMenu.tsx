import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { createServer } from '../store/chat';
import IAddMenu from './subcomponents/IAddMenu';

const AddServerMenu = ({
  addServerMenuOpen: menuOpen,
  setAddServerMenuOpen: setMenuOpen,
}: {
  addServerMenuOpen: boolean;
  setAddServerMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  username?: string;
}) => {
  const [serverNameField, setServerNameField] = useState('');
  const dispatch = useAppDispatch();

  const onServerCreateSubmit = () => {
    setMenuOpen(false);
    dispatch(createServer({ serverName: serverNameField }));
    setServerNameField('');
  };

  return (
    <IAddMenu
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      onSubmit={onServerCreateSubmit}
      titleProps={{ children: 'Create a new Server' }}
      description={{
        children:
          'Create your own server! Then you can invite whoever you like to join  Customize it now or later. Give it a good name!',
      }}
      textFields={[
        {
          label: 'Server Name',
          value: serverNameField,
          onChange: e => {
            setServerNameField(e.target.value);
          },
          autoFocus: true,
        },
      ]}
      validateTextFields={{ firstFieldRequired: true }}
    />
  );
};

const mapStateToProps = (state: RootState) => {
  return { username: state.chat.user?.username };
};

export default memo(connect(mapStateToProps)(AddServerMenu));
