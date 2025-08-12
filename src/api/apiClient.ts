import axios from "axios";
import { addFixedBotsToUsers } from "../utils/generatePlaceholder";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchUsers = async () => {
  const response = await apiClient.get("/users");
  if (response.status !== 200) {
    throw new Error(
      `Ошибка получения пользователей: статус ${response.status}`
    );
  }
  const usersWithBots = addFixedBotsToUsers(response.data);

  return usersWithBots;
};
