import React from "react";
import Grid from "../components/Grid/Grid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Game() {
  return (
    <div>
      <Row>
        <Col md={8}>
          <Grid />
        </Col>
        <Col md={4}></Col>
      </Row>
    </div>
  );
}
