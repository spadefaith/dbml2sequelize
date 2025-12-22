# dbml2sequelize

Converts [DBML](https://www.dbml.org/) files to Sequelize models.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Development Guide](#development-guide)
- [Contributing](#contributing)
- [License](#license)

## Overview

`dbml2sequelize` is a Node.js library that parses `.dbml` files and automatically generates Sequelize models, allowing you to easily transition your database schema definitions into Sequelize-based projects.

## Installation

```bash
npm install dbml2sequelize
```

## Usage

Here's an example of how to use `dbml2sequelize` to convert a `.dbml` file into Sequelize models:

```js
const path = require("path");
const Sequelize = require("sequelize");
const parseDbml = require("dbml2sequelize");

const opts = {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
};
const sequelize = new Sequelize("micro", "admin", "password", opts);

parseDbml(sequelize, Sequelize.DataTypes, path.join(__dirname, "./db.dbml"), {
  timestamps: true,
  createdAt: "created_dt",
  updatedAt: "modified_dt",
});

sequelize.sync({ force: true }).then(() => {
  console.log("done");
});
```

## API

### `parseDbml(sequelize, DataTypes, dbmlPath, options)`

- **sequelize**: Sequelize instance.
- **DataTypes**: Sequelize DataTypes object.
- **dbmlPath**: Path to the `.dbml` file.
- **options**: (Optional) Additional model options (e.g., timestamps, createdAt, updatedAt).

Returns: Array of Sequelize models defined from the DBML file.

#### Example

See [Usage](#usage) above.

## Development Guide

The main source code is in the `src/` directory. The core logic is in `src/index.js`.

### Main Flow

1. **Reading the DBML file**:  
   The file is read and split into definitions using `grouping.js`.

2. **Separating table settings**:  
   `separating.js` extracts table-level settings like indexes and notes.

3. **Parsing definitions**:  
   - `parse-definition.js` and `parse-definition-type.js` extract table, enum, and index structures.
   - `parse-table-content.js` and `parse-indexes-content.js` handle fields and index attributes.

4. **Converting to Sequelize Models**:  
   - `convert-attributes.js` maps DBML field types to Sequelize DataTypes.
   - `convert-indexes.js` and `convert-note.js` map DBML indexes and notes to Sequelize options.

5. **Model Generation**:  
   Each table definition is used to create a Sequelize model via `sequelize.define`.

### Key Files and Responsibilities

- `src/index.js`: Main entry point; orchestrates parsing and model creation.
- `src/utils/grouping.js`: Groups DBML definitions.
- `src/utils/separating.js`: Separates table-level settings.
- `src/parser/parse-definition.js`, `src/parser/parse-definition-type.js`: Parse and identify DBML sections.
- `src/converter/convert-attributes.js`: Converts DBML fields to Sequelize attributes.
- `src/converter/convert-indexes.js`: Converts DBML indexes to Sequelize indexes.
- `src/converter/convert-note.js`: Handles table/field notes.

### Extending or Modifying

- To add support for new DBML features, extend the relevant parser or converter modules.
- To adjust Sequelize options, modify how the options object is constructed in `src/index.js`.

### Error Handling

- Syntax errors or unrecognized DBML specs will throw errors with details in the parser modules.
- Ensure your `.dbml` files conform to DBML syntax for best results.

## Contributing

Pull requests and issue reports are welcome! Please ensure code follows the style and structure of the project.

## License

MIT

---

_This documentation is generated based on the code and structure found in the repo. For more details, see the source code or open an issue._
