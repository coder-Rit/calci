import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";

function App() {
  const [inputStart, setinputStart] = useState(0);
  const [inputEnd, setinputEnd] = useState(0);
  const [MultipleOf, setMultipleOf] = useState(0);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [visitedState, setvisitedState] = useState([]);
  const [startSate, setstartSate] = useState(false);

  const shuffleArray = () => {
    let arr = [];
    for (let index = inputStart; index <= inputEnd; index++) {
      arr.push(index);
    }

    for (let i = 0; i < 500; i++) {
      const idx1 = Math.abs((Math.random() * arr.length - 1).toFixed(0));
      const idx2 = Math.abs((Math.random() * arr.length - 1).toFixed(0));

      let temp = arr[idx1];
      arr[idx1] = arr[idx2];
      arr[idx2] = temp;
    }

    setRandomNumbers(arr);
  };

  const start = () => {
      setstartSate(true);
      shuffleArray();
  };

  const showValue = (idx) => {
    let data = visitedState;
    data[idx] = true;

    setvisitedState([...data]);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!startSate && (
          <form
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <TextField
              id="filled-basic"
              type="number"
              label="Range Start"
              variant="filled"
              onChange={(e) => setinputStart(e.target.value)}
              value={inputStart}
              sx={{background:"white"}}
              name="inputStart"
            />
            <TextField
              id="filled-basic"
              type="number"
              label="Renge End"
              variant="filled"
              onChange={(e) => setinputEnd(e.target.value)}
              value={inputEnd}
              sx={{background:"white"}}
              name="inputEnd"
            />
            <TextField
              id="filled-basic"
              type="number"
              label="Multiple of"
              variant="filled"
              onChange={(e) => setMultipleOf(e.target.value)}
              value={MultipleOf}
              sx={{background:"white"}}
              name="MultipleOf"
            />
            <Button variant="contained" onClick={start}>
              Start
            </Button>
          </form>
        )}

        {startSate && (
          <div>
            <h2>Guess the multiple of (*{MultipleOf})</h2>
            <div>
              {randomNumbers.map((number, index) => (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div key={index} style={{ cursor: "pointer" }}>
                    {number}*{MultipleOf}
                  </div>{" "}
                  =
                  <div
                    style={{
                      width: "50px",
                      height: "30px",
                      border: "1px solid white",
                      cursor: "pointer",
                    }}
                    onClick={() => showValue(index)}
                  >
                    {visitedState[index] ? MultipleOf * number : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
