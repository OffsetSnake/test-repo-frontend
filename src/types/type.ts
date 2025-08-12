export interface Channel {
  name: "Bitrix24" | "Telegram";
  id: string;
  enabled: boolean;
}

export interface BotStats {
  messages: number;
  processed: number;
  effectiveness: string;
}

export interface Bot {
  id: number;
  botName:
    | "Бот для продаж"
    | "Бот для поддержки клиентов"
    | "Тестовый"
    | "HR-бот (тестовый)";
  status: "Typing" | "Waiting" | "TestMe" | "ConnectChannel";
  stats: BotStats;
  channel: Channel;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  bot?: Bot;
}
