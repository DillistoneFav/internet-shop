import { observer } from 'mobx-react';
import React, { useContext } from "react";
import { Context } from "../../index";
import DeviceItem from './DeviceItem/DeviceItem';
import Row from 'react-bootstrap/esm/Row';
import classes from './DeviceList.module.css'

const DeviceList = observer(() => {
    const { device } = useContext(Context);
    return (
        <Row className={classes.devicesCont}>
            {device.devices.map(item => {
                return <DeviceItem key={item.id} device={item}/>
            })}
        </Row>
    );
});

export default DeviceList;