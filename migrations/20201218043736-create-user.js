'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
          field: 'id',
          comment: 'ID of the user',
        },
        username: {
          type: Sequelize.STRING(150),
          allowNull: false,
          unique: true,
          field: 'username',
          comment: 'Username of the user',
        },
        password: {
          type: Sequelize.STRING(150),
          allowNull: false,
          field: 'password',
          comment: 'Password of the user',
        },
        firstName: {
          type: Sequelize.STRING(50),
          allowNull: true,
          field: 'first_name',
          comment: 'First name of the user',
        },
        lastName: {
          type: Sequelize.STRING(50),
          allowNull: true,
          field: 'last_name',
          comment: 'Last name of the user',
        },
        email: {
          type: Sequelize.STRING(255),
          allowNull: true,
          field: 'email',
          comment: 'Email of the user',
        },
        phone_country_code: {
          type: Sequelize.STRING(20),
          allowNull: true,
          field: 'phone_country_code',
        },
        phone: {
          type: Sequelize.STRING(100),
          allowNull: true,
          field: 'phone',
        },
        role: {
          type: Sequelize.BOOLEAN(1),
          field: 'role',
          default: 2,
          comment: "1=Admin, 2=User"
        },
        status: {
          type: Sequelize.BOOLEAN(1),
          field: 'status',
          default: 1
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          field: 'createdAt',
          comment: "Date and time of the user's profile creation date",
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          field: 'updatedAt',
        },
      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};