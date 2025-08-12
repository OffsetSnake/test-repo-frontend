import { Component, createSignal } from "solid-js";
import debounce from "lodash/debounce";
import axios from "axios";
import { User } from "../../types/type";
import Icon from "../../icons/Icon";

interface CardProps {
  user: User;
}

const TEXT_STATUS = {
  Waiting: "Ожидаю сообщений",
  Typing: "Печатаю",
  TestMe: "Протестируйте меня",
  ConnectChannel: "Подключите канал",
};

const COLOR_STATUS = {
  Waiting: "#8695A7",
  Typing: "#0CCA1F",
  TestMe: "#CA8A0C",
  ConnectChannel: "#3751DB",
};

const updateUserName = async ({ id, name }: { id: number; name: string }) => {
  const response = await axios.patch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    { name }
  );
  return response.data;
};

const Card: Component<CardProps> = ({ user }) => {
  const [rotated, setRotated] = createSignal(false);

  const debouncedUpdate = debounce((value) => {
    updateUserName({ id: user.id, name: value });
  }, 800);

  function onNameChange(e: Event) {
    const newName = (e.target as HTMLInputElement).value;
    debouncedUpdate(newName);
  }

  const stats = [
    { label: "Сообщений", value: user.bot?.stats.messages },
    { label: "Отработано", value: user.bot?.stats.processed },
    { label: "Эффективность", value: user.bot?.stats.effectiveness },
  ];

  function getNotificationIconName(
    status?: string
  ): "NotificationOn" | "NotificationOff" {
    return status === "Typing" || status === "Waiting"
      ? "NotificationOn"
      : "NotificationOff";
  }

  return (
    <div class="w-[330px] rounded-2xl bg-white text-black p-5 text-xs font-semibold py-[20px]">
      <div class="flex flex-row items-center justify-between">
        <div class="flex items-center gap-2">
          <Icon name={`${user.bot?.status ?? "Waiting"}`} />
          {user.bot?.status === "Typing" && (
            <div class="flex gap-1">
              <span
                class="w-1 h-1 rounded-full bg-green-500 animate-pulseFade"
                style="animation-delay: 0s"
              ></span>
              <span
                class="w-1 h-1 rounded-full bg-green-500 animate-pulseFade"
                style="animation-delay: 0.3s"
              ></span>
              <span
                class="w-1 h-1 rounded-full bg-green-500 animate-pulseFade"
                style="animation-delay: 0.6s"
              ></span>
            </div>
          )}
          <span style={{ color: COLOR_STATUS[user.bot?.status ?? "Waiting"] }}>
            {TEXT_STATUS[user.bot?.status ?? "Waiting"]}
          </span>
        </div>
        {user.bot?.status === "TestMe" && (
          <button class="w-[110px] h-[24px] text-[#CA8A0C] bg-[#F9E6BF] flex items-center justify-center rounded gap-1 px-[9px] py-[6px]">
            Тестировать
            <svg
              class="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        )}
      </div>
      <div class="mt-3 flex flex-col gap-[6px]">
        <span>Редактируемое поле</span>
        <input
          class="w-full border border-gray-300 rounded px-2 py-1 text-black text-sm bg-white"
          type="text"
          value={user.name}
          onInput={onNameChange}
        />
      </div>
      <div class="py-2 flex justify-between">
        <div class="font-semibold text-xl mb-2 overflow-hidden whitespace-nowrap overflow-ellipsis">
          {user.bot?.botName}
        </div>
        <Icon name={getNotificationIconName(user.bot?.status)} />
      </div>
      <div class="flex justify-between">
        {stats.map((stat, i) => (
          <div
            class={`flex flex-col px-3 ${
              i === 0 ? "pl-0" : "border-l border-gray-200"
            } ${i === stats.length - 1 ? "pr-0" : ""}`}
          >
            <span class="text-[11px] font-semibold pb-1">{stat.label}</span>
            <span class="text-[20px] font-semibold">{stat.value}</span>
          </div>
        ))}
      </div>
      <button class="text-white font-semibold bg-[#11253E] text-[14px] my-[14px] w-full flex justify-center gap-[6px] py-[14px] rounded-[10px]">
        <Icon name="Pencil" />
        Настройка чат-бота
      </button>
      <div class="flex items-center gap-[6px]">
        <span class="text-[#8695A7] text-[11px], font-medium">КАНАЛЫ</span>
        <Icon name="Info" />
      </div>
      <div class="flex rounded-[10px] px-[12px] py-[14px] w-full justify-between items-center bg-[#F0F4FA] mt-[12px]">
        <div class="flex items-center gap-[10px]">
          <Icon name={`${user.bot?.channel.name ?? "Telegram"}`} />
          <span class="text-[13px] font-semibold">
            {user.bot?.channel.name}
          </span>
          <span class="text-[#8695A7] text-[11px] font-semibold">
            {user.bot?.channel.id}
          </span>
        </div>
        <label class="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            class="sr-only peer"
            checked={user.bot?.channel.enabled}
          />
          <div
            class="relative w-11 h-6 rounded-full box-content
           bg-white border border-[#E1E6EC]
           peer-checked:bg-[#CAF6CF] peer-checked:border-[#BEEAC2]
           after:absolute after:top-0.5 after:left-[2px]
           after:h-5 after:w-5 after:rounded-full after:transition-all
           after:bg-[#8695A7] peer-checked:after:bg-[#0CCA1F]
           peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"
          ></div>
          <span class=" text-sm font-medium text-[#0CCA1F] dark:text-[#0CCA1F]"></span>
        </label>
      </div>
      <button
        class="text-[#8695A7] bg-[#fff] font-semibold text-[13px] mt-[14px] flex items-center p-0 gap-[6px] w-max mx-auto border-0 focus:outline-none focus:ring-0"
        onClick={() => setRotated(!rotated())}
      >
        Детали
        <span
          class={`inline-block transition-transform duration-200 ${
            rotated() ? "rotate-180" : ""
          }`}
        >
          <Icon name="ArrowDown" />
        </span>
      </button>
    </div>
  );
};

export default Card;
