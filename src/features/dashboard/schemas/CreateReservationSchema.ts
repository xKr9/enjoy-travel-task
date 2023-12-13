import z from "zod";

export const CreateReservationSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  contact: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
  carPreference: z.object({
    brand: z.string().nonempty({ message: "Brand is required" }),
    model: z.string().nonempty({ message: "Model is required" }),
  }),
});
