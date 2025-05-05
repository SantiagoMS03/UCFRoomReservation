import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import DatePicker from "./DatePicker";

const RoomList: React.FC = () => {
  const { rooms, selectedDate } = useApp();
  const [capacityFilter, setCapacityFilter] = useState<number | null>(null);
  const [amenityFilter, setAmenityFilter] = useState<string | null>(null);

  // Get all unique amenities from rooms
  const allAmenities = Array.from(
    new Set(rooms.flatMap((room) => room.amenities))
  );

  // Filter rooms based on criteria
  const filteredRooms = rooms.filter((room) => {
    if (capacityFilter && room.capacity < capacityFilter) return false;
    if (amenityFilter && !room.amenities.includes(amenityFilter)) return false;
    return true;
  });

  return (
    <div className="room-list-container">
      <h1>Available Rooms</h1>
      <div className="filters">
        <DatePicker />
        <div className="filter-group">
          <label>Capacity:</label>
          <select
            value={capacityFilter || ""}
            onChange={(e) =>
              setCapacityFilter(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">All</option>
            <option value="2">2+</option>
            <option value="5">5+</option>
            <option value="10">10+</option>
            <option value="15">15+</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Amenity:</label>
          <select
            value={amenityFilter || ""}
            onChange={(e) => setAmenityFilter(e.target.value || null)}
          >
            <option value="">All</option>
            {allAmenities.map((amenity) => (
              <option key={amenity} value={amenity}>
                {amenity}
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
                <p>Capacity: {room.capacity} people</p>
                <p className="amenities">
                  {room.amenities.slice(0, 2).join(", ")}
                  {room.amenities.length > 2 && "..."}
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
