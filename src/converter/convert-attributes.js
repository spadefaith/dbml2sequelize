module.exports = function convertAttributes(attributes, sequelize, DataTypes) {
  return attributes.reduce((accu, iter) => {
    const name = Object.keys(iter)[0];
    const conf = iter[name];

    // console.log(6, conf);

    const callbacks = [
      convertVarChar,
      convertInteger,
      convertTimestamp,
      convertString,
      convertNote,
    ];

    for (let i = 0; i < callbacks.length; i++) {
      const callback = callbacks[i];
      const converted = callback(conf, sequelize, DataTypes);

      if (converted) {
        accu[name] = {
          ...conf,
          ...converted,
        };
        // break;
      }
    }
    return accu;
  }, {});
};

function convertVarChar({ type, defaultValue }, sequelize, DataTypes) {
  if (type.includes("varchar")) {
    return { type: DataTypes.STRING };
  }
}

function convertInteger({ type, defaultValue }, sequelize, DataTypes) {
  if (type.includes("integer")) {
    return { type: DataTypes.INTEGER };
  }
}

function convertTimestamp({ type, defaultValue }, sequelize, DataTypes) {
  if (type.includes("timestamp")) {
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
  if (type.includes("string")) {
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
