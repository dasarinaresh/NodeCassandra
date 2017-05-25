/**
 * http://usejsdoc.org/
 */
var cassandra = require('cassandra-driver');
var cassandraClient=null;
var jsonResult=null;
function dbconnect(callback){

	cassandraClient= new cassandra.Client({contactPoints:['127.0.0.1']});
	cassandraClient.connect(function(err){
		if(err){
			console.log(err);
			return console.error(err);
			}
		console.log("Connection established");
		callback();
	});

}

function processSelect(req,res){
	var jsonobj = JSON.parse(req.query.flds);

//		var query = 'SELECT * FROM testkeyspace.testdb';
var query = 'SELECT';
var fieldnames = jsonobj["fieldnames"];
var spchar = ',';
for(var i=0;i<fieldnames.length;i++){

	if(i === (fieldnames.length - 1)){
		spchar='';
	}
	query = query + " " +fieldnames[i] + spchar;
}

query = query + " FROM " + jsonobj.dbname + "." + jsonobj.tablename;
console.log(query);
cassandraClient.execute(query,function(err,result){
	if(err){
		console.log(err);
	}
	// console.log(result.rows);
	jsonResult = JSON.stringify(result.rows);
	res.redirect("/result");

});
}

exports.select=function(req,res){


	if(cassandraClient===null || !cassandraClient.connected ){
		console.log("Connection not initialized. Calling connect");
		dbconnect(function(){
			processSelect(req,res);
		});

	} else {
		processSelect(req,res);
	}

// 	    var jsonobj = JSON.parse(req.query.flds);
//
// //		var query = 'SELECT * FROM testkeyspace.testdb';
// 		var query = 'SELECT';
// 		var fieldnames = jsonobj["fieldnames"];
//     var spchar = ',';
// 		for(var i=0;i<fieldnames.length;i++){
//
// 			if(i === (fieldnames.length - 1)){
// 				spchar='';
// 			}
// 			query = query + " " +fieldnames[i] + spchar;
// 		}
//
// 		query = query + " FROM " + jsonobj.dbname + "." + jsonobj.tablename;
// 		console.log(query);
// 		cassandraClient.execute(query,function(err,result){
// 			if(err){
// 				console.log(err);
// 			}
//
// 			var row = result.first();
// 			res.end(JSON.stringify(result.rows));
// 		});

};

exports.insert=function(req,res){

	if(cassandraClient===null || !cassandraClient.connected ){
		console.log("Connection not initialized. Calling connect");
		dbconnect();
	}

	var query = "INSERT INTO testkeyspace.testdb (empid,empname,empaddress) values (1189534,'Aditya Behra','Deccanpark')";
	cassandraClient.execute(query,function(err,result){

		if(err){
			console.log(err);
		}
		console.log(result);
	})

};

exports.result=function(req,res){
	console.log(jsonResult);
   res.end(jsonResult);
};
