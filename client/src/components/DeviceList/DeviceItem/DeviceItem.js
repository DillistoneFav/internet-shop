import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Card from 'react-bootstrap/esm/Card';
import Image from 'react-bootstrap/esm/Image';
import classes from './DeviceItem.module.css';
import { StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../../../utils/constants';

const DeviceItem = ({device}) => {
    const navigate = useNavigate();

    return (
        <Col md={3} className="mt-3" onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)}>
            <Card className={classes.cardEx} >
                <Image className={classes.imgCont} src={device.img}/>
                <div className={classes.botTop}>
                    <div>Samsung</div>
                    <div>
                        <div className={classes.rating}>
                            {device.rating}
                            <StarOutlined />
                        </div>
                    </div>
                    
                </div>
                <div className={classes.deviceName}>{device.name}</div>
                <div className="d-flex align-items-start">{device.price}₽</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;