import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { capitalizeFirstLetter } from '../utils/text';
import { createServer } from '../store/chat';

const useStyles = makeStyles(theme => ({
  closeAddServerMenuButton: {
    width: '36px',
    minWidth: '36px',
    height: '36px',
    margin: '0 4px',
  },
  addServerMenuCreateButton: {
    width: '65px',
    minWidth: '65px',
    margin: '10px 16px',
    background: theme.palette.success.dark,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  addServerTextField: {
    '&:focus': {
      cursor: 'pointer',
    },
  },
}));

const AddServerMenu = ({
  addServerMenuOpen,
  setAddServerMenuOpen,
  username,
}: {
  addServerMenuOpen: boolean;
  setAddServerMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  username?: string;
}) => {
  const [serverNameField, setServerNameField] = useState(username ? `${capitalizeFirstLetter(username)}'s Server` : '');

  useEffect(() => {
    setServerNameField(username ? `${capitalizeFirstLetter(username)}'s Server` : ''); // default value
  }, [username]);

  const dispatch = useAppDispatch();
  const classes = useStyles();

  const onServerCreateSubmit = () => {
    setAddServerMenuOpen(false);
    dispatch(createServer({ serverName: serverNameField }));
  };

  return (
    <Dialog maxWidth="xs" fullWidth open={addServerMenuOpen} onClose={() => setAddServerMenuOpen(false)}>
      <div style={{ display: 'flex' }}>
        <DialogTitle style={{ flex: '1' }}>Create a new Server</DialogTitle>
        <DialogActions>
          <Button className={classes.closeAddServerMenuButton} onClick={() => setAddServerMenuOpen(false)}>
            <Close fontSize="large" />
          </Button>
        </DialogActions>
      </div>
      <DialogContent>
        <DialogContentText>
          {
            'Create your own server! Then you can invite whoever you like to join  Customize it now or later. Give it a good name!'
          }
        </DialogContentText>
        <TextField
          required
          color="secondary"
          autoFocus
          margin="dense"
          label="Server Name"
          fullWidth
          defaultValue={serverNameField}
          variant="outlined"
          onChange={e => setServerNameField(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          disabled={Boolean(!serverNameField.length)}
          variant="contained"
          className={classes.addServerMenuCreateButton}
          onClick={onServerCreateSubmit}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state: RootState) => {
  return { username: state.chat.user?.username };
};

export default memo(connect(mapStateToProps)(AddServerMenu));
