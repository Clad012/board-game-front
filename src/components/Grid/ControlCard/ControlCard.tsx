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

export default function ControlCard(props: actionType) {
  const { checkMovement, isMyTurn, actions, isPlayer1, skipTurn } = props;
  return (
    <div>
      <Card>
        <Card.Body>
          <div>
            <span className={isMyTurn ? "myTurn" : "hisTurn"}>
              {isMyTurn
                ? "C'est Votre Tour!"
                : "En attente de l'autre joueur..."}
            </span>
            <br />
            Vous êtes le{" "}
            <span className={isPlayer1 ? "player-1" : "player-2"}>
              {isPlayer1 ? "Joueur 1" : "Joueur 2"}
            </span>
            <hr />
            <div>
              <div className="control-container">
                <span>
                  <span className="action">{actions}</span>{" "}
                  <span className="actions">Actions restantes</span>
                </span>
                {isMyTurn && (
                  <span>
                    <Button className="pass-tour" onClick={() => skipTurn()}>
                      Passer
                    </Button>
                  </span>
                )}
              </div>
            </div>
            <hr />
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
