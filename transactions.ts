import sequelize from "../config/database";

async function performTransaction() {
  const t = await sequelize.transaction();
  try {
    // Perform operations here
    await t.commit();
  } catch (error) {
    await t.rollback();
    throw error;
  }
}
