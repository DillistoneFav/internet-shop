import React, { useContext } from "react";
import { Context } from "../../App";
import { observer } from "mobx-react";
import ListGroup from 'react-bootstrap/ListGroup';

const TypeBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <ListGroup>
      {device.types.map(item => {
        return <ListGroup.Item style={{cursor: 'pointer'}} active={item.id === device.selectedType.id} onClick={() => device.setSelectedType(item)} key={item.id}>{item.name}</ListGroup.Item>
      })}
    </ListGroup>
  );
});

export default TypeBar;
