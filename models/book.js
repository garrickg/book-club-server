export default (sequelize, DataTypes) => {
  const Book = sequelize.define('book', {
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    image: DataTypes.STRING,
    requested: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Book.associate = (models) => {
    Book.belongsTo(models.User, {
      foreignKey: {
        name: 'ownerId',
        field: 'owner_id',
      },
    });
    Book.belongsToMany(models.User, {
      through: models.Request,
      foreignKey: {
        name: 'bookId',
        field: 'book_id',
      },
    });
  };

  return Book;
};

