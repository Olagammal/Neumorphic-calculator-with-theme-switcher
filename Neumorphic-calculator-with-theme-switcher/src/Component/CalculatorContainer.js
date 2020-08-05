import React, { useContext } from "react";
import { Container, Row, Col, Input } from "reactstrap";
import MyButton from "./MyButton";
import ThemeToggler from "./ThemeToggler";
import ThemeContext from "../Context/ThemeContext";
import theme from "./theme";

import NumberContext from "../Context/NumberContext";

import "bootstrap/dist/css/bootstrap.css";
import "./CalculatorContainer.css";

const CalculatorContainer = () => {
  //for theme
  const [myValue, setMyValue] = useContext(ThemeContext);
  const themeComponents = theme[myValue];

  //for input field
  const myNumberContext = useContext(NumberContext);

  return (
    <Container
      className="calculator"
      style={{
        backgroundColor: `${themeComponents.bgColor}`,
      }}
    >
      <Row>
        <ThemeToggler></ThemeToggler>
      </Row>
      <Row>
        <Input
          type="textarea"
          style={{
            backgroundColor: `${themeComponents.bgColor}`,
            color: `${themeComponents.displayColor}`,
          }}
          className="display"
          value={myNumberContext.myState}
          disabled={true}
        ></Input>
      </Row>

      <Row className="buttonContainer">
        <Col
          lg={{ offset: 2 }}
          md={{ offset: 2 }}
          sm={{ offset: 2 }}
          xs={{ offset: 2 }}
        >
          <Row>
            <div className="cal-button">
              <MyButton buttonvalue="C"></MyButton>
            </div>
            <div className="cal-button">
              <MyButton buttonvalue="<-"></MyButton>
            </div>
            <div className="cal-button">
              <MyButton buttonvalue="+/-"></MyButton>
            </div>
            <div className="cal-button">
              <MyButton buttonvalue="/"></MyButton>
            </div>
          </Row>

          <Row>
            <div className="cal-button">
              <MyButton buttonvalue="7"></MyButton>
            </div>
            <div className="cal-button">
              <MyButton buttonvalue="8"></MyButton>
            </div>
            <div className="cal-button">
              <MyButton buttonvalue="9"></MyButton>
            </div>
            <div className="cal-button">
              <MyButton buttonvalue="*"></MyButton>
            </div>
          </Row>

          <Row>
            <div className="cal-button">
              <MyButton buttonvalue="4"></MyButton>
            </div>
            <div className="cal-button">
              <MyButton buttonvalue="5"></MyButton>
            </div>
            <div className="cal-button">
              <MyButton buttonvalue="6"></MyButton>
            </div>
            <div className="cal-button">
              <MyButton buttonvalue="+"></MyButton>
            </div>
          </Row>

          <Row>
            <div className="cal-button">
              <MyButton buttonvalue="1"></MyButton>
            </div>
            <div className="cal-button">
              <MyButton buttonvalue="2"></MyButton>
            </div>
            <div className="cal-button">
              <MyButton buttonvalue="3"></MyButton>
            </div>
            <div className="cal-button">
              <MyButton buttonvalue="-"></MyButton>
            </div>
          </Row>

          <Row>
            <div className="cal-button">
              <MyButton buttonvalue="%"></MyButton>
            </div>
            <div className="cal-button">
              <MyButton buttonvalue="0"></MyButton>
            </div>
            <div className="cal-button">
              <MyButton buttonvalue="."></MyButton>
            </div>
            <div className="cal-button">
              <MyButton buttonvalue="="></MyButton>
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CalculatorContainer;
