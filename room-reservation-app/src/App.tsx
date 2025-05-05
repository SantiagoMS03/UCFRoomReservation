import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import RoomList from "./components/RoomList";
import RoomDetail from "./components/RoomDetail";
import MyReservations from "./components/MyReservation";
import "./App.css";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<RoomList />} />
              <Route path="/room/:roomId" element={<RoomDetail />} />
              <Route path="/my-reservations" element={<MyReservations />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
