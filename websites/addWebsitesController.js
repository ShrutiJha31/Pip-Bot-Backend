const express = require("express");
const Router = express.Router();
var pool = require('../config/db_config')
var VerifyToken = require('../auth/VerifyToken');

const { exec } = require("child_process");
const { stderr } = require("process");

Router.post('/', VerifyToken, function (req, res) {

	pool.getConnection((err, connection) => {
		if (err) throw err


		let interval = req.body.intervals*60*1000;
		var link = req.body.link;

		connection.query('INSERT INTO websites (website_name, tags, link, intervals, user_id) VALUES (?, ?, ?, ?, ?)',[req.body.website_name, req.body.tags, req.body.link, interval, req.userId], (err, result) => {
			connection.release()
			if (!err) {
				res.send(result)


				console.log(result);
				let id = 0;
				connection.query('SELECT COUNT(*) FROM websites', (err, result) => {
					id = result[0]['COUNT(*)'];
					console.log(id);
				});
				console.log("Inserted Successfully!" + interval);

				this.interval = setInterval(() => {


					


								
								var command = `curl -sL -Is -A "Googlebot/2.1 (+http://www.google.com/bot.html)" -w ";%{http_code};%{time_total}" "${link}" `
 
								child = exec(command, function(error, stdout, stderr){
								 
								   if(stderr){
									console.log(`stderr:${stderr}`)
								   } 
								   else{
								  
									const response = stdout.split(";")
									const reverse = response.reverse()
									let sql1 = 'INSERT INTO logs (user_id,website_id,status,response_time) VALUES (?,?,?,?)'
									  pool.query(sql1,[req.userId,id,reverse[1],reverse[0]],(err,result)=>{
										 if(err)
										 console.log(err)
										 else{
											
												console.log(link),
												console.log(reverse[1]),
												console.log( reverse[0]),
												console.log(interval)
											console.log("Checked this Website"+id);
											
										 }
									  })
							  
							}
                                 




							
							

							}


						
					)
				}, interval);

			} else {
				console.log(err)
			}


		})
	})
});


module.exports = Router;
