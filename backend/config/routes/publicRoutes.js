const publicRoutes = {
  'POST /user': 'UserController.register',
  'POST /register': 'UserController.register', // alias for POST /user
  'POST /login': 'UserController.login',
  'POST /validate': 'UserController.validate',
  'GET /getuserrecords': 'UserController.getUserRecords',
  'POST /adduserrecord': 'UserController.addUserRecord',
  'POST /getuserrecordbyfield': 'UserController.getUserRecordByField',
  'POST /addDailyActivityRecord': 'UserController.addDailyActivityRecord',
};

module.exports = publicRoutes;
