module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "title cannot be null" },
        },
      },
      activity_group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "activity_group_id cannot be null" },
        },
      },
      is_active: {
        type: Sequelize.BOOLEAN,
      },
      priority: {
        type: Sequelize.STRING,
      }
    }, 
    {
      timestamps: true,
      underscored: true,
    });
  
    return Todo;
  };