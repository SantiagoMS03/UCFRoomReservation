import { Room, TimeSlot, Reservation, User } from "../types/types";

export const generateTimeSlots = (): TimeSlot[] => {
  const times = [];
  for (let hour = 8; hour < 18; hour++) {
    const startHour = hour < 10 ? `0${hour}` : `${hour}`;
    const endHour = hour + 1 < 10 ? `0${hour + 1}` : `${hour + 1}`;

    times.push({
      id: `slot-${hour}`,
      startTime: `${startHour}:00`,
      endTime: `${endHour}:00`,
      isBooked: Math.random() > 0.7,
    });
  }
  return times;
};

export const mockRooms: Room[] = [
  {
    id: "room-1",
    name: "M240",
    roomType: ["Grand Piano"],
    availableTimes: generateTimeSlots(),
  },
  {
    id: "room-2",
    name: "M244",
    roomType: ["Grand Piano"],
    availableTimes: generateTimeSlots(),
  },
  {
    id: "room-3",
    name: "M245",
    roomType: ["Upright Piano"],
    availableTimes: generateTimeSlots(),
  },
  {
    id: "room-4",
    name: "M246",
    roomType: ["Chamber Room"],
    availableTimes: generateTimeSlots(),
  },
  {
    id: "room-5",
    name: "M245",
    roomType: ["Composition Room"],
    availableTimes: generateTimeSlots(),
  },
  {
    id: "room-5",
    name: "M252",
    roomType: ["Keyboard Room"],
    availableTimes: generateTimeSlots(),
  },
];

export const mockUser: User = {
  id: "user-1",
  name: "John Doe",
  email: "john.doe@example.com",
};

export const mockReservations: Reservation[] = [
  {
    id: "res-1",
    roomId: "room-1",
    userId: "user-1",
    date: "2025-05-03",
    timeSlotId: "slot-10",
    createdAt: "2025-05-01T10:30:00Z",
  },
  {
    id: "res-2",
    roomId: "room-3",
    userId: "user-1",
    date: "2025-05-05",
    timeSlotId: "slot-14",
    createdAt: "2025-05-01T14:15:00Z",
  },
];
