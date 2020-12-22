import React, { useState } from "react";
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
        </Card.Body>
      </Card>
    </div>
  );
}
