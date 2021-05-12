'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
    */
      await queryInterface.bulkInsert('users', [{
        username:'admin',
        password: '$2a$08$o.mQynZmyJvBtK9tTlLpl.NHZBa4/yQ9YN4hy59n0uDGRWShsc2kO', //bcrypt.hashSync(req.body.password || 123456, 8)
        first_name: 'Admin',
        email: 'admin@example.com',
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('users', null, {});
     
  }
};
