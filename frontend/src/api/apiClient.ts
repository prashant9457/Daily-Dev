import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll() {
    return axiosInstance
      .get<T[]>(this.endpoint)
      .then((res) => res.data);
  }

  post(data: T) {
    return axiosInstance
      .post<T>(this.endpoint, data)
      .then((res) => res.data);
  }

  patch(data: T) {
    return axiosInstance
      .patch<T>(this.endpoint, data)
      .then((res) => res.data);
  }

  delete() {
    return axiosInstance
      .delete(this.endpoint)
      .then((res) => res.data);
  }
}

export default APIClient;
