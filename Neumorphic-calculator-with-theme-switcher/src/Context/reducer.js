import {
  APPEND,
  CLEAR,
  BACK,
  CHANGESIGN,
  EVALUATE,
  PERCENTAGE,
} from "./action.types";

const evaluation = (state, len) => {
  var n = ""; //number
  var num = []; //number array
  var sym = []; //symbol array
  var second = 0; //second operand
  var first = 0; //first operand
  var symbol = ""; //operator
  var top = 0; //top pointer(last index of the array)
  for (var i = 0; i < len; i++) {
    switch (state[i]) {
      case "/":
        num.push(parseFloat(n));
        n = "";
        //if the next number is a negative number
        if (state[i + 1] === "-") {
          n = n.concat("-");
          i += 1;
        }
        top = sym.length;
        //if sym array is empty
        if (sym.length < 1) {
          sym.push("/");
        } else if (
          //if the sym array contains any other symbols that has lower precedence compared to '/'
          sym[top - 1] === "+" ||
          sym[top - 1] === "-" ||
          sym[top - 1] === "*"
        ) {
          sym.push("/");
        } else {
          //if the sym array contains other symbols of lower precedence along with '/'
          //pop symbol from the sym array and perform the operation till the array is empty and then push '/' into the sym array
          while (
            top > 0 &&
            sym[top - 1] !== "+" &&
            sym[top - 1] !== "-" &&
            sym[top - 1] !== "*"
          ) {
            second = num.pop();
            first = num.pop();
            symbol = sym.pop();
            num.push(first / second);
            top = sym.length;
          }
          sym.push("/");
        }
        break;
      case "*":
        num.push(parseFloat(n));
        n = "";
        //if the next number is a negative number
        if (state[i + 1] === "-") {
          n = n.concat("-");
          i += 1;
        }
        top = sym.length;
        //if the sym array is empty
        if (top === 0) {
          sym.push("*");
        } else {
          //if the sym array is not empty and the symbols present in the sym array has higher precendence than '*'
          while (top > 0 && sym[top - 1] !== "+" && sym[top - 1] !== "-") {
            second = num.pop();
            first = num.pop();
            symbol = sym.pop();
            if (symbol === "/") {
              num.push(first / second);
            } else {
              num.push(first * second);
            }

            top = sym.length;
          }
          sym.push("*");
        }
        break;
      case "+":
        num.push(parseFloat(n));
        n = "";
        //if the next number is a negative number
        if (state[i + 1] === "-") {
          n = n.concat("-");
          i += 1;
        }
        top = sym.length;
        //if the sym array is empty
        if (top === 0) {
          sym.push("+");
        } else {
          //if the sym array is not empty ,pop all the symbols,perform the operation and finally push '+'
          //'+' and '-' have least precedence
          while (top > 0) {
            second = num.pop();
            first = num.pop();
            symbol = sym.pop();
            if (symbol === "/") {
              num.push(first / second);
            } else if (symbol === "*") {
              num.push(first * second);
            } else if (symbol === "-") {
              num.push(first - second);
            } else {
              num.push(first + second);
            }

            top = sym.length;
          }
          sym.push("+");
        }
        break;
      case "-":
        //if the first number is negative number
        if (i === 0) {
          n = n.concat("-");
          continue;
        }
        num.push(parseFloat(n));
        n = "";
        //if the next number is a negative number
        if (state[i + 1] === "-") {
          n = n.concat("-");
          i += 1;
        }
        top = sym.length;
        //if the sym array is empty
        if (top === 0) {
          sym.push("-");
        } else {
          //if the sym array is not empty ,pop all the symbols,perform the operation and finally push '-'
          //'+' and '-' have least precedence
          while (top > 0) {
            second = num.pop();
            first = num.pop();
            symbol = sym.pop();
            if (symbol === "/") {
              num.push(first / second);
            } else if (symbol === "*") {
              num.push(first * second);
            } else if (symbol === "+") {
              num.push(first + second);
            } else {
              num.push(first - second);
            }

            top = sym.length;
          }
          sym.push("-");
        }
        break;
      default:
        //if the character is not an operator
        n = n.concat(state[i]);
        break;
    }
  }
  //the last number of the expression
  if (n.length >= 1) {
    num.push(parseFloat(n));
    n = "";
  }
  //if the sym array is not empty,pop all the symbols and perform the operation
  while (sym.length >= 1) {
    symbol = sym.pop();
    second = num.pop();
    first = num.pop();
    switch (symbol) {
      case "/":
        num.push(first / second);
        break;
      case "*":
        num.push(first * second);
        break;
      case "+":
        num.push(first + second);
        break;

      case "-":
        num.push(first - second);
        break;
      default:
        break;
    }
  }
  // console.log(sym + "is sym" + sym.length);
  // console.log(num + "is num");

  //return the final answer
  return num[0];
};

const CalReducer = (state, action) => {
  switch (action.type) {
    case APPEND:
      const appendedString = state.concat(action.payload);
      return appendedString;

    case BACK:
      if (state.length === 1 || state === "ERROR") {
        return "";
      } else {
        const editedString = state.slice(0, -1);
        return editedString;
      }
    case CHANGESIGN:
      if (state === "0") {
        return state;
      } else {
        var check = state.slice(1);
        if (
          //if the expression does not contain any operators
          !state.includes("/") &&
          !state.includes("*") &&
          !state.includes("+") &&
          !check.includes("-")
        ) {
          //if the expression does not contain any operators (i.e) it is a number and it is negative
          if (state[0] === "-") {
            return state.slice(1);
          } else {
            //if the expression does not contain any operators (i.e) it is a number and it is positive
            return "-" + state;
          }
        }
        //if the expression contains operators
        for (var i = state.length - 1; i >= 0; i--) {
          if (
            //if the number is positive
            state[i - 1] === "/" ||
            state[i - 1] === "*" ||
            state[i - 1] === "+"
          ) {
            return state.slice(0, i) + "-" + state.slice(i);
          } else if (
            //if the number is negative and has an operator other than '-' preceeding the number
            state[i - 1] === "-" &&
            (state[i - 2] === "/" ||
              state[i - 2] === "*" ||
              state[i - 2] === "+" ||
              state[i - 2] === "-")
          ) {
            return state.slice(0, i - 1) + state.slice(i);
          } else if (state[i - 1] === "-") {
            //if the number is negative and has an operator '-' preceeding the number
            return state.slice(0, i) + "-" + state.slice(i);
          } else {
            continue;
          }
        }
      }
      return "-" + state;
    case EVALUATE:
      if (state.length === 1) {
        return state;
      } else if (state[0] === "-") {
        var number = state.slice(1);
        //if the first number is negative and it does not have any operators following it
        if (
          !number.includes("+") &&
          !number.includes("-") &&
          !number.includes("*") &&
          !number.includes("/")
        ) {
          return state;
        } else {
          //if the first number is negative
          const len = state.length;
          //evaluate the expression
          const ans = evaluation(state, len);
          // if the first number is negative and if the answer is infinty or there is an error
          if (isNaN(ans) || !isFinite(ans)) {
            return "ERROR";
          }
          return ans + "";
        }
      } else {
        //if the first number is positive
        const len = state.length;
        //evaluate the expression
        const ans = evaluation(state, len);
        //  if the answer is infinty or there is an error
        if (isNaN(ans) || !isFinite(ans)) {
          return "ERROR";
        }
        return ans + "";
      }
    case PERCENTAGE:
      var no = parseFloat(state);
      return no / 100 + "";
    case CLEAR:
      return "";
    default:
      return "0";
  }
};

export default CalReducer;
