import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Booking } from './types';

interface BookingStore {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
  getBooking: (id: string) => Booking | undefined;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: [],
      addBooking: (booking) =>
        set((state) => ({ bookings: [booking, ...state.bookings] })),
      updateBooking: (id, updates) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, ...updates } : b
          ),
        })),
      deleteBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.filter((b) => b.id !== id),
        })),
      getBooking: (id) => get().bookings.find((b) => b.id === id),
    }),
    { name: 'hanoi-tourism-bookings' }
  )
);
