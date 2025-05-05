import React, { createContext, useContext, useState, ReactNode } from "react";
import { Room, Reservation, User, TimeSlot } from "../types/types";
import { mockRooms, mockUser, mockReservations } from "../data/mockData";

interface AppContextType {
  rooms: Room[];
  user: User | null;
  reservations: Reservation[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  makeReservation: (
    roomId: string,
    timeSlotId: string,
    date: string,
    purpose: string,
    attendees: number
  ) => void;
  cancelReservation: (reservationId: string) => void;
  getAvailableTimeSlots: (roomId: string, date: string) => TimeSlot[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [user, setUser] = useState<User | null>(mockUser);
  const [reservations, setReservations] =
    useState<Reservation[]>(mockReservations);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const makeReservation = (
    roomId: string,
    timeSlotId: string,
    date: string,
    purpose: string,
    attendees: number
  ) => {
    if (!user) return;

    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      roomId,
      userId: user.id,
      date,
      timeSlotId,
      purpose,
      attendees,
      createdAt: new Date().toISOString(),
    };

    setReservations([...reservations, newReservation]);

    // Update room availability
    setRooms(
      rooms.map((room) => {
        if (room.id === roomId && room.availableTimes) {
          return {
            ...room,
            availableTimes: room.availableTimes.map((slot) =>
              slot.id === timeSlotId ? { ...slot, isBooked: true } : slot
            ),
          };
        }
        return room;
      })
    );
  };

  const cancelReservation = (reservationId: string) => {
    const reservation = reservations.find((r) => r.id === reservationId);
    if (!reservation) return;

    // Remove reservation
    setReservations(reservations.filter((r) => r.id !== reservationId));

    // Update room availability
    setRooms(
      rooms.map((room) => {
        if (room.id === reservation.roomId && room.availableTimes) {
          return {
            ...room,
            availableTimes: room.availableTimes.map((slot) =>
              slot.id === reservation.timeSlotId
                ? { ...slot, isBooked: false }
                : slot
            ),
          };
        }
        return room;
      })
    );
  };

  const getAvailableTimeSlots = (roomId: string, date: string): TimeSlot[] => {
    const room = rooms.find((r) => r.id === roomId);
    if (!room || !room.availableTimes) return [];

    // For simplicity, we're not checking date-specific availability
    // In a real app, you'd need to check against reservations for the specific date
    return room.availableTimes.filter((slot) => !slot.isBooked);
  };

  return (
    <AppContext.Provider
      value={{
        rooms,
        user,
        reservations,
        selectedDate,
        setSelectedDate,
        makeReservation,
        cancelReservation,
        getAvailableTimeSlots,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
