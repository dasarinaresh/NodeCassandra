/**
 * http://usejsdoc.org/
 */
var cassandra = require('cassandra-driver');
var cassandraClient=null;

function dbconnect(){
	
	cassandraClient= new cassandra.Client({contactPoints:['127.0.0.1']});
	cassandraClient.connect(function(err,res){
		if(err){
			res.render("Error in connecting to DB");
			console.log(err);
		}
		console.log("Connection established");
//		console.log(cassandraClient);
		console.log();
		
	});
	
}
exports.select=function(req,res){
	
	
	if(cassandraClient===null || !cassandraClient.connected ){
		console.log("Connection not initialized. Calling connect");
		dbconnect();
	}
		var query = 'SELECT * FROM naresh.student';
		cassandraClient.execute(query,function(err,result){
			if(err){
				console.log(err);
			}
			
			var row = result.first();
			console.log(row.rollno);
			console.log(row.name);
			console.log(row.dept);
			console.log(result);
			res.end(JSON.stringify(result.rows));
		});
	
};

exports.insert=function(req,res){
	
};