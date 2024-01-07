import React, { useState } from "react";
import "./Calculator.css";
import KeyboardEventHandler from 'react-keyboard-event-handler';


const Calculator = () => {
  let [result, setResult] = useState("");

  const handleClick = (e) => {
    if (result.length >= 16) {
      setResult("!Large Input");
      setTimeout(() => {
        setResult("");
      }, 500);
      return;
    }
    if (result.charAt(0) === "0") {
      result = result.slice(1, result.length);
    }
    setResult(result.concat(e.target.name));
  };

  const handleBackspace = () => {
    setResult(result.slice(0, result.length - 1));
  };

  const handleKeyPress = (key) => {
    if (!isNaN(key) || key === '.') {
      handleClick({ target: { name: key } });
    } else if (key === 'backspace') {
      handleBackspace();
    } else if (key === '/' || key === '*' || key === '-' || key === '+') {
        handleClick({ target: { name: key === 'enter' ? 'return': key } });
    } else if (key === 'enter') {
      calculate();
    }
  };

  const calculate = () => {
    try {
      result = eval(result).toString();
      if (result.includes(".")) {
        result = +eval(result);
        result = result.toFixed(4).toString();
        setResult(result);
      } else {
        setResult(eval(result).toString());
      }
    } catch (err) {
      setResult("Error");
    }
  };

  return (
    <div className="container">
      <form action="">
        <input type="text" value={result} readOnly />
      </form>

      <div className="keypad">
        <button onClick={() => setResult("")} className="clear color">
          C
        </button>
        <button onClick={handleBackspace} className="backspace color">
          ←
        </button>
        <button name="/" onClick={handleClick} className="color">
          ÷
        </button>
        <button name="7" onClick={handleClick}>
          7
        </button>
        <button name="8" onClick={handleClick}>
          8
        </button>
        <button name="9" onClick={handleClick}>
          9
        </button>
        <button name="*" onClick={handleClick} className="color">
          ×
        </button>
        <button name="4" onClick={handleClick}>
          4
        </button>
        <button name="5" onClick={handleClick}>
          5
        </button>
        <button name="6" onClick={handleClick}>
          6
        </button>
        <button name="-" onClick={handleClick} className="color">
          -
        </button>
        <button name="1" onClick={handleClick}>
          1
        </button>
        <button name="2" onClick={handleClick}>
          2
        </button>
        <button name="3" onClick={handleClick}>
          3
        </button>
        <button name="+" onClick={handleClick} className="color">
          +
        </button>
        <button name="0" onClick={handleClick}>
          0
        </button>
        <button name="." onClick={handleClick}>
          .
        </button>
        <button onClick={calculate} className="equal color">
          =
        </button>
      </div>
      <KeyboardEventHandler
        handleKeys={['all']}
        onKeyEvent={(key, e) => handleKeyPress(key)}
      />
    </div>
  );
};

export default Calculator;
