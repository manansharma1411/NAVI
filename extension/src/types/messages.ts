export type ExtensionMessageType =
  | 'NAVI_PING_BACKGROUND'
  | 'NAVI_PONG_BACKGROUND'
  | 'NAVI_PING_CONTENT'
  | 'NAVI_PONG_CONTENT'
  | 'NAVI_GET_ACTIVE_TAB'
  | 'NAVI_ACTIVE_TAB_INFO';

export interface ExtensionMessage<T = unknown> {
  type: ExtensionMessageType;
  payload?: T;
  timestamp: string;
  source: 'sidepanel' | 'background' | 'content';
}

export interface PongPayload {
  message: string;
  timestamp: string;
  component: string;
  tabId?: number;
  url?: string;
  title?: string;
}
