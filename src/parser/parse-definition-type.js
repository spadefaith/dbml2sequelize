module.exports =function parseDefinitionType(line, specsNames) {


    const spec = {};
    let openTagIndex = line.indexOf("{");
    const firstSpaceIndex = line.indexOf(" ");
  
 
    if (firstSpaceIndex < 1) {
      throw new Error("check your syntax");
    }
    const firstWord = line.substring(0, firstSpaceIndex);
  
    const isFirstWordValid = specsNames.includes(firstWord);
  
    if (!isFirstWordValid) {
      throw new Error(
        `specs name is invalid it should be one of ${specsNames.join(",")}`
      );
    }
    const specName = line.substring(firstSpaceIndex, openTagIndex).trim();
  
    spec.type = firstWord;
    spec.name = specName;
  
    return spec;
  }