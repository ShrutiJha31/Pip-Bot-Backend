const express = require("express");
const Router = express.Router();
var pool = require('./../config/db_config')
var VerifyToken = require('../auth/VerifyToken');

const { exec } = require("child_process");
const { stderr } = require("process");

Router.post('/', VerifyToken, function (req, res) {

	pool.getConnection((err, connection) => {
		if (err) throw err


		let interval = req.body.interval*60*1000;
		var link = req.body.link;
		if (req.body.user_id != req.userId) return res.status(401).send({
			error: true,
			message: 'Authentication Error'
		});
		connection.query('INSERT INTO websites SET ?', [req.body], (err, result) => {
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


					let sql = 'Select * FROM websites WHERE user_id =? ';

					pool.query(sql, [req.userId],
						(err, result) => {

							if (err) {

								console.log(error)
							} else {


								var website_id = id;
								var start = new Date();
                                var statusCode=404
								var responseTime=0
								var command = `curl -s -o -I  -w "%{http_code}" "${link}" -o /dev/null`;
								exec(command,(error,stdout,stderr)=>{
								 statusCode=stdout;
									console.log("statusCode",statusCode);
									
								});

								var command = `curl -s -o -I  -w "%{time_total}" "${link}" -o /dev/null`;
								exec(command,(error,stdout,stderr)=>{
									responseTime=stdout;
									console.log(responseTime);
									
								});

								let sql = 'INSERT INTO logs SET website_id = ? , status = ? , response_time =?';

									pool.query(sql, [website_id, statusCode, responseTime],
										(err, result) => {

											if (err) {

												console.error(err);
											} else
												console.log(result);
										});
                               
							

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
