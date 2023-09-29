const initBackground = async () => {
  const data = chrome.storage?.sync.get({ isDark: false });
  document.body.style.backgroundColor = data?.isDark ? "#292c35" : "#fff";
};

await initBackground();
