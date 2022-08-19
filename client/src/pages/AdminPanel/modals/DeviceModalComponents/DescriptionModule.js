import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const DescriptionModule = ({ descriptionProps, setDescriptionProps }) => {
  const changeInfo = (key, value, number) => {
    setDescriptionProps(
      descriptionProps.map((item) =>
        item.number === number ? { ...item, [key]: value } : item
      )
    );
  };
  const removeInfo = (number) => {
    setDescriptionProps(descriptionProps.filter((i) => i.number !== number));
  };
  const addProperty = () => {
    setDescriptionProps([
      ...descriptionProps,
      { title: "", description: "", number: Date.now() },
    ]);
  };

  return (
    <div>
      <Button variant="outline-dark" onClick={addProperty}>
        Add new property
      </Button>
      {descriptionProps.map((i) => (
        <Row className="mt-4" key={i.number}>
          <Col md={4}>
            <Form.Control
              value={i.title}
              onChange={(e) => changeInfo("title", e.target.value, i.number)}
              placeholder="Enter property name"
            />
          </Col>
          <Col md={4}>
            <Form.Control
              value={i.description}
              onChange={(e) =>
                changeInfo("description", e.target.value, i.number)
              }
              placeholder="Enter description of property"
            />
          </Col>
          <Col md={4}>
            <Button
              onClick={() => removeInfo(i.number)}
              variant={"danger"}
            >
              Remove
            </Button>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default DescriptionModule;
