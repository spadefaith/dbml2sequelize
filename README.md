# dbml2sequelize

converts dbml to sequelize model

```
const path = require("path");
const Sequelize = require("sequelize");
const { default: SequelizeAuto } = require("sequelize-auto");
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

  const auto = new SequelizeAuto(sequelize, null, null, {
    ...opts,
    directory: path.join(__dirname, "typed-models"),
    lang: "ts",
    caseModel: "p",
    caseFile: "p",
  });

  auto.run().then(() => {
    console.log("done");
  });
});

```
