let currentTab = "";
let startTime = Date.now();

chrome.tabs.onActivated.addListener(async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  updateTime(tab.url);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.url) {
    updateTime(tab.url);
  }
});

function updateTime(url) {
  let endTime = Date.now();
  let timeSpent = Math.floor((endTime - startTime) / 1000);

  if (currentTab) {
    chrome.storage.local.get([currentTab], (result) => {
      let total = result[currentTab] || 0;
      chrome.storage.local.set({ [currentTab]: total + timeSpent });
    });
  }

  currentTab = new URL(url).hostname;
  startTime = Date.now();
}