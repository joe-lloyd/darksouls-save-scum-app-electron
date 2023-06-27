import React, { useState, useEffect } from 'react';

import GameComponent from './GameComponent';
import ds1Image from '../assets/ds-1.webp';

interface Game {
  name: string;
  savePath: string;
  imagePath: string;
}

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>([
    {
      name: 'Dark Souls 1',
      savePath: '',
      imagePath: ds1Image,
    }
    // Add more games here as needed
  ]);
  useEffect(() => {
    const fetchSettings = async () => {
      const result = await window.ipcRendererInvoke('get-settings');
      setGames((prev) => {
        const newGames = [...prev];
        newGames[0].savePath = result['ds1-path'];
        return newGames;
      })
    }
    fetchSettings();
  }, []);


  const handlePathChange = async (index: number, newPath: string) => {
    const newGames = [...games];
    newGames[index].savePath = newPath;
    setGames(newGames);

    const settings = await window.ipcRendererInvoke('get-settings');
    settings['ds1-path'] = newPath;
    // Update settings.json
    const success = await window.ipcRendererInvoke('update-settings', settings);
    if (!success) {
      console.error('Failed to update settings');
    }
  };

  const handleSaveBackup = (index: number) => {
    alert(`Save backup for ${games[index].name}`);
    // Implement your save backup functionality here
  };

  const handleLoadBackup = (index: number) => {
    alert(`Load backup for ${games[index].name}`);
    // Implement your load backup functionality here
  };

  const handleBrowse = async (index: number) => {
    const newPath: string = await window.ipcRendererInvoke('open-file-dialog');
    if (newPath) {
      handlePathChange(index, newPath);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">From Software Save Scum Manager</h1>
      {games.map((game, index) => (
        <GameComponent
          key={index}
          name={game.name}
          savePath={game.savePath}
          imagePath={game.imagePath}
          onPathChange={(newPath) => handlePathChange(index, newPath)}
          onSaveBackup={() => handleSaveBackup(index)}
          onLoadBackup={() => handleLoadBackup(index)}
          onBrowse={() => handleBrowse(index)}
        />
      ))}
    </div>
  );
};

export default App;
