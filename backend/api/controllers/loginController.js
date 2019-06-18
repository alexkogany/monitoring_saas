/* eslint-disable no-console */
const OrganizationAdminUser = require('../models/OrganizationAdminUser');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');
const sequelize = require('../../config/database');



const loginController = () => {
  const login = async (req, res) => {
                    try {

                        let username = req.body.username;
                        let password = req.body.password;
                        //let pp = bcryptService().password(password);

                        sequelize.query(`select * from public.tbl_organization_admin_user WHERE "username"='${username}'`, { type: sequelize.QueryTypes.SELECT})
                        .then(row_result=>{
                            if(bcryptService().comparePassword(password, row_result[0].password)){
                              const token = authService().issue({ id: row_result[0].admin_user_id });
                              return res.status(200).json({ token , email : username });
                                                     
                            }
                            else{
                              return res.status(401).json({ username, password });
                            }
                        });

                    } catch (err) {
                      console.log(err);
                    // log.send2server(`{"error":"${err.message}"}`);
                      return res.status(500).json({ msg: 'Internal server error' });
                    }
            };

  return {
    login,
  };
};

module.exports = loginController;
