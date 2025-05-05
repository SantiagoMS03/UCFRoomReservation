// src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const Header: React.FC = () => {
  const { user } = useApp();

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Room Reservation</Link>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Available Rooms</Link>
          </li>
          <li>
            <Link to="/my-reservations">My Reservations</Link>
          </li>
        </ul>
      </nav>
      <div className="user-info">
        {user ? <span>{user.name}</span> : <button>Login</button>}
      </div>
    </header>
  );
};

export default Header;
