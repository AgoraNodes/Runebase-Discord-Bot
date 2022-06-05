// LEGENDE
// _i = insufficient balance
// _s = Success
// _f = fail
//
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface
      .changeColumn('activity', 'type', {
        type: DataTypes.ENUM(
          'login_s',
          'login_f',
          'logout_s',
          'ignoreme_s',
          'ignoreme_f',
          'help_s',
          'help_f',
          'link_s',
          'link_f',
          'account_s',
          'account_f',
        ),
      });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface
      .changeColumn('activity', 'type', {
        type: DataTypes.ENUM(
          'login_s',
          'login_f',
          'logout_s',
          'ignoreme_s',
          'ignoreme_f',
          'help_s',
          'help_f',
        ),
      });
  },
};
