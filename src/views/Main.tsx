import React from "react";
import Navbar from "../components/layouts/Navbar";
import Container from "../components/layouts/Container";
import { animateBall } from "../components/ballAnimation";

export default function Main() {
  animateBall(35);

  return (
    <div>
      <Navbar />
      <Container />
    </div>
  );
}
