const parseFieldSettings = require("../utils/parse-settings");

function parseSettings({ settings }) {
  const data = {};
  if (settings.note != undefined) {
    data.note = settings.note;
  }

  if (settings.ref) {
    let ref = settings.ref
      .replace("-", "")
      .replace(">", "")
      .replace("<", "")
      .replaceAll(" ", "");

    const [table, col] = ref.split(".");
    data.references = {
      model: table,
      key: col,
    };
  }

  if (settings["primary key"] || settings.pk) {
    data.primaryKey = true;
  }
  if (settings.unique) {
    data.unique = true;
  }

  if (settings.increment) {
    data.autoIncrement = true;
  }

  if (settings.null) {
    data.allowNull = true;
  }

  if (settings["not null"]) {
    data.allowNull = false;
  }

  if (settings.default) {
    data.defaultValue = settings.default;
  }
  return data;
}

module.exports = function parseTableContent(line, settingList) {
  const colDef = {};
  let [columnName, dataType, ...settings] = line.split(" ");

  columnName = columnName.trim();
  dataType = dataType.trim();

  if (columnName == "Note:") {
    let [columnName, comment] = line.split(":");
    colDef.comment = comment;
  } else if (settings) {
    settings = settings.join(" ");
    const parsedSettings = parseSettings(
      parseFieldSettings(settings, settingList)
    );

    colDef[columnName] = {
      ...parsedSettings,
    };

    if (dataType) {
      colDef[columnName].type = dataType;
    }
  } else {
    colDef[columnName] = dataType;
  }

  return colDef;
};
