import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import DatePicker from "./DatePicker";

const RoomDetail: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { rooms, selectedDate, user, makeReservation } = useApp();

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [attendees, setAttendees] = useState<number>(1);
  const [bookingComplete, setBookingComplete] = useState<boolean>(false);

  const room = rooms.find((r) => r.id === roomId);

  if (!room) {
    return <div className="not-found">Room not found</div>;
  }

  const availableTimeSlots =
    room.availableTimes?.filter((slot) => !slot.isBooked) || [];

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTimeSlot || !purpose || attendees < 1 || !user) {
      return;
    }

    makeReservation(
      room.id,
      selectedTimeSlot,
      selectedDate,
      purpose,
      attendees
    );

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
          <p className="capacity">Capacity: {room.capacity} people</p>

          <h3>Amenities</h3>
          <ul className="amenities-list">
            {room.amenities.map((amenity) => (
              <li key={amenity}>{amenity}</li>
            ))}
          </ul>

          <div className="reservation-form">
            <h2>Make a Reservation</h2>
            <form onSubmit={handleReservation}>
              <div className="form-group">
                <label>Date</label>
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

              <div className="form-group">
                <label>Purpose</label>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Meeting purpose"
                  required
                />
              </div>

              <div className="form-group">
                <label>Number of Attendees</label>
                <input
                  type="number"
                  min="1"
                  max={room.capacity}
                  value={attendees}
                  onChange={(e) => setAttendees(Number(e.target.value))}
                  required
                />
                {attendees > room.capacity && (
                  <p className="error">
                    Exceeds room capacity of {room.capacity}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="reserve-btn"
                disabled={
                  !selectedTimeSlot ||
                  attendees > room.capacity ||
                  attendees < 1 ||
                  !purpose
                }
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
