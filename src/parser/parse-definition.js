module.exports = function parseDefinition(tableDef, callback) {
  const splitted = tableDef.split("\n");
  const first = splitted[0];
  const defs = splitted.slice(1, splitted.length - 1);

  let isOpen = false;
  const content = defs.reduce((accu, line) => {
    line = line.trim();
    const isCodeBlock = line.includes("```");
    if (!isCodeBlock) {
      isOpen = !isOpen;
    }

    if (line && isOpen && !isCodeBlock) {
      accu.push(line);
    }

    return accu;
  }, []);

  return callback({
    content,
    first,
  });
};
