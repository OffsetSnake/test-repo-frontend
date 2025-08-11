import { Bot, Channel, User } from "../types/type";

export function addRandomBotToUsers(users: User[]): User[] {
  const botNames: Bot["botName"][] = [
    "Бот для продаж",
    "Бот для поддержки клиентов",
    "Тестовый",
    "HR-бот (тестовый)",
  ];

  const statuses: Bot["status"][] = [
    "Typing",
    "Waiting",
    "TestMe",
    "ConnectChannel",
  ];

  function randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateChannels(): Channel[] {
    const channels: Channel[] = [];

    for (let i = 0; i < 10; i++) {
      channels.push({
        name: "Bitrix24",
        id: `id1234567${i}`,
        enabled: Math.random() < 0.5,
      });
    }

    for (let i = 0; i < 10; i++) {
      channels.push({
        name: "Telegram",
        id: `@telegram_channel_${i}`,
        enabled: Math.random() < 0.5,
      });
    }

    return channels;
  }

  const allChannels = generateChannels();

  return users.map((user) => {
    const randomChannel = allChannels[randInt(0, allChannels.length - 1)];

    const messages = randInt(0, 1000);
    const processed = randInt(0, messages);

    const effectiveness =
      messages === 0 ? "0%" : `${Math.round((processed / messages) * 100)}%`;

    return {
      ...user,
      bot: {
        botName: botNames[randInt(0, botNames.length - 1)],
        status: statuses[randInt(0, statuses.length - 1)],
        stats: {
          messages,
          processed,
          effectiveness,
        },
        channel: randomChannel,
      },
    };
  });
}
