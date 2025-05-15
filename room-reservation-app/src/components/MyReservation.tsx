import React from "react";
import { useApp } from "../context/AppContext";

const MyReservations: React.FC = () => {
  const { reservations, rooms, cancelReservation } = useApp();

  // Sort reservations by date (ascending)
  const sortedReservations = [...reservations].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const getTimeSlotText = (roomId: string, timeSlotId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    const timeSlot = room?.availableTimes?.find((t) => t.id === timeSlotId);

    return timeSlot
      ? `${timeSlot.startTime} - ${timeSlot.endTime}`
      : "Unknown time";
  };

  const getRoomName = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    return room ? room.name : "Unknown room";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="my-reservations">
      <h1>My Reservations</h1>

      {sortedReservations.length === 0 ? (
        <div className="no-reservations">
          <p>You don't have any reservations yet.</p>
        </div>
      ) : (
        <div className="reservations-list">
          {sortedReservations.map((reservation) => (
            <div key={reservation.id} className="reservation-card">
              <div className="reservation-info">
                <h3>{getRoomName(reservation.roomId)}</h3>
                <p className="reservation-date">
                  <strong>Date:</strong> {formatDate(reservation.date)}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {getTimeSlotText(reservation.roomId, reservation.timeSlotId)}
                </p>
              </div>
              <div className="reservation-actions">
                <button
                  className="cancel-btn"
                  onClick={() => cancelReservation(reservation.id)}
                >
                  Cancel Reservation
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReservations;
