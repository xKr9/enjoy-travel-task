import { Car } from "@/features/dashboard/types/car.t";
import { AxiosInstance } from "axios";
import { CarCreateRequest, CarReservations } from "./types";

export default class CarsApiClient {
  private http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async list(): Promise<Car[]> {
    const result = await this.http.get("/cars");
    return result.data;
  }

  async createReservation({ data }: { data: CarCreateRequest }) {
    const result = await this.http.post("/cars/hire", data);
    return result.data;
  }

  async listReservations(): Promise<CarReservations[]> {
    const result = await this.http.get("/hire");
    return result.data;
  }
}
