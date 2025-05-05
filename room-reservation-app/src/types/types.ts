export interface Room {
  id: string;
  name: string;
  capacity: number;
  amenities: string[];
  image?: string;
  availableTimes?: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface Reservation {
  id: string;
  roomId: string;
  userId: string;
  date: string;
  timeSlotId: string;
  purpose: string;
  attendees: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
