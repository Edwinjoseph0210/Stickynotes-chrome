// Background Service Worker Entry Point
// @ts-ignore: chrome types are available in extension context

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'webwhiz_add_note',
    title: 'Add WebWhiz Sticky Note',
    contexts: ['all'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'webwhiz_add_note' && tab && tab.id) {
    chrome.tabs.sendMessage(tab.id, { type: 'WEBWHIZ_ADD_NOTE' });
  }
}); 