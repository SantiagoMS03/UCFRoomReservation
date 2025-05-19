import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import DatePicker from "./DatePicker";

const RoomDetail: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { rooms, selectedDate, user, makeReservation } = useApp();

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [bookingComplete, setBookingComplete] = useState<boolean>(false);

  const room = rooms.find((r) => r.id === roomId);

  if (!room) {
    return <div className="not-found">Room not found</div>;
  }

  const availableTimeSlots =
    room.availableTimes?.filter((slot) => !slot.isBooked) || [];

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTimeSlot || !user) {
      return;
    }

    makeReservation(room.id, selectedTimeSlot, selectedDate);

    setBookingComplete(true);
    setTimeout(() => {
      navigate("/my-reservations");
    }, 2000);
  };

  if (bookingComplete) {
    return (
      <div className="booking-success">
        <h2>Booking Successful!</h2>
        <p>Your room has been reserved.</p>
        <p>Redirecting to your reservations...</p>
      </div>
    );
  }

  return (
    <div className="room-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        &larr; Back to Rooms
      </button>

      <div className="room-detail-container">
        <div className="room-image-large">
          {room.image ? (
            <img src={room.image} alt={room.name} />
          ) : (
            <div className="placeholder-image-large">
              <span>{room.name.substring(0, 1)}</span>
            </div>
          )}
        </div>

        <div className="room-info-detailed">
          <h1>{room.name}</h1>

          <h3>Room Type</h3>
          <ul className="roomType-list">
            {room.roomType.map((roomType) => (
              <li key={roomType}>{roomType}</li>
            ))}
          </ul>

          <div className="reservation-form">
            <h2>Make a Reservation</h2>
            <form onSubmit={handleReservation}>
              <div className="form-group">
                <DatePicker />
              </div>

              <div className="form-group">
                <label>Time Slot</label>
                <select
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  required
                >
                  <option value="">Select a time</option>
                  {availableTimeSlots.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                      {slot.startTime} - {slot.endTime}
                    </option>
                  ))}
                </select>
                {availableTimeSlots.length === 0 && (
                  <p className="no-slots">
                    No available time slots for this date
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="reserve-btn"
                disabled={!selectedTimeSlot}
              >
                Reserve Room
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
