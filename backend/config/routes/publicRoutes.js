const publicRoutes = {
  'POST /user': 'UserController.register',
  'POST /register': 'UserController.register', // alias for POST /user
  'POST /login': 'UserController.login',
  'POST /validate': 'UserController.validate',
  'GET /getuserrecords': 'UserController.getUserRecords',
  'POST /adduserrecord': 'UserController.addUserRecord',
  'POST /getuserrecordbyfield': 'UserController.getUserRecordByField',
  'POST /addDailyActivityRecord': 'dailyActivityRecordController.addDailyActivityRecord',
  'POST /getDailyActivityRecords': 'dailyActivityRecordController.getDailyActivityRecords',
  'POST /getDailyActivityRecordsByField': 'dailyActivityRecordController.getDailyActivityRecordsByField'
};

module.exports = publicRoutes;
