const express = require("express");
const Router = express.Router();
var pool = require('./../config/db_config')
var VerifyToken = require('../auth/VerifyToken');

const https = require('https');
Router.post('/', VerifyToken, function (req, res) {

	pool.getConnection((err, connection) => {
		if (err) throw err


		let interval = req.body.interval;
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
								https.get(`${link}`, function (res, err) {
									var responseTime = new Date() - start;
									var statusCode = 404;
									if (!err) {
										const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';

										statusCode = res.statusCode;


										console.log("StatusChecked" + website_id + " " + statusCode);
									} else {
										statusCode = 404;
									}

									let sql = 'INSERT INTO logs SET website_id = ? , status = ? , response_time =?';

									pool.query(sql, [website_id, statusCode, responseTime],
										(err, result) => {

											if (err) {

												console.error(err);
											} else
												console.log(result);
										});

								}).on('error', function (e) {
									console.error(e);

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