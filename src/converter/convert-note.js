module.exports = function convertNote(settings) {
  const indexConf = settings.find((setting) => setting.type == "Note");

  const note = indexConf && indexConf?.content
    ? indexConf.content.replaceAll("'", "")
    : "";

  return note;
};
