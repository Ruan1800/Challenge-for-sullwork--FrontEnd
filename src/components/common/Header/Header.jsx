import React from "react";
import "./style.css";

const Header = () => {
  return (
    <header>
      <a href="/">
        <div>RUAN</div>
      </a>
      <ul>
        <li>
          <a href="/">Início</a>
        </li>
        <li>
          <a href="/add">Adicionar Café</a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
