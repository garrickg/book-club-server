import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'You must enter a username',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid email',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'You must enter a password',
          },
        },
      },
      city: DataTypes.STRING,
      state: DataTypes.STRING,
    },
    {
      hooks: {
        afterValidate: async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 12);
          // eslint-disable-next-line no-param-reassign
          user.password = hashedPassword;
        },
      },
    },
  );

  User.associate = (models) => {
    User.belongsToMany(models.Book, {
      through: models.Request,
      foreignKey: {
        name: 'requesterId',
        field: 'requester_id',
      },
    });
  };

  return User;
};
