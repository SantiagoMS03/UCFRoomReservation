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
    name: "Conference Room A",
    capacity: 10,
    amenities: ["Projector", "Whiteboard", "Video conferencing"],
    availableTimes: generateTimeSlots(),
  },
  {
    id: "room-2",
    name: "Meeting Room B",
    capacity: 6,
    amenities: ["TV Screen", "Whiteboard"],
    availableTimes: generateTimeSlots(),
  },
  {
    id: "room-3",
    name: "Boardroom",
    capacity: 20,
    amenities: [
      "Projector",
      "Video conferencing",
      "Audio system",
      "Coffee machine",
    ],
    availableTimes: generateTimeSlots(),
  },
  {
    id: "room-4",
    name: "Focus Room 1",
    capacity: 2,
    amenities: ["TV Screen"],
    availableTimes: generateTimeSlots(),
  },
  {
    id: "room-5",
    name: "Creative Space",
    capacity: 15,
    amenities: ["Whiteboard", "Flexible furniture", "Drawing supplies"],
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
    purpose: "Team Meeting",
    attendees: 8,
    createdAt: "2025-05-01T10:30:00Z",
  },
  {
    id: "res-2",
    roomId: "room-3",
    userId: "user-1",
    date: "2025-05-05",
    timeSlotId: "slot-14",
    purpose: "Client Presentation",
    attendees: 12,
    createdAt: "2025-05-01T14:15:00Z",
  },
];
