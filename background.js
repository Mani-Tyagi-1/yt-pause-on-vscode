chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    // All Chrome windows are unfocused
    chrome.tabs.query({ url: "*://*.youtube.com/watch*" }, (tabs) => {
      tabs.forEach((tab) => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: pauseVideo,
        });
      });
    });
  } else {
    // A Chrome window has been focused
    chrome.tabs.query({ url: "*://*.youtube.com/watch*" }, (tabs) => {
      tabs.forEach((tab) => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: playVideo,
        });
      });
    });
  }
});

function pauseVideo() {
  const video = document.querySelector("video");
  if (video) {
    video.pause();
  }
}

function playVideo() {
  const video = document.querySelector("video");
  if (video) {
    video.play();
  }
}
