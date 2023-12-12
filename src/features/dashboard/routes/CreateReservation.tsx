import { DatePicker } from "@/components/DatePicker/DatePicker";
import AppLayout from "@/components/layouts/AppLayout";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useToast } from "@/components/ui/use-toast";
import CarHireBanner from "@/assets/car-hire-banner.jpg";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Car } from "../types/car.t";
import { formatCurrency } from "@/utils/helpers";
import { CreateReservationSchema } from "../schemas/CreateReservationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | undefined;
  contact: string;
  carPreference: {
    brand: string;
    model: string;
  };
  startDate: Date | undefined;
  endDate: Date | undefined;
  price: number | null;
};

export default function CreateReservation() {
  const { toast } = useToast();
  const [cars, setCars] = useState<Car[]>([]);
  const form = useForm<FormData>({
    resolver: zodResolver(CreateReservationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: undefined,
      contact: "",
      carPreference: {
        brand: "",
        model: "",
      },
      startDate: undefined,
      endDate: undefined,
      price: null,
    },
  });

  useEffect(() => {
    fetch("/api/cars")
      .then((res) => res.json())
      .then((res) => setCars(res));
  }, []);

  useEffect(() => {
    if (dayjs(form.watch("startDate")).isAfter(dayjs(form.watch("endDate")))) {
      toast({
        title: "Start date cannot be after end date",
      });
    }
  }, [form.watch("startDate"), form.watch("endDate")]);

  const onFormSubmit: SubmitHandler<FormData> = (data: FormData) => {};

  console.log(form.formState.errors);

  return (
    <AppLayout classNames="lg:p-0">
      <Form {...form}>
        <form
          className="flex w-full"
          onSubmit={form.handleSubmit(onFormSubmit)}
        >
          <div className="flex flex-col items-start lg:px-10 w-full gap-5 justify-start pt-10">
            <div className="flex flex-col gap-3">
              <Link
                className="flex gap-1 items-center font-bold"
                to="/dashboard"
              >
                <Icon icon="gravity-ui:chevron-left" />
                Return to Dashboard
              </Link>
              <h1 className="text-6xl font-bold">Hire a car</h1>
            </div>
            <section className="grid gap-5 w-full grid-cols-1">
              <div className="flex flex-col gap-2">
                <Label>First Name</Label>
                <Input
                  error={form.formState.errors.firstName?.message}
                  {...form.register("firstName")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Last Name</Label>
                <Input
                  error={form.formState.errors.lastName?.message}
                  {...form.register("lastName")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Date of Birth</Label>
                <DatePicker
                  onChange={(e) => {
                    form.setValue("dateOfBirth", e);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Contact</Label>
                <Input />
              </div>
              <div className="flex flex-col gap-2">
                <FormLabel>Car Preference</FormLabel>
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name="carPreference.brand"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a car brand" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cars.map((car) => (
                              <SelectItem key={car.brand} value={car.brand}>
                                {car.brand}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  {form.watch("carPreference.brand") && (
                    <FormField
                      control={form.control}
                      name="carPreference.model"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a car model" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {cars
                                .find(
                                  (car) =>
                                    car.brand ===
                                    form.watch("carPreference.brand")
                                )
                                ?.models.map((model) => (
                                  <SelectItem key={model} value={model}>
                                    {model}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
            </section>

            <section className="grid gap-5 grid-cols-1 xl:grid-cols-2 w-full">
              <div className="flex flex-col gap-2 w-full">
                <Label>Start Date</Label>
                <DatePicker
                  value={form.watch("endDate")}
                  onChange={(e) => {
                    form.setValue("startDate", e);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label>End Date</Label>
                <DatePicker
                  value={form.watch("startDate")}
                  onChange={(e) => {
                    form.setValue("endDate", e);
                  }}
                />
              </div>
            </section>
            <Button
              type="button"
              disabled={
                !form.watch("startDate") ||
                !form.watch("endDate") ||
                !form.watch("carPreference.brand") ||
                !form.watch("carPreference.model")
              }
              onClick={() => {
                form.setValue(
                  "price",
                  (cars.find(
                    (c) => c.brand === form.watch("carPreference.brand")
                  )?.price || 0) *
                    dayjs(form.watch("endDate")).diff(
                      dayjs(form.watch("startDate")),
                      "day"
                    )
                );
              }}
              className="self-end w-full lg:w-1/4"
            >
              Calculate Price
            </Button>

            {dayjs(form.watch("endDate")).diff(
              dayjs(form.watch("startDate")),
              "day"
            ) > 0 ? (
              <div className="w-full flex-col gap-5 justify-center items-center flex font-bold text-5xl">
                {formatCurrency(form.watch("price") || 0)}
                <Button
                  type="submit"
                  onClick={form.handleSubmit(onFormSubmit)}
                  className="self-center w-full lg:w-1/4"
                >
                  Confirm Reservation
                </Button>
              </div>
            ) : null}
          </div>
          <img
            src={CarHireBanner}
            alt="Car Hire Banner"
            className="w-full hidden lg:block min-h-screen object-cover"
          />
        </form>
      </Form>
    </AppLayout>
  );
}
