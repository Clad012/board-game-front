import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface ModalType {
  showGuideModal: boolean;
  handleClose: () => void;
}

export default function GamePlay(props: ModalType) {
  const { showGuideModal, handleClose } = props;
  return (
    <div>
      <Modal show={showGuideModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Gameplay</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="gameplay">
            <p>
              Pour gagner un joueur doit se rendre au centre de le Map, Chaque
              tour chacun des joueurs aura <strong>3 actions</strong>, il peut
              se déplacer (En Haut, A Droite, A gauche ou en bas), il peut
              détruire un mur ou bien il peut construire, chaque mur construit
              sera caractérisé comme un mur fortifié, càd il ne peut pas être
              détruit qu'après un tour.
            </p>
            <p>
              Durant chaque tour des tornades apparaîtront, si vous terminez
              votre tour en se posisionnant sur une tornade rouge vous allez
              respawn dans la case de depart. Chaque tour des indications avec
              la couleur mauve apparaîtront sur le Map pour indiquer la position
              de la prochaine Tornade.
            </p>
            <p>
              Une astuce est de se baser sur ces indications pour bloquer votre
              adversaire en construisant des mur autour de lui afin de lui
              bloquer pour qu'il termine son tour sur une tornade.
            </p>
            <p>
              Durant la partie des bonuses aléatoires apparaîtront sur le Map,
              un bonus vous garantir 2 actions supplémentaires.
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
