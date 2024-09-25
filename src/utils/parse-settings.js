/*

    "name" - 'asdasdasd'
    "note" - 'asdasdasd'
    "default" - 'asdasdasd'
    
    "primary key" - null
    "pk" - null
    "null" - null
    "not null" - null
    "unique" - null
    "increment" - null
    
    "ref" - > table.column
    "type" - hash | btree | gist | spgist | gin | brin

*/

module.exports = function parseFieldSettings(settings, settingList = []) {
  settings = settings.replace("[", "").replace("]", "").trim();

  const splitted = settings.split("");

  let isOpenString = false;

  /**
   * replace temp "," in text value;
   */

  let patchText = "";
  for (let i = 0; i < splitted.length; i++) {
    const v = splitted[i];
    const textIdentifier = "'";

    v == textIdentifier && (isOpenString = !isOpenString);

    if (isOpenString) {
      if (v == ",") {
        patchText += "(comma)";
      } else {
        patchText += v;
      }
    }

    if (!isOpenString) {
      patchText += v;
    }
  }

  const commaSeparated = patchText.split(",");

  const grouped = commaSeparated.reduce((accu, iter) => {
    iter = iter.trim();
    const isDef = iter.indexOf(":") > -1;
    if (isDef) {
      let [d, v] = iter.split(":");
      d = d.trim();
      v = v.trim();

      settingList.includes(d) && (accu[d] = v.replace("(comma)", ","));
    } else {
      settingList.includes(iter) && (accu[iter] = true);
    }

    return accu;
  }, {});

  return { settings: grouped };
};
