const fs = require("fs");
const grouping = require("./utils/grouping");
const separating = require("./utils/separating");

const parseTableContent = require("./parser/parse-table-content");
const parseDefinition = require("./parser/parse-definition");
const parseDefinitionType = require("./parser/parse-definition-type");
const parseIndexesContent = require("./parser/parse-indexes-content");
const convertAttributes = require("./converter/convert-attributes");
const convertIndexes = require("./converter/convert-indexes");
const convertNote = require("./converter/convert-note");
module.exports = (sequelize, DataTypes, srcPath, opts) => {
  const tableDefSettings = ["indexes", "Note"];
  const indexSettingsList = ["type", "name", "unique", "pk", "note"];
  const tableSettingsList = [
    "note",
    "primary key",
    "pk",
    "null",
    "not null",
    "unique",
    "default",
    "increment",
    "ref",
  ];
  const specsNames = [
    "Table",
    "Project",
    "indexes",
    "enum",
    "TableGroup",
    "Note",
  ];

  const read = fs.readFileSync(srcPath, "utf8");
  const definitions = grouping(read);

  const separate = separating(definitions, tableDefSettings);

  const json = separate.map((element) => {
    const { table, tableSettings } = element;
    const tableDef = parseDefinition(table, ({ first, content }) => {
      const { name, type } = parseDefinitionType(first, specsNames);
      let comment = "";

      const attributes = content.reduce((accu, line) => {
        const parsedContent = parseTableContent(line, tableSettingsList);

        if (parsedContent.comment) {
          comment = parsedContent.comment;
        } else {
          accu.push(parsedContent);
        }

        return accu;
      }, []);

      return { name, type, attributes, comment };
    });
    const settings = tableSettings.reduce((accu, item) => {
      const defs = parseDefinition(item, ({ first, content }) => {
        const { name, type } = parseDefinitionType(first, specsNames);

        if (type == "indexes") {
          const attributes = content.map((line) =>
            parseIndexesContent(line, indexSettingsList)
          );
          return { type, attributes };
        } else if (type == "Note") {
          return { type, content: content.join("\n") };
        }

        return null;
      });
      if (defs) {
        accu.push(defs);
      }
      return accu;
    }, []);

    const indexes = convertIndexes(settings);
    const comment = tableDef.comment || convertNote(settings);
    const attrs = convertAttributes(tableDef.attributes, sequelize, DataTypes);

    return sequelize.define(tableDef.name, attrs, {
      ...opts,
      indexes,
      comment,
    });
  });
  return json;
};
