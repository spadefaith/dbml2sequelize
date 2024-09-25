module.exports = function convertNote(settings) {
  const indexConf = settings.find((setting) => setting.type == "Note");

  return indexConf && indexConf?.content
    ? indexConf.content.replaceAll("'", "")
    : "";
};
