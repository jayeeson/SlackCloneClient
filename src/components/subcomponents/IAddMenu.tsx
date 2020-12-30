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
import React, { Fragment, ReactNode } from 'react';

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
  extraContent?: ReactNode;
}

const IAddMenu = ({
  menuOpen,
  setMenuOpen,
  onSubmit,
  titleProps,
  description,
  textFields,
  validation,
  extraContent,
}: IAddMenuProps) => {
  const classes = useStyles();

  const convertDisabled = () => {
    if (!validation) {
      return false;
    } else if (typeof validation === 'boolean') {
      return validation;
    } else {
      return (
        (validation.firstFieldRequired && !(textFields[0].value as string).length) ||
        (validation.secondFieldRequired && !(textFields[1].value as string).length)
      );
    }
  };

  const disabled = convertDisabled();

  const renderTextFields = () => {
    return (
      <Fragment>
        {textFields.map((textField, index) => (
          <TextField
            required={Array.isArray(validation) && validation.find(element => element === index + 1) !== undefined}
            color="secondary"
            margin="dense"
            fullWidth
            variant="outlined"
            label={textField?.label ?? `TextField${index + 1}`}
            onKeyPressCapture={e => e.key === 'Enter' && !convertDisabled() && onSubmit()}
            {...textField}
          />
        ))}
      </Fragment>
    );
  };

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
        {extraContent}
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
