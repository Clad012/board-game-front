import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./ControlCard.css";

interface actionType {
  checkMovement: (x: string) => void;
  actionsLeft: number;
  isPlayer1: boolean;
  isMyTurn: boolean;
  actions: number;
  skipTurn: () => void;
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
  const { checkMovement, isMyTurn, actions, isPlayer1, skipTurn } = props;
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
            <hr />
            Vous êtes le{" "}
            <span className={isPlayer1 ? "player-1" : "player-2"}>
              {isPlayer1 ? "Joueur 1" : "Joueur 2"}
            </span>
            <hr />
            <div>
              <span className={isMyTurn ? "myTurn" : "hisTurn"}>
                {isMyTurn
                  ? "C'est votre tour"
                  : "C'est le tour de votre adversaire"}
              </span>
              <div className="mt-1">
                <span className="action">{actions}</span> Actions restantes
              </div>
              {isMyTurn && (
                <div className="mt-1">
                  <Button
                    className="btn-block pass-tour"
                    onClick={() => skipTurn()}
                  >
                    Terminer mon tour
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
