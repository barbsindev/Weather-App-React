import React from "react";
import "./App.scss";
import "./index.scss";
import Searchbar from "./components/Searchbar/Searchbar";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <div className="App">
      <Searchbar defaultCity="London" />
      <Footer />
    </div>
  );
}

export default App;
