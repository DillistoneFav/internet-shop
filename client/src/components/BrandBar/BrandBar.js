import { observer } from 'mobx-react';
import React, { useContext } from "react";
import { Context } from "../../index";
import ListGroup from 'react-bootstrap/ListGroup';
import classes from './BrandBar.module.css';



const BrandBar = observer(() => {
    const { device } = useContext(Context);
    return (
        <ListGroup className="d-flex mt-3">
        <h2>Brands</h2>
            {device.brands.map(item => {
                return <ListGroup.Item className={classes.rowItem} active={item.id === device.selectedBrand.id} onClick={() => device.setSelectedBrand(item)} key={item.id}>
                    {item.name}
                </ListGroup.Item>
            })}
        </ListGroup>
    );
});

export default BrandBar;