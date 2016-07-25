//Load Express Framework
var express = require('express');

//Load Mustache Template Engine
var mustachex = require('mustachex');

//Load Oracle
var oracledb = require('oracledb');

//Call express
var app = express();

var bodyParser = require('body-parser');


var user, password, port;
// argument in form of <username> <password> <port>
process.argv.forEach(function (val, index, array) {
	if(index == 2) {
		user = val
	}
	if(index == 3) {
		password = val
	}
	if(index == 4) {
		port = val
	}

});

//Set Global App Settings
app.engine('html', mustachex.express);
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


//get and post for querying MAJESTIC
app.get('/domain/no_idx', function(req, res) {
	res.render('domain.html', {
		sub_url:'no_idx'
	});
});


app.post('/search/no_idx', function(req, res) {
	var domain = req.body.domain;
	var sql_statement =  "SELECT Domain,GlobalRank FROM MAJESTIC where Domain='" + domain + "'";
	oracledb.getConnection({
		user          : user,
		password      : password,
		connectString : "csoracle.utdallas.edu/student.csoracle.utdallas.edu"
	},
	function(err, connection) {
		if (err) {
			console.error(err); return;
		}
		connection.execute(
			sql_statement,
			function(err, result) {
				if (err) {
					console.error(err);
					res.render('error', {
						message: err.message,
						sub_url:'no_idx'
					});
				}
				else {
					if (result.rows.length >0) {
						res.render('result_domain.html', {
							globalrank: result.rows[0][1],
							Domain: result.rows[0][0],
							sub_url : 'no_idx'
						});
					}
					else {
						res.render('error', {
							message: "No Domain with such name in MAJESTIC",
							sub_url:'no_idx'
						});
					}
				}
			});
		});
	});

	app.get('/domain/idx1', function(req, res) {
		res.render('domain.html', {
			sub_url: 'idx1'
		});
	});

	app.post('/search/idx1', function(req, res) {
		var domain = req.body.domain;
		var sql_statement =  "SELECT Domain,GlobalRank FROM MAJESTIC_INDEX1 where Domain='" + domain + "'";
		oracledb.getConnection({
			user          : user,
			password      : password,
			connectString : "csoracle.utdallas.edu/student.csoracle.utdallas.edu"
		},
		function(err, connection){
			if (err) {
				console.error(err); return;
			}
			connection.execute(
				sql_statement,
				function(err, result){
					if (err) {
						console.error(err);
						res.render('error',{
							message: err.message,
							sub_url:'idx1'
						});
					}
					else {
						if (result.rows.length >0) {
							res.render('result_domain.html', {
								globalrank: result.rows[0][1],
								Domain: result.rows[0][0],
								sub_url : 'idx1'
							});
						}
						else {
							res.render('error',{
								message: "No Domain with such name in MAJESTIC_INDEX1",
								sub_url:'idx1'
							});
						}
					}
				}
			);
		});
	});
	//get and post for querying MAJESTIC_INDEX2

	app.get('/domain/idx2', function(req, res) {
		res.render('domain.html', {
			sub_url:'idx2'
		});
	});

	app.post('/search/idx2', function(req, res) {

		var domain = req.body.domain;
		var sql_statement =  "SELECT Domain,GlobalRank FROM MAJESTIC_INDEX2 where Domain='" + domain + "'";
		oracledb.getConnection(
			{  user          : user,
				password      : password,
				connectString : "csoracle.utdallas.edu/student.csoracle.utdallas.edu"
			},
			function(err, connection)
			{
				if (err) {
					console.error(err); return;
				}
				connection.execute(
					sql_statement,
					function(err, result)
					{
						if (err) {
							console.error(err);
							res.render('error',
							{
								message: err.message,
								sub_url:'idx2'
							}
						);

					}
					else {
						if (result.rows.length >0) {
							res.render('result_domain.html',
							{
								globalrank: result.rows[0][1],
								Domain: result.rows[0][0],
								sub_url:'idx2'
							}
						);
					}
					else {
						res.render('error',
						{
							message: "No Domain with such name in MAJESTIC_INDEX2",
							sub_url:'idx2'

						}
					);
				}
			}
		}
	);
}
);
});

//get and post for querying MAJESTIC_INDEX3

app.get('/domain/idx3', function(req, res) {
	res.render('domain.html', {
		sub_url:'idx3'
	});
});

app.post('/search/idx3', function(req, res) {

	var domain = req.body.domain;
	var sql_statement =  "SELECT Domain,GlobalRank FROM MAJESTIC_INDEX3 where Domain='" + domain + "'";
	oracledb.getConnection(
		{  user          : user,
			password      : password,
			connectString : "csoracle.utdallas.edu/student.csoracle.utdallas.edu"
		},
		function(err, connection)
		{
			if (err) {
				console.error(err); return;
			}
			connection.execute(
				sql_statement,
				function(err, result)
				{
					if (err) {
						console.error(err);
						res.render('error',
						{
							message: err.message,
							sub_url:'idx3'
						}
					);

				}
				else {
					if (result.rows.length >0) {
						res.render('result_domain.html',
						{
							globalrank: result.rows[0][1],
							Domain: result.rows[0][0],
							sub_url: 'idx3'
						}
					);
				}
				else {
					res.render('error',
					{
						message: "No Domain with such name in MAJESTIC_INDEX3",
						sub_url:'idx3'

					}
				);
			}
		}
	}
);
}
);
});

