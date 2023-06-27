import React from 'react';

interface Game {
  name: string;
  savePath: string;
  imagePath: string;
  onPathChange: (newPath: string) => void;
  onSaveBackup: () => void;
  onLoadBackup: () => void;
  onBrowse: () => void;
}

const GameComponent: React.FC<Game> = ({ name, savePath, imagePath, onPathChange, onSaveBackup, onLoadBackup, onBrowse }) => {
  return (
    <div className="game-container">
      <img className="game-image" src={imagePath} alt={name} />
      <div className="game-content">
        <h2 className="game-title">{name}</h2>
        <input
          className="game-save-path"
          type="text"
          value={savePath}
          onChange={event => onPathChange(event.target.value)}
        />
        <span className="browse-link" onClick={onBrowse}>Browse...</span>
        <div className="button-container">
          <button className="game-save-button" onClick={onSaveBackup}>Save Backup</button>
          <button className="game-load-button" onClick={onLoadBackup}>Load Backup</button>
        </div>
      </div>
    </div>
  );
};

export default GameComponent;
