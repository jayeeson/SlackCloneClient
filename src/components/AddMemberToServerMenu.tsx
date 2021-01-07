import { Chip, FormControl, InputLabel, NativeSelect, TextField } from '@material-ui/core';
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
  iconColorPrimary: {
    color: '#ffff55',
  },
});

interface SelectedUsers {
  userId: number;
  username: string;
}

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
  const [selectedUsers, setSelectedUsers] = React.useState<SelectedUsers[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const onFormSubmit = () => {
    setMenuOpen(false);
    ///\todo: dispatch invite to server DM to selected users
    // dispatch(createChannel({ channelName, serverId: activeServerId, isPrivate: false }));

    setAddFromServer(0);
  };

  const onServerSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAddFromServer(parseInt(e.target.value, 10));
  };

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
            getOptionSelected={(option, value) => option.userId === value.userId}
            value={selectedUsers}
            onChange={(event: any, newValue: SelectedUsers[]) => {
              setSelectedUsers(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            multiple
            id="combo-box-demo"
            className={classes.userComboBox}
            options={
              servers
                .find(server => server.id === addFromServer)
                ?.userIds.map(userId => {
                  const thisUser = users.find(user => user.id === userId);
                  return { username: thisUser?.username || '', userId: thisUser?.id || 0 };
                }) || []
            }
            getOptionLabel={option => option.username || ''}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={option.userId}
                  label={`${option.username}#${option.userId}`}
                  color="primary"
                  size="small"
                  {...getTagProps({ index })}
                />
              ))
            }
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
      buttonText="INVITE"
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
