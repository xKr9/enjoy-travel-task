export type CarCreateRequest = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  contact: string;
  carPreference: {
    brand: string;
    model: string;
  };
  startDate: string;
  endDate: string;
  price: number;
};

export type CarReservations = {
  id: string;
  carPreference: {
    brand: string;
    model: string;
  };
  contact: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  price: number;
  startDate: string;
  endDate: string;
};
