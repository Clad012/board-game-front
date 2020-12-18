import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

interface actionType {
  checkMovement: (x: string) => void;
  actionsLeft: number;
  isPlayer1: boolean;
}

export default function ActionBar(props: actionType) {
  const { checkMovement, actionsLeft, isPlayer1 } = props;
  return (
    <div>
      <Card>
        <Card.Body>
          <div>
            {isPlayer1 ? "Player 1 • " : "Player 2 • "} Actions Lefts:{" "}
            {actionsLeft}
          </div>
          <div>
            Move:
            <Button onClick={() => checkMovement("up")}>Up</Button>
            <Button onClick={() => checkMovement("down")}>Down</Button>
            <Button onClick={() => checkMovement("right")}>Right</Button>
            <Button onClick={() => checkMovement("left")}>left</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
