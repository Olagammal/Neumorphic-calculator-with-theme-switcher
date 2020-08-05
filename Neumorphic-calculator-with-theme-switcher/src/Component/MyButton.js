import React, { useContext } from "react";
import { Button } from "reactstrap";
import ThemeContext from "../Context/ThemeContext";
import theme from "./theme";

import NumberContext from "../Context/NumberContext";
import {
  APPEND,
  CLEAR,
  BACK,
  CHANGESIGN,
  EVALUATE,
  PERCENTAGE,
} from "../Context/action.types";

import "bootstrap/dist/css/bootstrap.css";
import "./MyButton.css";

const onClicking = (event, currentTheme) => {
  if (event.type === "mousedown") {
    return (event.target.style.boxShadow = currentTheme.onClickShadow);
  } else {
    return (event.target.style.boxShadow = currentTheme.shadow);
  }
};

const assign = (myNumberContext, buttonvalue) => {
  if (buttonvalue === "C") {
    myNumberContext.myDispatch({
      type: CLEAR,
      payload: buttonvalue,
    });
  } else if (buttonvalue === "<-") {
    myNumberContext.myDispatch({
      type: BACK,
      payload: buttonvalue,
    });
  } else if (buttonvalue === "+/-") {
    myNumberContext.myDispatch({
      type: CHANGESIGN,
      payload: buttonvalue,
    });
  } else if (buttonvalue === "=") {
    myNumberContext.myDispatch({
      type: EVALUATE,
      payload: buttonvalue,
    });
  } else if (buttonvalue === "%") {
    myNumberContext.myDispatch({
      type: PERCENTAGE,
      payload: buttonvalue,
    });
  } else {
    myNumberContext.myDispatch({
      type: APPEND,
      payload: buttonvalue,
    });
  }
};

const MyButton = ({ buttonvalue }) => {
  //for theme
  const myValue = useContext(ThemeContext)[0];
  const themeComponents = theme[myValue];

  //for calculation
  const myNumberContext = useContext(NumberContext);
  console.log(myNumberContext.myState);
  return (
    <div>
      <div
        className="button-div"
        onMouseDown={(event) => {
          onClicking(event, themeComponents);
        }}
        onMouseUp={(event) => {
          onClicking(event, themeComponents);
        }}
        onClick={() => {
          assign(myNumberContext, buttonvalue);
        }}
      >
        <Button
          className="buttons"
          style={{
            backgroundColor: `${themeComponents.bgColor}`,
            color: `${themeComponents.numberColor}`,
            boxShadow: `${themeComponents.shadow}`,
          }}
        >
          {buttonvalue}
        </Button>
      </div>
    </div>
  );
};

export default MyButton;
