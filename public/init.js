const initBackground = () => {
  chrome.storage?.sync.get({ isDark: false }).then(data => {
    document.body.style.backgroundColor = data?.isDark ? "#292c35" : "#fff";
  });
};

initBackground();
