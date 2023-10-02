import constants from "../static/styles/modules/constants.module.scss";
import defaultStore from "../constants/default-store.constants";
import { NewTabStateBase } from "../models/new-tab-state.model";

const initBackground = async () => {
  const data = (await chrome.storage?.sync.get(
    defaultStore
  )) as NewTabStateBase;

  document.body.style.backgroundColor = data?.isDark
    ? constants.darkColor
    : constants.lightColor;
};

await initBackground();

export {};
