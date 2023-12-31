import { DatePicker } from "@/components/DatePicker/DatePicker";
import AppLayout from "@/components/layouts/AppLayout";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useToast } from "@/components/ui/use-toast";
import CarHireBanner from "@/assets/car-hire-banner.jpg";
import { Link, useNavigate } from "react-router-dom";
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
import { formatCurrency } from "@/utils/helpers";
import { CreateReservationSchema } from "../schemas/CreateReservationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ApiClient from "@/api/ApiClient";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { CarCreateRequest } from "@/api/CarsApiClient/types";

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
  const navigate = useNavigate();
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
  const { data: carsData } = useSuspenseQuery({
    queryKey: ["cars"],
    queryFn: () => ApiClient.cars.list(),
  });
  const { mutate } = useMutation({
    mutationFn: (data: CarCreateRequest) =>
      ApiClient.cars.createReservation({ data }),
    onSuccess: () => {
      toast({
        title: "Reservation created",
      });
      navigate("/dashboard");
    },
    onError: () => {
      toast({
        title: "Failed creating reservation",
      });
    },
  });

  useEffect(() => {
    if (
      dayjs(form.watch("startDate")).isValid() &&
      dayjs(form.watch("endDate")).isValid() &&
      dayjs(form.watch("startDate")).isAfter(dayjs(form.watch("endDate")))
    ) {
      toast({
        title: "Start date cannot be after end date",
      });
    }
  }, [form.watch("startDate"), form.watch("endDate")]);

  const onFormSubmit: SubmitHandler<FormData> = (data: FormData) => {
    if (!form.watch("price")) return;
    mutate({
      carPreference: {
        brand: data.carPreference.brand,
        model: data.carPreference.model,
      },
      contact: data.contact,
      dateOfBirth: dayjs(data.dateOfBirth).toISOString(),
      endDate: dayjs(data.endDate).toISOString(),
      firstName: data.firstName,
      lastName: data.lastName,
      price: form.getValues("price"),
      startDate: dayjs(data.startDate).toISOString(),
    });
  };

  return (
    <AppLayout classNames="lg:p-0">
      <Form {...form}>
        <form className="flex" onSubmit={form.handleSubmit(onFormSubmit)}>
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
            <section className="grid lg:grid-cols-2 xl:gap-6 gap-5 w-full items-end">
              <div className="flex flex-col gap-2">
                <Label>
                  First Name
                  {form.formState.errors.firstName?.message && (
                    <span className="text-red-500 px-2 text-xs">
                      {form.formState.errors.firstName?.message}
                    </span>
                  )}
                </Label>
                <Input {...form.register("firstName")} />
              </div>
              <div className="flex flex-col gap-2">
                <Label>
                  Last Name
                  {form.formState.errors.lastName?.message && (
                    <span className="text-red-500 px-2 text-xs">
                      {form.formState.errors.lastName?.message}
                    </span>
                  )}
                </Label>
                <Input {...form.register("lastName")} />
              </div>
              <div className="flex flex-col gap-2">
                <Label>
                  Date of Birth
                  {form.formState.errors.dateOfBirth?.message && (
                    <span className="text-red-500 px-2 text-xs">
                      {form.formState.errors.dateOfBirth?.message}
                    </span>
                  )}
                </Label>
                <DatePicker
                  value={form.watch("dateOfBirth")}
                  onChange={(e) => {
                    form.setValue("dateOfBirth", e);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>
                  Contact{" "}
                  {form.formState.errors.contact?.message && (
                    <span className="text-red-500 px-2 text-xs">
                      {form.formState.errors.contact?.message}
                    </span>
                  )}
                </Label>
                <Input {...form.register("contact")} />
              </div>
              <div className="flex sm:col-span-2 flex-col gap-2">
                <FormLabel>Car Preference</FormLabel>
                <React.Suspense fallback={<Skeleton className="h-4 w-full" />}>
                  <div className="flex gap-5 flex-col lg:flex-row w-full">
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
                              {carsData.map((car) => (
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
                                {carsData
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
                </React.Suspense>
              </div>
            </section>

            <section className="grid gap-5 grid-cols-1 xl:grid-cols-2 w-full">
              <div className="flex flex-col gap-2 w-full">
                <Label>
                  Start Date
                  {form.formState.errors.startDate?.message && (
                    <span className="text-red-500 px-2 text-xs">
                      {form.formState.errors.startDate?.message}
                    </span>
                  )}
                </Label>
                <DatePicker
                  value={form.watch("endDate")}
                  onChange={(e) => {
                    form.setValue("startDate", e);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label>
                  End Date
                  {form.formState.errors.endDate?.message && (
                    <span className="text-red-500 px-2 text-xs">
                      {form.formState.errors.endDate?.message}
                    </span>
                  )}
                </Label>
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
                toast({
                  title: "Price calculated",
                });
                form.setValue(
                  "price",
                  (carsData.find(
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
            ) > 0 && form.watch("price") ? (
              <div className="w-full transition-all flex-col gap-5 justify-center items-center flex font-bold text-5xl">
                {formatCurrency(form.watch("price") || 0)}
                <Button
                  type="submit"
                  onClick={form.handleSubmit(onFormSubmit)}
                  className="self-center w-full xl:w-1/4"
                >
                  Confirm Reservation
                </Button>
              </div>
            ) : null}
          </div>
          <div className="w-full xl:block hidden">
            <img
              src={CarHireBanner}
              alt="Car Hire Banner"
              className="hidden xl:block min-h-screen object-cover"
            />
          </div>
        </form>
      </Form>
    </AppLayout>
  );
}
