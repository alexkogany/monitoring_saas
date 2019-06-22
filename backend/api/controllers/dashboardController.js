const sequelize = require('../../config/database');


const dashboardController = () => {
    const getDailyActivityByDomain = async (req, res) =>{
        sequelize.query(`select domain_name,activity_sum from public.p_getdailyactivitybydomain(7)`, { type: sequelize.QueryTypes.QueryTypes })
        .then((domainrecords) => {
                let ret_val = domainrecords[0];
                res.status(200).json({ ret_val })// We don't need spread here, since only the results will be returned for select queries
            }
        )
        .catch(function(e) {
            console.log(e); // "oh, no!"
            res.status(500).json({ e });
        })
    }


    return {
        getDailyActivityByDomain        
    };
//p_getdailyactivitybydomain    
}

module.exports = dashboardController;