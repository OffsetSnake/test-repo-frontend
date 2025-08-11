import axios from "axios";
import { addRandomBotToUsers } from "../utils/generatePlaceholder";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchUsers = async () => {
  const response = await apiClient.get("/users");
  //Написать проверку на успешное получение users!
  const usersWithBots = addRandomBotToUsers(response.data);
  return usersWithBots;
};
