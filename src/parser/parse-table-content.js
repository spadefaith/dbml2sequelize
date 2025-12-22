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


  if (settings.delete) {
    // data.references.onDelete = settings.delete.toLowerCase();
    data.onDelete = String(settings.delete).toLowerCase();
  }

  if (settings.update) {
    // data.references.onUpdate = settings.update.toUpperCase();
    data.onUpdate = String(settings.update).toLowerCase();
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

module.exports = function parseTableContent(line, settingList, dataTypesWithComma = []) {
  const colDef = {};
  let [columnName, dataType, ...settings] = line.split(" ");
  dataType = getDataType(line, dataTypesWithComma);
  settings = getSettings(line, dataTypesWithComma);

  columnName = columnName.trim();
  dataType = dataType.trim();

  if (columnName == "Note:") {
    let [columnName, comment] = line.split(":");
    colDef.comment = comment;
  } else if (settings) {
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
    colDef[columnName] = { type: dataType };
  }

  return colDef;
};

function getSettings(line, dataTypesWithComma) {
  let [, ...rem] = line.split(" ");

  rem = rem.join(" ");

  let settings = "";
  let isDataTypeWithComma = false;
  for (const dt of dataTypesWithComma) {
    if (rem.startsWith(dt)) {
      isDataTypeWithComma = true;
      break;
    }
  }

  if (isDataTypeWithComma) {
    settings = line.substring(line.indexOf(")") + 1, line.length).trim();
  } else {
    let firstSpaceIdx = rem.indexOf(" ");
    if (firstSpaceIdx > -1) {
      settings = rem.substring(firstSpaceIdx + 1, rem.length).trim();
    }
  }

  return settings;
}

function getDataType(line, dataTypesWithComma) {
  let [, dataType] = line.split(" ");

  let isDataTypeWithComma = false;
  let hasParen = false;
  for (const dt of dataTypesWithComma) {
    if (dataType.startsWith(dt)) {
      isDataTypeWithComma = true;

      hasParen = dataType.startsWith(dt + "(");

      break;
    }
  }

  if (isDataTypeWithComma && hasParen) {
    dataType = line.substring(line.indexOf(" ") + 1, line.indexOf(")")).trim() + ")";
  }

  return dataType;
}
