import { observer } from "mobx-react";
import React, { useContext } from "react";
import { Context } from "../../index";
import ListGroup from "react-bootstrap/ListGroup";
import classes from "./BrandBar.module.css";

const BrandBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <div>
      <h2 className={classes.title}>Brands</h2>
      <ListGroup className={classes.mainCont}>
        {device.brands.map((item) => {
          return (
            <ListGroup.Item
              className={classes.rowItem}
              active={item.id === device.selectedBrand.id}
              onClick={() => device.setSelectedBrand(item)}
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

export default BrandBar;
