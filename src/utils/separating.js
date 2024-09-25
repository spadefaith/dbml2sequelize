module.exports = function separate(definitions, tableSettings = []) {
    return definitions.map((defs) => {
      let strDefs = defs.join("\n");
  
      let tableSettingsDef = [];
  
      tableSettingsDef = tableSettings.reduce((accu, ts) => {
        const firstTableSettingIndex = strDefs.indexOf(`${ts} {`);
        const isFirstTableSetting = firstTableSettingIndex >= 0;
  
        if (isFirstTableSetting) {
          const ft = strDefs.substring(firstTableSettingIndex);
          const closeTag = ft.indexOf("}");
          const clip = ft.substring(0, closeTag + 1);
          accu.push(clip);
  
          /**
           * remove the clip from the string
           */
          strDefs = strDefs.replace(clip, "");
        }
  
        return accu;
      }, []);
  
      return {
        table: strDefs,
        tableSettings: tableSettingsDef,
      };
    });
  }
  