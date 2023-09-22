import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ChatComponent from "./ChatComponent"; // Adjust the import path as needed

function App() {
  return (
    <div className="App">
      <ChatComponent/>
    </div>
  );
}

export default App;