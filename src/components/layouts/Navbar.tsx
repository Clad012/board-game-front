import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import UIGuide from "../UI/Guide/UIGuide";

export default function NavbarComponent() {
  const [showGuideModal, setShowGuideModal] = useState(false);

  const handleClose = () => {
    setShowGuideModal(false);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Board Game</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Guides" id="basic-nav-dropdown">
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
      <UIGuide showGuideModal={showGuideModal} handleClose={handleClose} />
    </>
  );
}
