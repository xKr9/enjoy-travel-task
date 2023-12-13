import ApiClient from "@/api/ApiClient";
import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/utils/helpers";
import { useSuspenseQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default function Dashboard() {
  const { data: reservations } = useSuspenseQuery({
    queryKey: ["reservations"],
    queryFn: () => ApiClient.cars.listReservations(),
    select: (data) => {
      return data.map((r) => {
        return {
          ...r,
          id: uuid(),
        };
      });
    },
  });
  return (
    <AppLayout>
      <h1 className="text-5xl lg:text-7xl font-bold">
        My Current Reservations
      </h1>
      <div className="py-5 flex items-center justify-start">
        <Link
          to="/dashboard/create-reservation"
          className="py-2 px-8 text-white bg-black rounded-lg"
        >
          Create reservation
        </Link>
      </div>
      <section className="sm:grid-cols-2 grid gap-5 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
        <React.Suspense
          fallback={
            <>
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-[200px] w-full" />
            </>
          }
        >
          {reservations.map((reservation) => {
            return (
              <Card key={reservation.id}>
                <CardHeader>
                  <CardTitle>
                    {reservation.firstName} {reservation.lastName}
                  </CardTitle>
                  <CardDescription>
                    {dayjs(reservation.dateOfBirth).format("DD/MM/YYYY")} -{" "}
                    {reservation.contact}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-bold text-xl">
                    {reservation.carPreference.brand} -{" "}
                    {reservation.carPreference.model}
                  </p>
                  <p className="font-bold text-2xl">
                    {reservation.price && formatCurrency(reservation.price)}
                  </p>
                </CardContent>
                <CardFooter>
                  <p>
                    {dayjs(reservation.startDate).format("DD/MM/YYYY")} -{" "}
                    {dayjs(reservation.endDate).format("DD/MM/YYYY")}
                  </p>
                </CardFooter>
              </Card>
            );
          })}
        </React.Suspense>
        {}
      </section>
    </AppLayout>
  );
}
