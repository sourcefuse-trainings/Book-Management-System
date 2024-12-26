import sequelize from "./config/database";

sequelize.sync({ force: true }).then(() => {
  console.log("Database synchronized");
});
