const fs = require('fs')
const path=require('path')
const {promisify}= require('util')

module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
    ImageId: {
        allowNull: false,
        field: "ImageId",
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    ProdutoId: {
      allowNull: false,
      field: "ProdutoId",
      type: DataTypes.STRING,
    },
    Name: {
        allowNull: false,
        field: "Name",
        type: DataTypes.STRING,
      },
    Size: {
        allowNull: false,
        field: "Size",
        type: DataTypes.STRING,
    },
    Key: {
        allowNull: false,
        field: "Key",
        type: DataTypes.STRING,
    },
    Url: {
        allowNull: false,
        field: "Url",
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
    },{
      freezeTableName: true},
    );
    Image.beforeCreate((image, options) => {
        if(!this.url){
         return image.Url =`${process.env.API_URL}/files/${image.Key}`
        }
      })
    Image.beforeDestroy((image, options) => {
        console.log(image.Key)
        return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', image.Key))
          
    })
   return Image; 
  }