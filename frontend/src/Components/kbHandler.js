import React from "react";
import ReactDOM from "react-dom";
import useKeyPress from "./use-key-press";
import useMultiKeyPress from "./use-multi-key-press";
//import "./styles.css";

function areKeysPressed(keys = [], keysPressed = []) {
  const required = new Set(keys);
  for (var elem of keysPressed) {
    required.delete(elem);
  }
  return required.size === 0;
}

const MultiKeysPressed = ({ keys, keysPressed, emoji }) => {
  const arePressed = areKeysPressed(keys, keysPressed);

  if (arePressed) {
    return emoji;
  }
  return null;
};

function App() {
  // Call our hook for each key that we'd like to monitor
  const happyPress = useKeyPress("h");
  const sadPress = useKeyPress("s");
  const robotPress = useKeyPress("r");
  const foxPress = useKeyPress("f");
  const keysPressed = useMultiKeyPress();
  const hsrfPressed = areKeysPressed(["s", "d", "h", "j"], keysPressed);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Label value="h" isBold={happyPress} />
      <Label value="s" isBold={sadPress} />
      <Label value="r" isBold={robotPress} />
      <Label value="f" isBold={foxPress} />
      <Label value="s+d+h+j" isBold={hsrfPressed} />

      <div
        style={{
          fontSize: "200px",
          width: "100%",
          minHeight: "240px",
          backgroundColor: "#e6f5f8"
        }}
      >
        {happyPress && "😊"}
        {sadPress && "😢"}
        {robotPress && "🤖"}
        {foxPress && "🦊"}
        <MultiKeysPressed
          keys={["s", "d", "h", "j"]}
          keysPressed={keysPressed}
          emoji="👌🏻"
        />
      </div>
    </div>
  );
}

const Label = ({ value, isBold }) => (
  <div
    style={{
      display: "inline-block",
      margin: "15px",
      fontSize: "42px",
      fontWeight: isBold ? "bold" : "normal"
    }}
  >
    {value}
  </div>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
