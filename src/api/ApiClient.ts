import axios from "axios";
import CarsApiClient from "./CarsApiClient/CarsApiClient";

const http = axios.create({
  baseURL: `${window.location.origin}/api`,
  withCredentials: true,
});

export default class ApiClient {
  static cars = new CarsApiClient(http);
}
