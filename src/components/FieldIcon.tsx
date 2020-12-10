import React from 'react';
import { ChatOutlined, MoreVert } from '@material-ui/icons';
import { GoMention } from 'react-icons/go';

const icons: { [idx: string]: any } = {
  threads: ChatOutlined,
  mentions: GoMention,
  more: MoreVert,
};

const FieldIcon = ({ name }: { name: string }) => {
  const IconComponent = icons[name.toLocaleLowerCase()];
  return IconComponent ? <IconComponent /> : null;
};

export default FieldIcon;
