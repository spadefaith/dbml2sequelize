module.exports = function convertAttributes(
  tblName,
  attributes,
  sequelize,
  DataTypes
) {
  const attrs = attributes.reduce((accu, iter) => {
    const name = Object.keys(iter)[0];
    const conf = iter[name];

    conf.tblName = tblName;

    const callbacks = [
      convertVarChar,
      convertInteger,
      convertTimestamp,
      convertString,
      convertNote,
      convertText,
      convertBoolean,
      convertDate,
      convertDateOnly,
      convertDecimal,
    ];

    for (let i = 0; i < callbacks.length; i++) {
      const callback = callbacks[i];
      const converted = callback(conf, sequelize, DataTypes);

      if (converted) {
        accu[name] = {
          ...conf,
          ...converted,
        };
        break;
      }
    }
    return accu;
  }, {});

  return attrs;
};

function convertVarChar(conf, sequelize, DataTypes) {
  const { type } = conf;
  if (type.includes("varchar")) {
    if (type.includes("(") && type.includes(")")) {
      const size = type.match(/\(([^)]+)\)/)[1];
      return { type: DataTypes.STRING(size) };
    } else {
      return { type: DataTypes.STRING };
    }
  }
}

function convertInteger({ type, defaultValue }, sequelize, DataTypes) {
  if (type == "integer") {
    return { type: DataTypes.INTEGER };
  }
}

function convertTimestamp({ type, defaultValue }, sequelize, DataTypes) {
  if (type == "timestamp") {
    if (defaultValue.includes("now()")) {
      return {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn("now"),
      };
    } else {
      return {
        type: DataTypes.DATE,
      };
    }
  }
}

function convertString({ type, defaultValue }, sequelize, DataTypes) {
  if (type == "string") {
    return { type: DataTypes.STRING };
  }
}

function convertNote(conf, sequelize, DataTypes) {
  if (conf.note) {
    const note = conf.note;
    delete conf.note;
    return { comment: note.replaceAll("'", "") };
  }
}

function convertText({ type }, sequelize, DataTypes) {
  if (type.includes("text")) {
    if (type.includes("(") && type.includes(")")) {
      const size = type.match(/\(([^)]+)\)/)[1];
      return { type: DataTypes.TEXT(size) };
    } else {
      return { type: DataTypes.TEXT };
    }
  }
}

function convertBoolean(conf, sequelize, DataTypes) {
  if (conf.type == "boolean") {
    return { type: DataTypes.BOOLEAN };
  }
}

function convertDate(conf, sequelize, DataTypes) {
  if (conf.type == "date") {
    return { type: DataTypes.DATE };
  }
}

function convertDateOnly(conf, sequelize, DataTypes) {
  if (conf.type == "dateonly") {
    return { type: DataTypes.DATEONLY };
  }
}

function convertDecimal({ type }, sequelize, DataTypes) {
  if (type.includes("decimal")) {
    if (type.includes("(") && type.includes(")")) {
      const size = type.match(/\(([^)]+)\)/)[1];
      const [precision, scale] = size.split(",");
      return { type: DataTypes.DECIMAL(parseInt(precision), parseInt(scale)) };
    } else {
      return { type: DataTypes.DECIMAL };
    }
  }
}
