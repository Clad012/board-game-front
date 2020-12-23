import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "./UIGuide.css";

const nextTornados: JSX.Element[] = [];
for (let i = 1; i <= 4; i++) {
  nextTornados.push(
    <span className="tornado-guide next-tornado-guide" key={i}></span>
  );
}

const tornados: JSX.Element[] = [];
for (let i = 1; i <= 4; i++) {
  tornados.push(
    <span className="tornado-guide active-tornado-guide" key={i}></span>
  );
}

const bothTornado: JSX.Element[] = [];
for (let i = 1; i <= 4; i++) {
  bothTornado.push(
    <span
      className="tornado-guide active-tornado-guide both-tornados-guide"
      key={i}
    ></span>
  );
}

interface ModalType {
  showGuideModal: boolean;
  handleClose: () => void;
}

export default function UIGuide(props: ModalType) {
  const { showGuideModal, handleClose } = props;
  return (
    <div>
      <Modal show={showGuideModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Guide Interface</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            {nextTornados}
            <p>
              <strong>Prochain tornade</strong>: Indication que durant le tour
              de l'adversaire une tornade apparaitera sur ces coordonnées.
            </p>
          </div>
          <hr />
          <div>
            {tornados}
            <p>
              <strong>Tornade Active</strong>: Si vous finissez votre tour en se
              posisionnant sur une tornade active, vous alleez respan sur la
              case de départ.
            </p>
          </div>
          <hr />
          <div>
            {bothTornado}
            <p>
              <strong>Tornade Active & Prochaine Tornade</strong>: Indication
              que ces cases représentent une tornade active ainsi que la
              prochaine tornade apparaitera sur ces positions.
            </p>
          </div>
          <hr />
          <div>
            <span className="mur tornado-guide"></span>
            <p>
              <strong>Mur</strong>: Vous ne pouvez traverser un mur, mais vous
              pouvez le détruire.
              <br></br>
            </p>
          </div>
          <hr />
          <div>
            <span className="mur-strongify-guide tornado-guide"></span>
            <p>
              <strong>Mur fortifié</strong>: Vous ne pouvez détruire ce mur,
              vous devez attendre un tour.
              <br></br>
            </p>
          </div>
          <hr />
          <div>
            <span className="tile-guide tornado-guide"></span>
            <p>
              <strong>Case vide</strong>: Vous pouvez vous déplacer sur les
              cases vides ou vous pouvez construire des murs qui seront des murs
              fortifiés pour un tour.
              <br></br>
            </p>
          </div>
          <hr />
          <div>
            <span className="bonus-guide tornado-guide"></span>
            <p>
              <strong>Bonus</strong>: Donne 2 actions supplémentaires.
              <br></br>
            </p>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
