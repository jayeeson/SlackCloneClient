import { makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import Divider from './Divider';

const validateWidth = (width: number | string | null, minWidth?: number, maxWidth?: number) => {
  if (!width) {
    return null;
  }
  const num = typeof width === 'string' ? parseInt(width, 10) : width;
  if (minWidth && num < minWidth) {
    return minWidth;
  }
  if (num < 0) {
    return minWidth || 150;
  }
  if (maxWidth && num > maxWidth) {
    return maxWidth;
  }
  return num;
};

const useStyles = makeStyles(() => ({
  root: {
    background: 'linear-gradient(180deg, #636363 30%, #333333 90%)',
  },
  sidebar: (props: StylesProps) => ({
    flex: `0 0 ${props.sidebar.width}`,
    // display: 'none',
  }),
  paper: {
    height: '50%',
    width: '100%',
    margin: '0 auto',
  },
  workspace: {},
  flexItem: {
    height: '100vh',
    backgroundColor: '#f1f1f1',
    margin: '0 0',
    padding: 10,
  },
  flexContainer: {
    display: 'flex',
    backGroundColor: 'DodgerBlue',
    width: '100%',
  },
  viewMessages: {
    width: '100%',
    flexGrow: 1,
  },
  viewMenu: (props: StylesProps) => ({
    flex: `0 0 ${props.viewPanel.width}px`,
  }),
  divider: {
    flex: '0 0 6px',
    backgroundColor: 'red',
  },
  boxie: {
    backgroundColor: 'blue',
  },
}));

interface StylesProps {
  sidebar: {
    width: number;
  };
  viewPanel: {
    width: number;
  };
}

const Panels = () => {
  const [sidebarWidth, setSidebarWidth] = useState(validateWidth(localStorage.getItem('sidebarWidth')) || 250);
  const [viewPanelWidth, setviewPanelWidth] = useState(validateWidth(localStorage.getItem('viewPanelWidth')) || 250);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const viewPanelRef = useRef<HTMLDivElement>(null);

  const isMinWidth600 = useMediaQuery('(min-width:600px)');

  useEffect(() => {
    console.log(isMinWidth600);
  }, [isMinWidth600]);

  const classes = useStyles({ sidebar: { width: sidebarWidth }, viewPanel: { width: viewPanelWidth } });

  return (
    <div className={classes.flexContainer}>
      <div ref={sidebarRef} className={clsx(classes.sidebar, classes.flexItem)}>
        one
      </div>
      <Divider
        width={sidebarWidth}
        setWidth={setSidebarWidth}
        widthRef={sidebarRef}
        storeLocal="sidebarWidth"
        minWidth={150}
        maxWidth={600}
      />
      <div className={clsx(classes.viewMessages, classes.flexItem)}>two</div>
      <Divider
        width={viewPanelWidth}
        setWidth={setviewPanelWidth}
        widthRef={viewPanelRef}
        openLeft
        storeLocal="viewPanelWidth"
        minWidth={150}
        maxWidth={600}
      />
      <div ref={viewPanelRef} className={clsx(classes.flexItem, classes.viewMenu)}>
        <Typography>three</Typography>
      </div>
    </div>
  );
};

export default Panels;
