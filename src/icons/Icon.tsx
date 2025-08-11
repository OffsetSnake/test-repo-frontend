import { Component } from "solid-js";

import Typing from "./status/typing.svg";
import Waiting from "./status/waiting.svg";
import TestMe from "./status/testme.svg";
import ConnectChannel from "./status/connectchannel.svg";
import NotificationOn from "./notification_on.svg";
import NotificationOff from "./notification_off.svg";
import Pencil from "./pencil.svg";
import Info from "./info.svg";
import Telegram from "./tggg.svg";
import Bitrix24 from "./bitrix24-svgrepo-com.svg";
import ArrowDown from "./arrow_down.svg";

const iconsMap = {
  ConnectChannel,
  Typing,
  Waiting,
  TestMe,
  NotificationOn,
  NotificationOff,
  Pencil,
  Info,
  Telegram,
  Bitrix24,
  ArrowDown,
};

interface IconProps {
  name: keyof typeof iconsMap;
  class?: string;
}

const Icon: Component<IconProps> = (props) => {
  const SvgComponent = iconsMap[props.name];
  if (!SvgComponent) return null;
  return <SvgComponent />;
};

export default Icon;
