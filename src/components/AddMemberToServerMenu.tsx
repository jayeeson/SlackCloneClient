import { FormControl, InputLabel, NativeSelect, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import React, { Fragment, memo, useState } from 'react';
import { connect } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { ChatServer, ChatUser } from '../types';
import IAddMenu from './subcomponents/IAddMenu';

const useStyles = makeStyles({
  userComboBox: {
    paddingTop: '2rem',
    width: '100%',
  },
});

const AddMemberToServerMenu = ({
  menuOpen,
  setMenuOpen,
  activeServer,
  servers,
  users,
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeServer: ChatServer | undefined;
  servers: ChatServer[];
  users: ChatUser[];
}) => {
  const [addFromServer, setAddFromServer] = useState<number>(0);
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const onFormSubmit = () => {
    setMenuOpen(false);
    // dispatch(createChannel({ channelName, serverId: activeServerId, isPrivate: false }));

    setAddFromServer(0);
  };

  const onServerSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAddFromServer(parseInt(e.target.value, 10));
  };

  const userOptions = addFromServer && users.filter(user => user);

  const renderExtraContent = () => {
    return (
      <Fragment>
        <FormControl style={{ width: 396 }}>
          <InputLabel htmlFor="server-native-helper">Server</InputLabel>
          <NativeSelect
            value={addFromServer}
            onChange={onServerSelectChange}
            inputProps={{
              name: 'server',
              id: 'server-native-helper',
            }}
          >
            <option aria-label="None" value={0} />
            {servers.map(server => (
              <option key={server.id} value={server.id}>{`${server.name}#${server.id}`}</option>
            ))}
          </NativeSelect>
          <Autocomplete
            id="combo-box-demo"
            className={classes.userComboBox}
            options={[]}
            getOptionLabel={option => option}
            renderInput={params => <TextField {...params} label="user" variant="outlined" />}
          />
        </FormControl>
      </Fragment>
    );
  };

  return (
    <IAddMenu
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      onSubmit={onFormSubmit}
      titleProps={{ children: `Invite users to ${activeServer?.name}` }}
      description={{ children: 'Select which server to invite from' }}
      extraContent={renderExtraContent()}
    />
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    activeServer: Object.values(state.chat.servers).find(server => server.id === state.chat.activeServerId),
    servers: Object.values(state.chat.servers),
    users: Object.values(state.chat.users),
  };
};

export default memo(connect(mapStateToProps)(AddMemberToServerMenu));
