import { Bot, User } from "../types/type";

const fixedMockBots: Bot[] = [
  {
    botName: "HR-бот (тестовый)",
    status: "TestMe",
    stats: { messages: 753, processed: 362, effectiveness: "48%" },
    channel: { name: "Bitrix24", id: "id12345672", enabled: true },
  },
  {
    botName: "Бот для продаж",
    status: "Waiting",
    stats: { messages: 191, processed: 176, effectiveness: "92%" },
    channel: { name: "Telegram", id: "@telegram_channel_3", enabled: false },
  },
  {
    botName: "Бот для поддержки клиентов",
    status: "Typing",
    stats: { messages: 619, processed: 609, effectiveness: "98%" },
    channel: { name: "Bitrix24", id: "id12345674", enabled: true },
  },
  {
    botName: "Тестовый",
    status: "ConnectChannel",
    stats: { messages: 85, processed: 69, effectiveness: "81%" },
    channel: { name: "Telegram", id: "@telegram_channel_7", enabled: true },
  },
  {
    botName: "Бот для продаж",
    status: "Waiting",
    stats: { messages: 439, processed: 234, effectiveness: "53%" },
    channel: { name: "Telegram", id: "@telegram_channel_5", enabled: false },
  },
  {
    botName: "HR-бот (тестовый)",
    status: "Typing",
    stats: { messages: 105, processed: 78, effectiveness: "74%" },
    channel: { name: "Bitrix24", id: "id12345679", enabled: false },
  },
  {
    botName: "Тестовый",
    status: "Waiting",
    stats: { messages: 800, processed: 759, effectiveness: "95%" },
    channel: { name: "Telegram", id: "@telegram_channel_1", enabled: true },
  },
  {
    botName: "Бот для поддержки клиентов",
    status: "ConnectChannel",
    stats: { messages: 230, processed: 215, effectiveness: "93%" },
    channel: { name: "Bitrix24", id: "id12345670", enabled: true },
  },
  {
    botName: "Бот для продаж",
    status: "TestMe",
    stats: { messages: 520, processed: 400, effectiveness: "77%" },
    channel: { name: "Telegram", id: "@telegram_channel_2", enabled: false },
  },
  {
    botName: "HR-бот (тестовый)",
    status: "Typing",
    stats: { messages: 1000, processed: 900, effectiveness: "90%" },
    channel: { name: "Bitrix24", id: "id12345671", enabled: true },
  },
];

export function addFixedBotsToUsers(users: User[]): User[] {
  return users.map((user, i) => {
    const bot = fixedMockBots[i % fixedMockBots.length];
    return {
      ...user,
      bot,
    };
  });
}
