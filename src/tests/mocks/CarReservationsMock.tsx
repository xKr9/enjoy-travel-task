import { CarReservations } from "@/api/CarsApiClient/types";
import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";

export default function CarReservationMock({
  options,
}: {
  options: Partial<CarReservations>;
}): CarReservations {
  return {
    id: uuid(),
    carPreference: {
      brand: faker.lorem.words(),
      model: faker.lorem.words(),
    },
    contact: faker.lorem.words(),
    dateOfBirth: faker.date.anytime().toDateString(),
    endDate: faker.date.future().toDateString(),
    startDate: faker.date.past().toDateString(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    price: faker.number.int(),
    ...options,
  };
}
