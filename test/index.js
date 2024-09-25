const path = require("path");
const Sequelize = require("sequelize");
const parseDbml = require("../src/index");
const { default: SequelizeAuto } = require("sequelize-auto");

const opts = {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
};
const sequelize = new Sequelize("micro", "admin", "password", opts);

const parsed = parseDbml(
  sequelize,
  Sequelize.DataTypes,
  path.join(__dirname, "./sample1.dbml"),
  {
    timestamps: true,
    createdAt: "created_dt",
    updatedAt: "modified_dt",
  }
);
sequelize.sync({ force: true }).then(() => {
  console.log("done");

  const auto = new SequelizeAuto(sequelize, null, null, {
    ...opts,
    directory: path.join(__dirname, "models"),
    lang: "ts",
    caseModel: "p",
    caseFile: "p",
  });

  auto.run().then(() => {
    console.log("done");
  });
});
