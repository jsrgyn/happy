import React from "react";
// import logo from './logo.svg';
// import './App.css'; 
// import { FiArrowRight } from "react-icons/fi";

// JSX - JavaScript XML

import "./styles/global.css";
// import "./styles/pages/landing.css";

import Routes from './routes';

// import logoImg from "./images/logo.svg";

// interface TitleProps {
//   text: string;
// }

// function Title(props: TitleProps) {
//   return <h1>{props.text}</h1>;
// }

function App() {
  return (
    // <div className="App">
    /* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */
    //   <h1>Hello World</h1>
    //   <Title text="Titulo 1" />
    //   <Title text="Titulo 2" />
    //   <Title text="Titulo 3" />
    //   <Title text="Titulo 4" />
    // </div>
    // <div id="page-landing">
    //   {/* <h1>Hello World</h1> */}
    //   <div className="content-wrapper">
    //     <img src={logoImg} alt="Happy" />

    //     <main>
    //       <h1>Leve felicidade para o mundo</h1>
    //       <p>Visite orfanatos e mude o dia de muitas crianças.</p>
    //     </main>

    //     <div className="location">
    //       <strong>Rio do Sul</strong>
    //       <span>Santa Catarina</span>
    //     </div>

    //     <a href="" className="enter-app">
    //       <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6" />
    //     </a>
    //   </div>
    // </div>

    <Routes />
  );
}

export default App;
