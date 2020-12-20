import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

interface PlayModeCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

export default function PlayMode(props: PlayModeCardProps) {
  return (
    <Card className="floating playmode">
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Button variant="primary">{props.link}</Button>
      </Card.Body>
    </Card>
  );
}
