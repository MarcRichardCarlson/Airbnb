// BookingContext.tsx
import React, { createContext, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

type BookingContextType = {
  selectedDates: [Date | null, Date | null];
  setDates: Dispatch<SetStateAction<[Date | null, Date | null]>>;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDates, setDates] = React.useState<[Date | null, Date | null]>([null, null]);

  return (
    <BookingContext.Provider value={{ selectedDates, setDates }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }

  return context;
};
