import * as React from 'react';
import ListItem from './ListItem';
import { Title } from '../interfaces';

type Props = {
  items: Title[];
};

let TitleList = ({ items }: Props) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
);

export default TitleList;