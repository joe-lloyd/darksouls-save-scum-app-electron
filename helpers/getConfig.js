const fs = require('fs');
const path = require('path');

const getSettings = () => {
  const settingsPath = path.resolve(__dirname, '../settings.json');
  const defaultSettingsPath = path.resolve(__dirname, '../default-settings.json');

  try {
    // If settings.json does not exist, copy default-settings.json to settings.json
    if (!fs.existsSync(settingsPath)) {
      // We also check if the default settings file exists before copying
      if (fs.existsSync(defaultSettingsPath)) {
        fs.copyFileSync(defaultSettingsPath, settingsPath);
      } else {
        console.error(`Default settings file not found at ${defaultSettingsPath}`);
        return null;
      }
    }

    // Now settings.json should exist, so we read and parse it
    const data = fs.readFileSync(settingsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading settings from ${settingsPath}`, error);
    return null;
  }
};

const settings = getSettings();

module.exports = { settings };
