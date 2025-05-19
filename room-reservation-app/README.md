# Conference Room Reservation System

A React application for managing and scheduling conference room reservations within an organization.

## Overview

This application allows users to:

- Browse available conference rooms
- View detailed information about each room
- Make new reservations with specific dates and times
- Manage and cancel existing reservations
- Filter rooms by capacity and roomType

## Project Structure

```
src/
├── components/          # UI Components
│   ├── DatePicker.tsx   # Date selection component for next 14 days
│   ├── Header.tsx       # Navigation header with user info
│   ├── MyReservations.tsx  # User's reservation management interface
│   ├── RoomDetail.tsx   # Detailed room view with reservation form
│   └── RoomList.tsx     # Filterable list of available rooms
├── context/             # React Context API
│   └── AppContext.tsx   # Global state management with hooks
├── data/                # Data sources
│   └── mockData.ts      # Sample room and reservation data
├── types/               # TypeScript type definitions
│   └── types.ts         # Interfaces for Room, TimeSlot, Reservation, User
├── App.css              # Main application styles
├── App.tsx              # Main application component
├── index.css            # Global styles
├── index.tsx            # Application entry point
└── ...                  # Other configuration files
```

## Key Components

### DatePicker

A date selection component that generates options for the next 14 days. It retrieves and updates the selected date from the application context.

```tsx
import { DatePicker } from "./components/DatePicker";

// The DatePicker uses the AppContext to manage state
// No props are required as it gets/sets data via context
<DatePicker />;
```

### Header

Navigation component that provides links to the main views (Available Rooms and My Reservations) and displays the current user's information or a login button if no user is logged in.

```tsx
import { Header } from "./components/Header";

// Header uses React Router for navigation
// Displays current user info from AppContext
<Header />;
```

### MyReservations

Displays a user's existing reservations sorted by date. Each reservation card shows room name, date, and time slot. Users can cancel reservations from this view.

```tsx
import { MyReservations } from "./components/MyReservations";

// MyReservations displays reservations from AppContext
// Allows cancellation via cancelReservation() function
<MyReservations />;
```

### RoomDetail

Detailed view of a selected conference room with reservation capabilities. Shows room information (name, capacity, roomType) and provides a form to book the room with:

- Date selection
- Time slot selection (filtered to available slots)
- Reservation purpose
- Number of attendees (validates against room capacity)

```tsx
import { RoomDetail } from "./components/RoomDetail";

// RoomDetail uses React Router useParams to get the roomId
// Uses makeReservation() from AppContext when submitting form
<RoomDetail />;
```

### RoomList

Displays a filterable grid of conference rooms. Users can filter rooms by:

- Date (using the DatePicker component)
- Capacity (2+, 5+, 10+, 15+ people)
- Room type (dynamically generated from available rooms)

```tsx
import { RoomList } from "./components/RoomList";

// RoomList displays and filters rooms from AppContext
// Filters by capacity and roomType
<RoomList />;
```

## Data Model

The application uses TypeScript interfaces defined in `types.ts` to ensure type safety across components:

### Room

```typescript
interface Room {
  id: string;
  name: string;
  capacity: number;
  roomType: string[];
  image?: string;
  availableTimes?: TimeSlot[];
}
```

### TimeSlot

```typescript
interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}
```

### Reservation

```typescript
interface Reservation {
  id: string;
  roomId: string;
  userId: string;
  date: string;
  timeSlotId: string;
  purpose: string;
  attendees: number;
  createdAt: string;
}
```

### User

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}
```

## State Management

Global state is managed through React Context API in `AppContext.tsx`, which provides:

### State Variables

- `rooms`: Array of available conference rooms
- `user`: Current user information (or null if not logged in)
- `reservations`: Array of user's current bookings
- `selectedDate`: Currently selected date for reservations

### Functions

- `setSelectedDate(date: string)`: Updates the selected date
- `makeReservation(roomId, timeSlotId, date, purpose, attendees)`: Creates a new reservation and updates room availability
- `cancelReservation(reservationId)`: Removes an existing reservation and updates room availability
- `getAvailableTimeSlots(roomId, date)`: Returns time slots that are available for booking

The context is accessed in components using the `useApp` hook:

```tsx
import { useApp } from "../context/AppContext";

const MyComponent = () => {
  const {
    user,
    rooms,
    selectedDate,
    reservations,
    setSelectedDate,
    makeReservation,
    cancelReservation,
  } = useApp();

  // Use context data and functions
};
```

## Mock Data

The application comes with mock data for development purposes in `mockData.ts`:

- `mockRooms`: Array of 5 sample conference rooms with different capacities and roomType
- `mockUser`: Sample user with ID, name, and email
- `mockReservations`: Sample reservations for the mock user
- `generateTimeSlots()`: Helper function that creates time slots from 8:00 to 18:00 (8am-6pm)

The mock data is used to initialize the state in AppContext.

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- React Router DOM (for navigation)

### Installation

1. Clone the repository

```bash
git clone [repository-url]
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm start
# or
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Usage Examples

### Creating a New View with Room Components

```tsx
import React from "react";
import { RoomList } from "./components/RoomList";
import { DatePicker } from "./components/DatePicker";
import { Header } from "./components/Header";

function DashboardView() {
  return (
    <div className="dashboard">
      <Header />
      <h1>Find a Room</h1>
      <DatePicker />
      <RoomList />
    </div>
  );
}

export default DashboardView;
```

### Making a Reservation Programmatically

```tsx
import React from "react";
import { useApp } from "./context/AppContext";

function QuickBookRoom({ roomId }: { roomId: string }) {
  const { selectedDate, makeReservation, getAvailableTimeSlots } = useApp();

  const handleQuickBook = () => {
    // Get first available time slot
    const availableSlots = getAvailableTimeSlots(roomId, selectedDate);

    if (availableSlots.length > 0) {
      // Create a one-person reservation
      makeReservation(
        roomId,
        availableSlots[0].id,
        selectedDate,
        "Quick meeting",
        1
      );
      alert("Room booked successfully!");
    } else {
      alert("No available time slots for this room today.");
    }
  };

  return <button onClick={handleQuickBook}>Quick Book</button>;
}
```

### Building a Room Analytics Component

```tsx
import React from "react";
import { useApp } from "./context/AppContext";

function RoomUsageStats() {
  const { rooms, reservations } = useApp();

  // Calculate usage statistics
  const roomStats = rooms.map((room) => {
    const roomReservations = reservations.filter((r) => r.roomId === room.id);
    const usage = roomReservations.length;
    const totalAttendees = roomReservations.reduce(
      (sum, res) => sum + res.attendees,
      0
    );

    return {
      id: room.id,
      name: room.name,
      usage,
      totalAttendees,
      averageGroupSize: usage > 0 ? totalAttendees / usage : 0,
    };
  });

  return (
    <div className="stats-container">
      <h2>Room Usage Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Room</th>
            <th>Reservations</th>
            <th>Total Attendees</th>
            <th>Avg. Group Size</th>
          </tr>
        </thead>
        <tbody>
          {roomStats.map((stat) => (
            <tr key={stat.id}>
              <td>{stat.name}</td>
              <td>{stat.usage}</td>
              <td>{stat.totalAttendees}</td>
              <td>{stat.averageGroupSize.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```
