import React, { useContext } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react";
import ListGroup from "react-bootstrap/ListGroup";
import classes from "./TypeBar.module.css";

const TypeBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <div>
      <h2 className={classes.title}>Types</h2>
      <ListGroup className={classes.mainCont}>
        {device.types.map((item) => {
          return (
            <ListGroup.Item
              style={{ cursor: "pointer" }}
              active={item.id === device.selectedType.id}
              onClick={() => device.setSelectedType(item)}
              key={item.id}
            >
              {item.name}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
});

export default TypeBar;
