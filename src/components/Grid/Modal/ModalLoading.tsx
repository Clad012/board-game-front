import React from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

interface modalTypes {
  showModal: boolean;
  roomID?: string | null | undefined;
  roomType?: string;
}

export default function ModaLoading(props: modalTypes) {
  const { showModal, roomID } = props;
  const handleClose = () => {
    return;
  };

  let myInput: any = null;
  const copyToClipboard = () => {
    if (myInput) {
      myInput.select();
      document.execCommand("copy");
      alert("Copied the text: " + myInput.value);
    }
  };
  return (
    <div>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop={false}
        backdropClassName="blurBackground"
      >
        <Modal.Body className="text-center">
          <h6 className="title">En attente d'un autre joueur...</h6>
          <Spinner animation="border" className="mt-2 mb-4" variant="primary" />
          {roomID && (
            <div className="text-left">
              <p>Inviter vos amis via ce lien: </p>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  ref={(ref: any) => (myInput = ref)}
                  value={`https://board-game.vercel.app/play?room=private&room_id=${roomID}`}
                  readOnly
                />
                <InputGroup.Append>
                  <Button variant="outline-secondary" onClick={copyToClipboard}>
                    🗒 Copier
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
          )}
          ;
        </Modal.Body>
      </Modal>
    </div>
  );
}
