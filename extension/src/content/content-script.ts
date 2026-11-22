/**
 * NAVI Extension Content Script
 * Neural Autonomous Web Intelligence
 */

import { ExtensionMessage, PongPayload } from '../types/messages';

console.log('[NAVI] Content Script injected into:', window.location.href);

// Listen for messages dispatched from the Side Panel or Background worker
chrome.runtime.onMessage.addListener((message: ExtensionMessage, _sender, sendResponse) => {
  if (message.type === 'NAVI_PING_CONTENT') {
    const response: PongPayload = {
      message: 'NAVI Content Script is active on target webpage.',
      timestamp: new Date().toISOString(),
      component: 'content-script',
      url: window.location.href,
      title: document.title
    };

    console.log('[NAVI] Content Script responding to ping from:', message.source);
    sendResponse({
      success: true,
      data: response,
      domStats: {
        readyState: document.readyState,
        elementCount: document.querySelectorAll('*').length
      }
    });
    return true;
  }

  return false;
});
