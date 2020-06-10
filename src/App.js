import React from "react";
import "./App.css";
import Table from "./Table";
import { AppStateProvider } from "./AppContext";

function App() {
  return (
    <AppStateProvider>
      <div className="App">
        <Table />
      </div>
    </AppStateProvider>
  );
}

export default App;
