import { useEffect } from "react";
import "./App.css";
import Main from "./page/main";

function App() {
  function setScreenSize() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <>
      <Main />
    </>
  );
}

export default App;
