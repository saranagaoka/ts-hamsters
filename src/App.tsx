import React from "react";
import "./App.css";
import Background from "./components/Background";
import { HamsterProvider } from "./Context/HamsterContext";

function App() {
  return (
    <HamsterProvider>
      <div className="app">
        <Background />
      </div>
    </HamsterProvider>
  );
}

export default App;
