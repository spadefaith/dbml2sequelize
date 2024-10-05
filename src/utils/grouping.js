module.exports = function grouping(read) {
  const splitted = read.split("\n");

  const definitions = [];
  let defStr = [];
  let openTagCount = 0;
  for (let i = 0; i < splitted.length; i++) {
    const line = splitted[i].trim();

    if (!line) {
      continue;
    }

    let openTagIndex = line.indexOf("{");
    let closeTagIndex = line.indexOf("}");

    let isOpenTag = openTagIndex >= 0;
    let isCloseTag = closeTagIndex >= 0;

    isOpenTag && (openTagCount += 1);
    isCloseTag && (openTagCount -= 1);

    if (openTagCount) {
      defStr.push(line);
    }

    if (isCloseTag && !openTagCount) {
      defStr.push("}");
      definitions.push(defStr);

      defStr = [];
    }
  }

  /**
   * skip Project definitions
   */
  const d = definitions.filter((def) => {
    return def[0] && !def[0].includes("Project ");
  });

  return d;
};
