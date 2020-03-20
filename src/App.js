import React, { Component } from "react";
import "./App.css";
import "../node_modules/react-vis/dist/style.css";
import CovidCharts from "./CovidCharts";

class App extends Component {
  render() {
    return <CovidCharts />;
  }
}

export default App;
