import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PlayModeCard from "../components/UI/PlayMode";
import { v4 as uuidv4 } from "uuid";

export default function Main() {
  return (
    <div className="pt-4">
      <h2 className="text-center">&nbsp;</h2>
      <Row className="justify-content-center pt-4">
        <Col md={6} className="d-flex justify-content-center ">
          <PlayModeCard
            title="Private Room"
            description="Créer une chambre privée où vous inviter vos amis pour vous rejoindre"
            link={`/play?room=private&room_id=${uuidv4()}`}
            action="Go Now"
            image="/imgs/matching.svg"
          />
        </Col>
        <Col md={6} className="d-flex justify-content-center">
          <PlayModeCard
            title="Public Room"
            description="Chercher autres joueurs à rejoindre"
            link={`/play?room=public`}
            action="Go Now"
            image="/imgs/private.svg"
          />
        </Col>
      </Row>
    </div>
  );
}
