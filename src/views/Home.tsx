import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import PlayModeCard from "../components/UI/PlayMode";

export default function Main() {
  const privateRoom = () => {};

  const publicRoom = () => {};

  return (
    <div className="pt-4">
      <Row className="justify-content-center pt-4">
        <Col md={6} className="d-flex justify-content-center ">
          <PlayModeCard
            title="Private Room"
            description="Créer une chambre privée où vous inviter vos amis pour vous rejoindre"
            link="Go Now"
            image="/imgs/matching.svg"
          />
        </Col>
        <Col md={6} className="d-flex justify-content-center">
          <PlayModeCard
            title="Public Room"
            description="Chercher autres joueurs à rejoindre"
            link="Go Now"
            image="/imgs/private.svg"
          />
        </Col>
      </Row>
    </div>
  );
}
