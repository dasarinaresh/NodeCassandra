/**
 * http://usejsdoc.org/
 */
var cassandra = require('cassandra-driver');
var cassandraClient;

exports.dbconnect = function(){
	console.log("dbonnect");
	cassandraClient= new cassandra.Client({contactPoints:['http://127.0.0.1']});
	console.log(cassandraClient);
	
};