/**
 * NAVI Extension Background Service Worker
 * Neural Autonomous Web Intelligence (Manifest V3)
 */

import { ExtensionMessage, PongPayload } from '../types/messages';

console.log('[NAVI] Background Service Worker initialized.');

// Configure side panel behavior to open when extension action is clicked
chrome.runtime.onInstalled.addListener(() => {
  console.log('[NAVI] Extension installed / updated.');
  if (chrome.sidePanel && 'setPanelBehavior' in chrome.sidePanel) {
    chrome.sidePanel
      .setPanelBehavior({ openPanelOnActionClick: true })
      .catch((err: Error) => console.error('[NAVI] Failed to set side panel behavior:', err));
  }
});

// Handle incoming messages from side panel or content scripts
chrome.runtime.onMessage.addListener((message: ExtensionMessage, _sender, sendResponse) => {
  console.log('[NAVI] Background received message:', message.type, 'from:', message.source);

  if (message.type === 'NAVI_PING_BACKGROUND') {
    const response: PongPayload = {
      message: 'NAVI Background Service Worker is online and operational.',
      timestamp: new Date().toISOString(),
      component: 'background-service-worker'
    };
    sendResponse({ success: true, data: response });
    return true; // Keep channel open for async response
  }

  if (message.type === 'NAVI_GET_ACTIVE_TAB') {
    chrome.tabs.query({ active: true, currentWindow: true }).then(([activeTab]) => {
      sendResponse({
        success: true,
        data: {
          tabId: activeTab?.id,
          url: activeTab?.url,
          title: activeTab?.title
        }
      });
    }).catch((err: Error) => {
      sendResponse({ success: false, error: err.message });
    });
    return true;
  }

  return false;
});
