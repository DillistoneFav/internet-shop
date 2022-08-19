import React from 'react';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import classes from "../DevicePage.module.css";

const DesctiptionColumn = ({device}) => {
    return (
        <Col md={4}>
          <Row
            className={`${classes.desc} d-flex flex-column align-items-start`}
          >
            <div className={classes.charTop}>Specifications</div>
            {device.info.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className={classes.descRows}
                  style={
                    index % 2
                      ? { backgroundColor: "lightgray" }
                      : { backgroundColor: "white" }
                  }
                >
                  {item.title}: {item.description}
                </div>
              );
            })}
          </Row>
        </Col>
    );
};

export default DesctiptionColumn;