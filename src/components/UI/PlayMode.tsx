import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";
interface PlayModeCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
  action: string;
}

export default function PlayMode(props: PlayModeCardProps) {
  return (
    <Card className="floating playmode">
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Link to={props.link}>{props.action}</Link>
      </Card.Body>
    </Card>
  );
}
