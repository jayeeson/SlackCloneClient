import { List } from '@material-ui/core';
import React, { createRef, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { ChatChannel, ChatMessage } from '../types';
import IMainPanelContent from './subcomponents/IMainPanelContent';
import MsgItem from './MsgItem';

const MsgList = ({ messages, activeChannel }: { messages: ChatMessage[]; activeChannel: ChatChannel | undefined }) => {
  const [listHeightBeforeNewMessageAdded, setListHeightBeforeNewMessageAdded] = useState(0);

  const containerRef = createRef<HTMLDivElement>();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (containerRef?.current && listRef?.current) {
      const { height: containerHeight } = containerRef.current.getBoundingClientRect();
      const { height: listHeight } = listRef.current.getBoundingClientRect();
      const { scrollTop } = containerRef.current;
      const tolerance = 40; //px, defines zone where autoscroll occurs on new message
      if (
        scrollTop + tolerance >= listHeightBeforeNewMessageAdded - containerHeight &&
        listHeightBeforeNewMessageAdded > 100
      ) {
        containerRef.current.scrollBy(0, listHeight - listHeightBeforeNewMessageAdded + tolerance);
      }
    }
  }, [messages, listHeightBeforeNewMessageAdded, containerRef]);

  useEffect(() => {
    if (listRef?.current) {
      setListHeightBeforeNewMessageAdded(listRef.current.getBoundingClientRect().height);
    }
  }, [messages]);

  const renderMessageList = () => {
    return messages.map(message => <MsgItem key={message.id} message={message} />);
  };

  return (
    <IMainPanelContent header={`#${activeChannel?.name}`} setRef={containerRef}>
      <List id="messageList" ref={listRef}>
        {renderMessageList()}
      </List>
    </IMainPanelContent>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    messages: Object.values(state.chat.messages).filter(message => message.channelId === state.chat.activeChannelId),
    activeChannel: Object.values(state.chat.channels).find(channel => channel.id === state.chat.activeChannelId),
  };
};

export default connect(mapStateToProps)(MsgList);
