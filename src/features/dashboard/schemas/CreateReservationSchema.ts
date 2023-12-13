import dayjs from "dayjs";
import z from "zod";

export const CreateReservationSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  contact: z.string().min(1, { message: "Contact is required" }),
  startDate: z.date().refine((data) => dayjs().isBefore(dayjs(data)), {
    message: "Start date must be after todays date",
  }),
  dateOfBirth: z.date(),
  endDate: z.date(),
  carPreference: z.object({
    brand: z.string().nonempty({ message: "Brand is required" }),
    model: z.string().nonempty({ message: "Model is required" }),
  }),
});
