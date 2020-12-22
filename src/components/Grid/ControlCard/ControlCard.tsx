import React, { useState } from "react";
import Card from "react-bootstrap/Card";

import "./ControlCard.css";

interface actionType {
  checkMovement: (x: string) => void;
  actionsLeft: number;
  isPlayer1: boolean;
}

const nextTornados: JSX.Element[] = [];
for (let i = 1; i <= 4; i++) {
  nextTornados.push(<span className="tornado-guide next-tornado-guide"></span>);
}

const tornados: JSX.Element[] = [];
for (let i = 1; i <= 4; i++) {
  tornados.push(<span className="tornado-guide active-tornado-guide"></span>);
}

const bothTornado: JSX.Element[] = [];
for (let i = 1; i <= 4; i++) {
  bothTornado.push(
    <span className="tornado-guide active-tornado-guide both-tornados-guide"></span>
  );
}

export default function ControlCard(props: actionType) {
  const { checkMovement, actionsLeft, isPlayer1 } = props;
  return (
    <div>
      <Card>
        <Card.Body>
          <div>
            <h6>Contrôleur de position</h6>
            <div className="joystick-container">
              <div className="pad pad-up" onClick={() => checkMovement("up")}>
                <i className="arrow up"></i>
              </div>
              <div
                className="pad pad-right"
                onClick={() => checkMovement("right")}
              >
                <i className="arrow right"></i>
              </div>
              <div
                className="pad pad-down"
                onClick={() => checkMovement("down")}
              >
                <i className="arrow down"></i>
              </div>
              <div
                className="pad pad-left"
                onClick={() => checkMovement("left")}
              >
                <i className="arrow left"></i>
              </div>
              <div className=" pad-center"></div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
