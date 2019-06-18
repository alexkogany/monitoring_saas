const bcrypt = require('bcryptjs'); //require('bcrypt-nodejs');

const bcryptService = () => {
  const password = (password) => {
    //const salt = bcrypt.genSaltSync();
    //const hash = bcrypt.hashSync(user.password, salt);

    return bcrypt.hashSync(password, "$2a$10$xzz7uLp.Xsr1Q3z6.fZTe.");
  };

  const comparePassword = (pw, hash) => (
    //bcrypt.compareSync(pw, hash)
     bcrypt.compareSync(pw, hash)
  );

  return {
    password,
    comparePassword,
  };
};

module.exports = bcryptService;
