var cache = require('global-cache');
const ApplicaationDomain = require('../models/ApplicaationDomain')
const sequelize = require('../../config/database');

class loadCache {
    constructor() {
        
    }

    load(){
        sequelize.query("select * from tbl_application_domain", { type: sequelize.QueryTypes.SELECT})
        .then(app => {
            app.forEach(element => {
                cache.set(element.domain_url,element.ApplicationId);     
            });
        })
    }
}

module.exports = loadCache;