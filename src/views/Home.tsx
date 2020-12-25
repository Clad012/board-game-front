import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PlayModeCard from "../components/UI/PlayMode";
import { v4 as uuidv4 } from "uuid";
import { appendFile } from "fs";

export default function Main() {
  useEffect(() => {
    fetch("https://board-game-server.glitch.me/");
  }, []);

  return (
    <div className="pt-4">
      <h2 className="text-center">&nbsp;</h2>
      <Row className="justify-content-center pt-4">
        <Col md={6} className="d-flex justify-content-center ">
          <PlayModeCard
            title="Private Room"
            description="Créer un salon privée et vous inviter vos amis pour vous rejoindre."
            link={`/play?room=private&room_id=${uuidv4()}`}
            action="Créer un salon privé"
            image="/imgs/matching.svg"
          />
        </Col>
        <Col md={6} className="d-flex justify-content-center">
          <PlayModeCard
            title="Public Room"
            description="Chercher des joueurs pour vous rejoindre. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
            link={`/play?room=public`}
            action="Chercher des joueurs"
            image="/imgs/private.svg"
          />
        </Col>
      </Row>
    </div>
  );
}
