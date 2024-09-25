// {
//     name: "campaign_request_id_receiver",
//     using: "BTREE",
//     unique: true,
//     fields: [{ name: "campaign_request_id" }, { name: "receiver" }],
//   }

// [
//     { '(start_date, end_date)': { unique: true } },
//     { start_date: true },
//     { end_date: { name: "'end_date_index'", unique: true } },
//     { booking_date: { using: 'HASH' } }
//   ]

module.exports = function convertIndexes(settings) {
  const indexConf = settings.find((setting) => setting.type == "indexes");

  if (!indexConf) {
    return [];
  }

  const { type, attributes } = indexConf;

  const indexes = attributes.reduce((accu, attr) => {
    const name = Object.keys(attr)[0];
    const conf = attr[name];

    const callbacks = [
      convertBool,
      convertUnique,
      convertType,
      convertName,
      convertPk,
    ];

    let mergeConf = {};
    for (let i = 0; i < callbacks.length; i++) {
      const callback = callbacks[i];
      const converted = callback(conf, name);

      if (converted) {
        mergeConf = {
          ...mergeConf,
          ...converted,
        };
      }
    }

    mergeConf = {
      ...mergeConf,
      ...convertKey(name),
    };

    accu.push(mergeConf);

    return accu;
  }, []);

  return indexes;
};

function convertBool(ctx, key) {
  if (typeof ctx == "boolean") {
    ctx = {};
    return {
      fields: [key],
    };
  }
}

function convertUnique({ unique }) {
  if (unique) {
    return { unique: true };
  }
}

function convertType({ type }) {
  if (type) {
    return { using: type.toUpperCase() };
  }
}

function convertName({ name }) {
  if (name) {
    return { name: name.replaceAll("'", "") };
  }
}

function convertPk({ pk }, key) {
  if (pk) {
    return {
      name: `${key}_pk`,
      unique: true,
    };
  }
}

function convertKey(key) {
  if (key.includes("(") && key.includes(")")) {
    const fields = key
      .replace("(", "")
      .replace(")", "")
      .split(",")
      .map((field) => {
        return field.trim();
      });

    return {
      fields,
    };
  }
  return {
    fields: [key],
  };
}
