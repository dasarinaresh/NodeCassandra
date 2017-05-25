/**
 * http://usejsdoc.org/
 */
var cassandra = require('cassandra-driver');
var cassandraClient=null;

function dbconnect(){
	
	cassandraClient= new cassandra.Client({contactPoints:['127.0.0.1']});
	cassandraClient.connect(function(err){
		if(err){
			console.log(err);
			return console.error(err);
			}
		console.log("Connection established");
	});
	
}
exports.select=function(req,res){
	
	
	if(cassandraClient===null || !cassandraClient.connected ){
		console.log("Connection not initialized. Calling connect");
//		dbconnect();
//		console.log(status);
	}
	    console.log(req.query.flds);
	    console.log(typeof req.query.flds);
	    var jsontext = JSON.parse("{ \"dbname\":\"Select a Database\",\"tablename\":\"Select a Table\",\"fieldnames\":[\"empname\"]}");
	    console.log(jsontext);
	    console.log(typeof jsontext);
//		var query = 'SELECT * FROM testkeyspace.testdb';
		var query = 'SELECT';
		var fieldnames = jsontext["fieldnames"];
		console.log(fieldnames);
		console.log(jsontext.fieldnames);
		
		for(var i in fieldnames){
			query = query + " " +fieldnames[i];
		}
		
		
/*		for(var i=0;i<.length;i++){
			query = query + " " +jsontext.fieldnames[i];
		}*/
		query = query + " FROM " + jsontext.dbname + "." + jsontext.tablename;
		console.log(query);
/*		cassandraClient.execute(query,function(err,result){
			if(err){
				console.log(err);
			}
			
			var row = result.first();
			console.log(row.rollno);
			console.log(row.name);
			console.log(row.dept);
			console.log(result);
			res.end(JSON.stringify(result.rows));
		});*/
	
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