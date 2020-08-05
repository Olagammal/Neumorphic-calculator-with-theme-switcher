import React, { useState, useReducer } from "react";
import { Container } from "reactstrap";
import ThemeContext from "./Context/ThemeContext";
import CalculatorContainer from "./Component/CalculatorContainer";

import NumberContext from "./Context/NumberContext";
import CalReducer from "./Context/reducer";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const App = () => {
  const themeHook = useState("dark");
  const [state, dispatch] = useReducer(CalReducer, "");
  return (
    <div>
      <Container fluid={true}>
        <h1>NEUMORPHIC CALCULATOR</h1>
        <NumberContext.Provider
          value={{ myState: state, myDispatch: dispatch }}
        >
          <ThemeContext.Provider value={themeHook}>
            <CalculatorContainer></CalculatorContainer>
          </ThemeContext.Provider>
        </NumberContext.Provider>
      </Container>
    </div>
  );
};

export default App;
