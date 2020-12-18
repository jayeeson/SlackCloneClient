import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  TextFieldProps,
  DialogTitleProps,
  DialogContentTextProps,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import React, { Fragment, useState } from 'react';

const useStyles = makeStyles(theme => ({
  closeButton: {
    width: '36px',
    minWidth: '36px',
    height: '36px',
    margin: '0 4px',
  },
  createButton: {
    width: '65px',
    minWidth: '65px',
    margin: '10px 16px',
    background: theme.palette.success.dark,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  textField: {
    '&:focus': {
      cursor: 'pointer',
    },
  },
}));

export interface IAddMenuProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => void;
  titleProps: DialogTitleProps;
  description: DialogContentTextProps;
  textFields: TextFieldProps[];
  validation?: boolean | { firstFieldRequired?: boolean; secondFieldRequired?: boolean };
}

const IAddMenu = ({
  menuOpen,
  setMenuOpen,
  onSubmit,
  titleProps,
  description,
  textFields,
  validation,
}: IAddMenuProps) => {
  const [textField1Content, setTextField1Content] = useState('');
  const [textField2Content, setTextField2Content] = useState('');

  const classes = useStyles();

  const renderTextFields = () => {
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index: number) => {
      if (index === 0) {
        setTextField1Content(e.target.value);
      } else if (index === 1) {
        setTextField2Content(e.target.value);
      }
    };

    return (
      <Fragment>
        {textFields.map((textField, index) => (
          <TextField
            required={Array.isArray(validation) && validation.find(element => element === index + 1) !== undefined}
            color="secondary"
            autoFocus
            margin="dense"
            fullWidth
            variant="outlined"
            label={textField?.label ?? `TextField${index + 1}`}
            defaultValue={
              textField?.defaultValue ?? index === 0
                ? textField1Content
                : index === 1
                ? textField2Content
                : 'implementation supports two text fields max'
            }
            onChange={e => onChange(e, index)}
            value={index === 0 ? textField1Content : index === 1 ? textField2Content : ''}
            {...textField}
          />
        ))}
      </Fragment>
    );
  };

  const convertDisabled = () => {
    if (!validation) {
      return false;
    } else if (typeof validation === 'boolean') {
      return validation;
    } else {
      return (
        (validation.firstFieldRequired && !textField1Content.length) ||
        (validation.secondFieldRequired && !textField2Content.length)
      );
    }
  };

  const disabled = convertDisabled();

  return (
    <Dialog maxWidth="xs" fullWidth open={menuOpen} onClose={() => setMenuOpen(false)}>
      <div style={{ display: 'flex' }}>
        <DialogTitle style={{ flex: '1' }} {...titleProps}>
          {titleProps?.children}
        </DialogTitle>
        <DialogActions>
          <Button className={classes.closeButton} onClick={() => setMenuOpen(false)}>
            <Close fontSize="large" />
          </Button>
        </DialogActions>
      </div>
      <DialogContent>
        <DialogContentText {...description}>{description?.children}</DialogContentText>
        {renderTextFields()}
      </DialogContent>
      <DialogActions>
        <Button disabled={disabled} variant="contained" className={classes.createButton} onClick={onSubmit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IAddMenu;
