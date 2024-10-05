module.exports = function parseDefinition(tableDef, callback) {
  const splitted = tableDef.split("\n");
  const first = splitted[0];
  const defs = splitted.slice(1, splitted.length - 1);

  const content = defs.reduce((accu, line) => {
    line = line.trim();

    line && accu.push(line);

    return accu;
  }, []);

  return callback({
    content,
    first,
  });
};
