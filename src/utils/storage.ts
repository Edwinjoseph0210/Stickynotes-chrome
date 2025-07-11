// Utility functions for chrome.storage.local
// @ts-ignore: chrome types are available in extension context

const PROFILE_KEY = 'webwhiz_profile';
const NOTES_KEY = 'webwhiz_sticky_notes';

export function getProfile(): Promise<any> {
  return new Promise((resolve) => {
    chrome.storage.local.get([PROFILE_KEY], (result) => {
      resolve(result[PROFILE_KEY] || {});
    });
  });
}

export function setProfile(profile: any): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [PROFILE_KEY]: profile }, () => resolve());
  });
}

export function getNotes(): Promise<any> {
  return new Promise((resolve) => {
    chrome.storage.local.get([NOTES_KEY], (result) => {
      resolve(result[NOTES_KEY] || {});
    });
  });
}

export function setNotes(notes: any): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [NOTES_KEY]: notes }, () => resolve());
  });
} 