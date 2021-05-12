const db = require("../../models");
const User = db.users;
const UserLoginLoger = db.user_login_logger;
const Op = db.Sequelize.Op;

const config = require("../../config/auth.config");
const ERROR_MESSAGE = 'Something went wrong.'

exports.showLoginLogger = async (req, res) => {
	try{
     
        let user = req.user
        if (!user) {
            return res.status(401).send({ message: "Something went wrong." });
        }

        let userRole = user.role

        let startDate = req.query.startDate;
        let endDate = req.query.endDate;

        
        if(!startDate || !endDate){
            return res.status(401).send({ message: "Please select start and end date." });
        }

        let dbrecords = [];
        let query = "SELECT DISTINCT(t.login_date), (SELECT COUNT(*) FROM user_login_logger WHERE login_date = t.login_date) as user_count, (SELECT COUNT(*) FROM user_login_logger WHERE login_device='PC' and login_date = t.login_date) as pc_count, (SELECT COUNT(*) FROM user_login_logger WHERE login_device='android' and login_date = t.login_date) as android_count, (SELECT COUNT(*) FROM user_login_logger WHERE login_device='ios' and login_date = t.login_date) as ios_count FROM (SELECT DISTINCT login_date FROM user_login_logger) t WHERE login_date BETWEEN '"+startDate+"' AND '"+endDate+"'";
        await db.sequelize.query(query,{ raw: true })
        .then(records => {
            dbrecords = records
        })

        return res.status(201).send({
            message: "Logger data found successfully!",
            data:dbrecords[0],
        });	

	}catch(err){
		return res.status(500).send({ message: err.message || ERROR_MESSAGE });
	}
}