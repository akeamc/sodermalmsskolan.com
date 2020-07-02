import Row from "react-bootstrap/Row";
import CountUp, { CountUpProps } from "react-countup";
import Col from "react-bootstrap/Col";

export interface NumberDisplayItem extends CountUpProps {
  description: string;
}

export const NumberDisplay: React.FunctionComponent<{
  numbers: NumberDisplayItem[];
}> = ({ numbers: items }) => {
  return (
    <Row>
      {items.map(({ description, ...props }, index) => (
        <Col xs={12} md={6} lg={4} key={index}>
          <h1 className="text-center count-up">
            <CountUp {...props} />
          </h1>
          <p className="lead text-center">{description}</p>
        </Col>
      ))}
    </Row>
  );
};
