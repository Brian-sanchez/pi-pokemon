import React from "react";
import { Route, Routes } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import PokemonDetail from "./components/PokemonDetail";
import CreatePokemon from "./components/CreatePokemon";

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>} />
        <Route path="/pokemon/:id" element={<PokemonDetail/>} />
        <Route path="/addpokemon" element={<CreatePokemon/>} />
      </Routes>
    </div>
  );
}

export default App;
