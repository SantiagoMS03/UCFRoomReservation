import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import DatePicker from "./DatePicker";

const RoomList: React.FC = () => {
  const { rooms, selectedDate } = useApp();
  const [capacityFilter, setCapacityFilter] = useState<number | null>(null);
  const [roomTypeFilter, setRoomTypeFilter] = useState<string | null>(null);

  // Get all unique roomType from rooms
  const allRoomTypes = Array.from(
    new Set(rooms.flatMap((room) => room.roomType))
  );

  // Filter rooms based on criteria
  const filteredRooms = rooms.filter((room) => {
    if (roomTypeFilter && !room.roomType.includes(roomTypeFilter)) return false;
    return true;
  });

  return (
    <div className="room-list-container">
      <h1>Available Rooms</h1>
      <div className="filters">
        <DatePicker />
        <div className="filter-group">
          <label>Room Type:</label>
          <select
            value={roomTypeFilter || ""}
            onChange={(e) => setRoomTypeFilter(e.target.value || null)}
          >
            <option value="">All</option>
            {allRoomTypes.map((roomType) => (
              <option key={roomType} value={roomType}>
                {roomType}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="room-grid">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <div key={room.id} className="room-card">
              <div className="room-image">
                {room.image ? (
                  <img src={room.image} alt={room.name} />
                ) : (
                  <div className="placeholder-image">
                    <span>{room.name.substring(0, 1)}</span>
                  </div>
                )}
              </div>
              <div className="room-info">
                <h3>{room.name}</h3>
                <p className="roomType">
                  {room.roomType.slice(0, 2).join(", ")}
                  {room.roomType.length > 2 && "..."}
                </p>
                <Link to={`/room/${room.id}`} className="view-room-btn">
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="no-rooms">No rooms match your criteria</div>
        )}
      </div>
    </div>
  );
};

export default RoomList;
