import React, { useState, useEffect } from 'react';
import { Compass, Radio, Activity, RefreshCw } from 'lucide-react';
import { ExtensionMessage } from '../types/messages';

export const SidePanel: React.FC = () => {
  const [backgroundStatus, setBackgroundStatus] = useState<string>('Not tested');
  const [contentStatus, setContentStatus] = useState<string>('Not tested');
  const [activeTabInfo, setActiveTabInfo] = useState<{ id?: number; url?: string; title?: string } | null>(null);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [isTestingBackground, setIsTestingBackground] = useState<boolean>(false);
  const [isTestingContent, setIsTestingContent] = useState<boolean>(false);

  const addLog = (msg: string) => {
    setLogMessages((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 19)]);
  };

  const checkActiveTab = async () => {
    if (typeof chrome === 'undefined' || !chrome.tabs) {
      addLog('Chrome tabs API not available in current context.');
      return;
    }

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab) {
        setActiveTabInfo({ id: tab.id, url: tab.url, title: tab.title });
        addLog(`Active tab identified: ${tab.title?.slice(0, 30) || 'Untitled'} (ID: ${tab.id})`);
      }
    } catch (err) {
      addLog(`Failed to query active tab: ${(err as Error).message}`);
    }
  };

  useEffect(() => {
    addLog('NAVI Side Panel mounted.');
    checkActiveTab();
  }, []);

  const handlePingBackground = () => {
    setIsTestingBackground(true);
    addLog('Dispatching NAVI_PING_BACKGROUND to service worker...');

    if (typeof chrome === 'undefined' || !chrome.runtime?.sendMessage) {
      setBackgroundStatus('Failed (Not running in Chrome)');
      setIsTestingBackground(false);
      return;
    }

    const message: ExtensionMessage = {
      type: 'NAVI_PING_BACKGROUND',
      source: 'sidepanel',
      timestamp: new Date().toISOString()
    };

    chrome.runtime.sendMessage(message, (response) => {
      setIsTestingBackground(false);
      if (chrome.runtime.lastError) {
        const err = chrome.runtime.lastError.message || 'Unknown error';
        setBackgroundStatus(`Error: ${err}`);
        addLog(`Background ping error: ${err}`);
      } else if (response && response.success) {
        setBackgroundStatus('Connected');
        addLog(`Background response: ${response.data.message}`);
      } else {
        setBackgroundStatus('Unexpected response');
        addLog('Background ping received invalid response payload.');
      }
    });
  };

  const handlePingContent = async () => {
    setIsTestingContent(true);
    addLog('Querying active tab to ping Content Script...');

    if (typeof chrome === 'undefined' || !chrome.tabs?.sendMessage) {
      setContentStatus('Failed (Not running in Chrome)');
      setIsTestingContent(false);
      return;
    }

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab?.id) {
        setContentStatus('No active tab found');
        setIsTestingContent(false);
        return;
      }

      const message: ExtensionMessage = {
        type: 'NAVI_PING_CONTENT',
        source: 'sidepanel',
        timestamp: new Date().toISOString()
      };

      chrome.tabs.sendMessage(tab.id, message, (response) => {
        setIsTestingContent(false);
        if (chrome.runtime.lastError) {
          const err = chrome.runtime.lastError.message || 'Cannot inject into system or restricted tab';
          setContentStatus('Content script unreachable');
          addLog(`Content ping: ${err} (Refresh page or ensure not on chrome://)`);
        } else if (response && response.success) {
          setContentStatus(`Active (${response.domStats?.elementCount || 0} DOM nodes)`);
          addLog(`Content response: Title: "${response.data.title}" | Nodes: ${response.domStats?.elementCount}`);
        } else {
          setContentStatus('No response');
          addLog('Content script did not return expected response.');
        }
      });
    } catch (err) {
      setIsTestingContent(false);
      setContentStatus('Tab query error');
      addLog(`Error querying tabs: ${(err as Error).message}`);
    }
  };

  return (
    <div className="panel-container">
      {/* Header */}
      <div className="card header-row">
        <div className="brand-badge">
          <Compass style={{ width: 20, height: 20, color: '#818CF8' }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, color: '#FFFFFF' }}>NAVI Extension</div>
            <div style={{ fontSize: 10, color: '#94A3B8' }}>Phase 2 Scaffolding Shell</div>
          </div>
        </div>
        <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: 'rgba(99, 102, 241, 0.15)', color: '#A5B4FC' }}>
          MV3 Loaded
        </span>
      </div>

      {/* Active Tab Card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase' }}>
            Current Target Tab
          </span>
          <button onClick={checkActiveTab} className="btn-secondary" style={{ padding: '3px 8px', fontSize: 10 }}>
            <RefreshCw style={{ width: 10, height: 10 }} />
            Refresh
          </button>
        </div>
        <div style={{ fontSize: 12, color: '#F1F5F9', fontWeight: 500, wordBreak: 'break-all' }}>
          {activeTabInfo?.title || 'No active tab title'}
        </div>
        <div style={{ fontSize: 10, color: '#64748B', fontFamily: 'monospace', wordBreak: 'break-all' }}>
          {activeTabInfo?.url || 'chrome://...'}
        </div>
      </div>

      {/* IPC Diagnostic Tests */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase' }}>
          Extension IPC Diagnostic Tests
        </div>

        {/* Background Ping */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: '#E2E8F0', fontWeight: 500 }}>Background Worker</div>
            <div style={{ fontSize: 10, color: backgroundStatus === 'Connected' ? '#34D399' : '#94A3B8' }}>
              Status: {backgroundStatus}
            </div>
          </div>
          <button
            onClick={handlePingBackground}
            disabled={isTestingBackground}
            className="btn-primary"
          >
            <Radio style={{ width: 12, height: 12 }} />
            {isTestingBackground ? 'Pinging...' : 'Ping Worker'}
          </button>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: '#E2E8F0', fontWeight: 500 }}>Tab Content Script</div>
            <div style={{ fontSize: 10, color: contentStatus.startsWith('Active') ? '#34D399' : '#94A3B8' }}>
              Status: {contentStatus}
            </div>
          </div>
          <button
            onClick={handlePingContent}
            disabled={isTestingContent}
            className="btn-secondary"
          >
            <Activity style={{ width: 12, height: 12 }} />
            {isTestingContent ? 'Pinging...' : 'Ping Content'}
          </button>
        </div>
      </div>

      {/* Diagnostics Event Log */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase' }}>
          Communication Log
        </div>
        <div className="status-log">
          {logMessages.map((log, index) => (
            <div key={index} style={{ marginBottom: 4 }}>
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Notice */}
      <div style={{ padding: '10px 12px', background: 'rgba(30, 41, 59, 0.4)', borderRadius: 8, border: '1px solid var(--border)', fontSize: 11, color: '#94A3B8' }}>
        <strong>Phase 2 Scaffolding Notice:</strong> Autonomous CDP browser actuation and WebSocket planner streaming will be connected in Phase 3.
      </div>
    </div>
  );
};
