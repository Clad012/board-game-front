import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import UIGuide from "../UI/Guide/UIGuide";
import GamePlay from "../UI/Guide/GamePlay";

export default function NavbarComponent() {
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showGamePlayModal, setShowGamePlayModal] = useState(false);

  const handleClose = () => {
    setShowGuideModal(false);
  };
  const handleCloseGamePlay = () => {
    setShowGamePlayModal(false);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Board Game</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Guides" id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={() => {
                  setShowGamePlayModal(true);
                }}
              >
                Guide Gameplay
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  setShowGuideModal(true);
                }}
              >
                Guide d'interface
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <GamePlay
        showGuideModal={showGamePlayModal}
        handleClose={handleCloseGamePlay}
      />
      <UIGuide showGuideModal={showGuideModal} handleClose={handleClose} />
    </>
  );
}
