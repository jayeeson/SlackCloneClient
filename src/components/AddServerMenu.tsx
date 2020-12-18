import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { capitalizeFirstLetter } from '../utils/text';
import { createServer } from '../store/chat';
import IAddMenu from './subcomponents/IAddMenu';

const AddServerMenu = ({
  addServerMenuOpen: menuOpen,
  setAddServerMenuOpen: setMenuOpen,
  username,
}: {
  addServerMenuOpen: boolean;
  setAddServerMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  username?: string;
}) => {
  const [serverNameField, setServerNameField] = useState(username ? `${capitalizeFirstLetter(username)}'s Server` : '');

  useEffect(() => {
    setServerNameField(username ? `${capitalizeFirstLetter(username)}'s Server` : '');
  }, [username]);

  const dispatch = useAppDispatch();

  const onServerCreateSubmit = () => {
    setMenuOpen(false);
    dispatch(createServer({ serverName: serverNameField }));
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
        },
      ]}
      validation={{ firstFieldRequired: true }}
    />
  );
};

const mapStateToProps = (state: RootState) => {
  return { username: state.chat.user?.username };
};

export default memo(connect(mapStateToProps)(AddServerMenu));
