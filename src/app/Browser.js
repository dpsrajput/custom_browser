"use client";
import React, { useState } from 'react';

const Browser = () => {
    const [url, setUrl] = useState('https://www.google.com');

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const handleGo = () => {
        window.electronAPI.loadURL(url);
    };
    const handleSet = () => {
        setTimeout(() => {
            window.electronAPI.fillUsername("userId");
            // window.electronAPI.setPassword("Q123@asd");
        }, 3000);
    };
    const handleBack = () => {
        window.electronAPI.goBack();
    };

    const handleForward = () => {
        window.electronAPI.goForward();
    };

    const handleReload = () => {
        window.electronAPI.reload();
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '5px', backgroundColor: '#f1f1f1' }}>
                <button onClick={handleBack}>Back</button>
                <button onClick={handleForward}>Forward</button>
                <button onClick={handleReload}>Reload</button>
                <input
                    type="text"
                    value={url}
                    onChange={handleUrlChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleGo()}
                    style={{ flexGrow: 1, marginLeft: '10px', marginRight: '10px', padding: '5px' }}
                />
                <button onClick={handleGo}>Go</button>
                <button onClick={handleSet}>setId</button>
            </div>
            <div id="webview" style={{ width: '100%', height: 'calc(100vh - 40px)' }} />
        </div>
    );
};

export default Browser;
