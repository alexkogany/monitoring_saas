const tokenRoutes = {
    'GET /getAdminAuthURL': 'tokenController.getGoogleAuthURL',
    'GET /back': 'tokenController.receiveGoogleToken',
    'GET /back/:orgid': 'tokenController.receiveGoogleToken',    
    'POST /back': 'tokenController.receiveGoogleToken',
    'POST /back/:orgid': 'tokenController.receiveGoogleToken',
  };
  
 module.exports = tokenRoutes;