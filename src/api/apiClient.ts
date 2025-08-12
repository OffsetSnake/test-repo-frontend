import axios from "axios";
import { addFixedBotsToUsers } from "../utils/generatePlaceholder";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchUsers = async ({ start = 0, limit = 4 }) => {
  const response = await apiClient.get("/users", {
    params: { _start: start, _limit: limit },
  });
  if (response.status !== 200) {
    throw new Error(
      `Ошибка получения пользователей: статус ${response.status}`
    );
  }
  const usersWithBots = addFixedBotsToUsers(response.data);
  return usersWithBots;
};
