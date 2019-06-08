const publicRoutes = {
  'POST /user': 'UserController.register',
  'POST /register': 'UserController.register', // alias for POST /user
  'POST /login': 'UserController.login',
  'POST /validate': 'UserController.validate',
  'POST /adduserrecord': 'UserController.addUserRecord',
  'POST /addDailyActivityRecord': 'dailyActivityRecordController.addDailyActivityRecord',
  'POST /getDailyActivityRecords': 'dailyActivityRecordController.getDailyActivityRecords',
  'POST /getDailyActivityRecordsByField': 'dailyActivityRecordController.getDailyActivityRecordsByField',
  'POST /addperformanceRecord': 'performanceController.addperformanceRecord',
  'POST /getperformanceRecords': 'performanceController.getperformanceRecords',
  'POST /getperformanceRecordsByField': 'performanceController.getperformanceRecordsByField'

};

module.exports = publicRoutes;
