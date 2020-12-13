import { makeStyles } from '@material-ui/core/styles';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DraggablePanel } from '../types';
import usePanel from '../hooks/usePanel';

export interface DividerProps {
  panel: DraggablePanel;
  position: number;
  thisWidth: number;
  minWidth?: number;
  maxWidth?: number;
  openLeft?: boolean;
  storeLocal?: boolean;
  display?: string;
}

const useStyles = makeStyles(theme => ({
  root: (props: any) => ({
    flex: `0 0 ${props.forceOddThisWidth}px`,
    cursor: 'default',
    display: props.display || 'inline',
    boxSizing: 'border-box',
    position: 'absolute',
    left: `${props.positionCenterOfDivider}px`,
    top: '0px',
  }),
  childInactive: (props: any) => ({
    alignItems: 'left',
    borderRight: `1px solid ${theme.palette.divider}`,
    height: '100vh',
    width: props.childDivWidth,
  }),
  childActive: (props: any) => ({
    alignItems: 'left',
    borderRight: '5px solid #22D2D2',
    height: '100vh',
    width: props.childWidthOnHover,
  }),
}));

const DraggableDivider = ({
  panel,
  position,
  thisWidth,
  minWidth,
  maxWidth,
  openLeft = false,
  storeLocal,
}: DividerProps) => {
  const [panelWidth, setWidth, display] = usePanel(panel);
  const [dragStartClientStartPos, setDragStartClientStartPos] = useState(0);
  const [dragStartElementWidth, setDragStartElementWidth] = useState(panelWidth);
  const [resizeEvent, setResizeEvent] = useState(false);
  const childDivRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const forceOddThisWidth = thisWidth % 2 === 0 ? thisWidth + 1 : thisWidth;
  const childDivWidth = (forceOddThisWidth - 1) / 2 + 1;
  const childWidthOnHover = childDivWidth + 2;
  const positionCenterOfDivider = position - (thisWidth - 1) / 2 + (openLeft ? 0 : -1);

  const classes = useStyles({
    forceOddThisWidth,
    display,
    childDivWidth,
    childWidthOnHover,
    positionCenterOfDivider: positionCenterOfDivider,
  });

  useEffect(() => {
    if (storeLocal && panelWidth) {
      localStorage.setItem(panel, panelWidth.toString());
    }
  }, [storeLocal, panelWidth, panel]);

  const onDividerDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (panelWidth) {
      e.preventDefault();
      setDragStartClientStartPos(e.clientX);
      setDragStartElementWidth(panelWidth);
      setResizeEvent(true);
    }
  };

  const onDividerDrag = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (dragStartElementWidth && setWidth) {
        const desiredNewWidth = openLeft
          ? dragStartElementWidth - e.clientX + dragStartClientStartPos
          : dragStartElementWidth + e.clientX - dragStartClientStartPos;
        ///\todo: max width to be based on media query so nothing out of bounds of screen size
        // minWidth
        const newWidth =
          minWidth && desiredNewWidth < minWidth
            ? minWidth
            : maxWidth && desiredNewWidth > maxWidth
            ? maxWidth
            : desiredNewWidth;
        dispatch(setWidth({ width: newWidth }));

        if (childDivRef && childDivRef.current) {
          childDivRef.current.className = classes.childActive;
        }
      }
    },
    [
      classes.childActive,
      dispatch,
      dragStartClientStartPos,
      dragStartElementWidth,
      maxWidth,
      minWidth,
      openLeft,
      setWidth,
    ]
  );

  const onSidebarDividerDragEnd = useCallback(
    (event: MouseEvent) => {
      window.removeEventListener('mousemove', onDividerDrag);
      window.removeEventListener('mouseup', onSidebarDividerDragEnd);
      setResizeEvent(false);
      if (childDivRef && childDivRef.current) {
        const cursorX = event.clientX;
        const halfWidth = (thisWidth - 1) / 2;
        const isMouseOnDivider =
          cursorX >= positionCenterOfDivider - halfWidth && cursorX <= positionCenterOfDivider + halfWidth;
        if (!isMouseOnDivider) {
          childDivRef.current.className = classes.childInactive;
        }
      }
    },
    [classes.childInactive, onDividerDrag, positionCenterOfDivider, thisWidth]
  );

  const onMouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.currentTarget.style.cursor = 'col-resize';
    if (childDivRef && childDivRef.current) {
      childDivRef.current.className = classes.childActive;
    }
  };

  const onMouseOut = () => {
    if (childDivRef && childDivRef.current) {
      childDivRef.current.className = classes.childInactive;
    }
  };

  useEffect(() => {
    if (resizeEvent) {
      window.addEventListener('mousemove', onDividerDrag);
      window.addEventListener('mouseup', onSidebarDividerDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onDividerDrag);
      window.removeEventListener('mouseup', onSidebarDividerDragEnd);
    };
  }, [onDividerDrag, onSidebarDividerDragEnd, resizeEvent]);

  return (
    <React.Fragment>
      <div className={classes.root} onMouseDown={onDividerDragStart} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        <div ref={childDivRef} className={classes.childInactive}></div>
      </div>
    </React.Fragment>
  );
};

export default memo(DraggableDivider);
