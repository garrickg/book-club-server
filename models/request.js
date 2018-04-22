export default (sequelize, DataTypes) => {
  const Request = sequelize.define('request', {
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  return Request;
};

