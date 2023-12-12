import z from "zod";

export const CreateReservationSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  contact: z.string().nonempty({ message: "Contact is required" }),
  startDate: z.string().nonempty({ message: "Start date is required" }),
  endDate: z.string().nonempty({ message: "End date is required" }),
  carPreference: z.object({
    brand: z.string().nonempty({ message: "Brand is required" }),
    model: z.string().nonempty({ message: "Model is required" }),
  }),
});
