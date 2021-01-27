import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, ReactElement, RefObject } from 'react';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  mainContainer: {
    maxHeight: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    maxWidth: '100%',
    width: '100%',
    marginBottom: '1px',
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
    flexGrow: 1,
    alignSelf: 'flex-start',
  },
  header: {
    verticalAlign: 'middle',
    maxHeight: '60px',
    minHeight: '60px',
  },
  headerContent: {
    marginLeft: 18,
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
  },
});

export interface IMainPanelProps {
  header: string;
  children: ReactElement;
  setRef: RefObject<HTMLDivElement>;
}

const IMainPanelContent = ({ header, children, setRef }: IMainPanelProps) => {
  const classes = useStyles();

  return (
    <Fragment>
      <div id="panelHeading" className={classes.header}>
        <div className={classes.headerContent}>{header}</div>
      </div>
      <Divider />
      <div ref={setRef} className={classes.mainContainer}>
        {children}
      </div>
    </Fragment>
  );
};

export default connect()(IMainPanelContent);
