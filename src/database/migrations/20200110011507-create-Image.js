'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Image', {
      ImageId: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      ProdutoId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {model: 'Produto', key: 'ProdutoId'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      }, 
      Name: {
        allowNull: false,
        type: DataTypes.STRING,
      }, 
      Size: {
        allowNull: false,
        type: DataTypes.STRING,
      }, 
      Key: {
        allowNull: false,
        type: DataTypes.STRING,
      }, 
      Url: {
        allowNull: false,
        type: DataTypes.STRING,
      }, 
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Image');
  }
  
};
