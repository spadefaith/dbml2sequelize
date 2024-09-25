const parseFieldSettings = require("../utils/parse-settings");

function parseSettings({ settings }) {
  const data = {};

  if (settings.name != undefined) {
    data.name = settings.name;
  }

  // if (settings.pk) {
  //   data.primaryKey = true;
  // }

  if (settings.type) {
    data.type = settings.type.toUpperCase();
  }

  if (settings.unique != undefined) {
    data.unique = true;
  }

  // console.log(285, data);

  return data;
}

module.exports = function parseIndexesContent(line, settingList) {
  line = line.trim();

  const colDef = {};
  let [columnName, ...settings] = line.split("[");
  columnName = columnName.trim();
  settings = settings.join(" ").trim();
  if (settings) {
    settings = `[${settings}`;
  }

  if (settings) {
    const parsedSettings = parseSettings(
      parseFieldSettings(settings, settingList)
    );

    colDef[columnName] = {
      ...parsedSettings,
    };
  } else {
    colDef[columnName] = true;
  }

  return colDef;
};