app.get('/tld/no_idx', function(req, res) {
	res.render('tld.html', {
		sub_url:'no_idx'
	});
});

app.post('/search_tld/no_idx', function(req, res) {
	var tld = req.body.tld;
	var i;
	var sql_statement =  "SELECT globalrank , Domain FROM majestic WHERE TLD = '" + tld + "'";
	oracledb.getConnection({
		user          : user,
		password      : password,
		connectString : "csoracle.utdallas.edu/student.csoracle.utdallas.edu"
	},
	function(err, connection){
		if (err) {
			console.error(err); return;
		}
		connection.execute(
			sql_statement,
			function(err, result){
				if (err) {
					console.error(err);
					res.render('error_tld',{
						message: err.message,
						sub_url:'no_idx'
					});
				}
				else {
					if (result.rows.length >0) {
						res.render('result_tld',
						{
							domain_no_idx:result.rows,
							sub_url:'no_idx'
						}
					);
				}
				else {
					res.render('error_tld',
					{
						message: "Invalid Entry for TLD",
						sub_url:'no_idx'

					}
				);
			}
		}
	}
);
}
);
});

app.get('/tld/idx1', function(req, res) {
	res.render('tld.html', {
		sub_url:'idx1'
	});
});

app.post('/search_tld/idx1', function(req, res) {

	var tld = req.body.tld;
	var i;
	var sql_statement =  "SELECT globalrank , Domain FROM majestic WHERE TLD = '" + tld + "'";
	oracledb.getConnection(
		{  user          : user,
			password      : password,
			connectString : "csoracle.utdallas.edu/student.csoracle.utdallas.edu"
		},
		function(err, connection)
		{
			if (err) {
				console.error(err); return;
			}
			connection.execute(
				sql_statement,
				function(err, result)
				{
					if (err) {
						console.error(err);
						res.render('error_tld',
						{
							message: err.message,
							sub_url:'idx1'
						}
					);

				}
				else {
					if (result.rows.length >0) {
						res.render('result_tld',
						{
							domain_no_idx:result.rows,
							sub_url:'idx1'
						}
					);
				}
				else {
					res.render('error_tld',
					{
						message: "Invalid Entry for TLD",
						sub_url:'idx1'

					}
				);
			}
		}
	}
);
}
);
});

app.get('/tld/idx2', function(req, res) {
	res.render('tld.html', {
		sub_url:'idx2'
	});
});

app.post('/search_tld/idx2', function(req, res) {

	var tld = req.body.tld;
	var i;
	var sql_statement =  "SELECT globalrank , Domain FROM majestic WHERE TLD = '" + tld + "'";
	oracledb.getConnection(
		{  user          : user,
			password      : password,
			connectString : "csoracle.utdallas.edu/student.csoracle.utdallas.edu"
		},
		function(err, connection)
		{
			if (err) {
				console.error(err); return;
			}
			connection.execute(
				sql_statement,
				function(err, result)
				{
					if (err) {
						console.error(err);
						res.render('error_tld',
						{
							message: err.message,
							sub_url:'idx2'
						}
					);

				}
				else {
					if (result.rows.length >0) {
						res.render('result_tld',
						{
							domain_no_idx:result.rows,
							sub_url:'idx2'
						}
					);
				}
				else {
					res.render('error_tld',
					{
						message: "Invalid Entry for TLD",
						sub_url:'idx2'

					}
				);
			}
		}
	}
);
}
);
});

app.get('/tld/idx3', function(req, res) {
	res.render('tld.html', {
		sub_url:'idx3'
	});
});

app.post('/search_tld/idx3', function(req, res) {

	var tld = req.body.tld;
	var i;
	var sql_statement =  "SELECT globalrank , Domain FROM majestic WHERE TLD = '" + tld + "'";
	oracledb.getConnection(
		{  user          : user,
			password      : password,
			connectString : "csoracle.utdallas.edu/student.csoracle.utdallas.edu"
		},
		function(err, connection)
		{
			if (err) {
				console.error(err); return;
			}
			connection.execute(
				sql_statement,
				function(err, result)
				{
					if (err) {
						console.error(err);
						res.render('error_tld',
						{
							message: err.message,
							sub_url:'no_idx'
						}
					);

				}
				else {
					if (result.rows.length >0) {
						res.render('result_tld',
						{
							domain_no_idx:result.rows,
							sub_url: 'idx3'
						}
					);
				}
				else {
					res.render('error_tld',
					{
						message: "Invalid Entry for TLD",
						sub_url:'idx3'

					}
				);
			}
		}
	}
);
}
);
});

//Create Server
var port = Number(process.env.PORT || port || 9091);
app.listen(port, function() {
	console.log("Listening on " + port);
});
