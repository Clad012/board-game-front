import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface actionType {
  checkMovement: (x: string) => void;
  actionsLeft: number;
  isPlayer1: boolean;
}

export default function ActionBar(props: actionType) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(true);
  const handleShow = () => setShow(true);
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
          <Button variant="primary" onClick={handleShow}>
            Launch demo modal
          </Button>

          <Modal show={show} onHide={handleClose} backdrop={false}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
}
