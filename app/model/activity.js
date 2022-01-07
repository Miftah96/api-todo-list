module.exports = (sequelize, Sequelize) => {
  const Activity = sequelize.define("activity", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "title cannot be null" },
      },
    },
    email: {
      type: Sequelize.STRING,
    }
  }, 
  {
    timestamps: true,
    underscored: true,
  });

  return Activity;
};