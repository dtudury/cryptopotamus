/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 4/30/13
 * Time: 11:03 AM
 * To change this template use File | Settings | File Templates.
 */

var http = require("http");
var path = require("path");
var url = require("url");
var dirWalker = require("./lib/dirWalker");


var responseWriters = {};
dirWalker.forAllFiles("build", processFile, startup);


function startup() {
	console.log("startup")
	responseWriters["/"] = responseWriters["/index.html"];
	http.createServer(function(request, response) {
		var data = "";
		request.on("data", function(dataChunk) {
			data += dataChunk;
			if(data.length > 1e4) {
				data = "";
				response.writeHead(413, {"Content-Type": "text/plain"});
				request.connection.destroy();
			}
		});
		request.on("end", function() {
			var parsedUrl = url.parse(request.url);
			console.log(parsedUrl.pathname);
			var responseWriter = responseWriters[parsedUrl.pathname];
			if(responseWriter) {
				responseWriter(response);
			} else {
				response.writeHead(404);
				response.end();
			}
		});
	}).listen(8000);
}

function processFile(relativePath, data) {
	var extension = path.extname(relativePath);
	var fullPath = path.join("/", relativePath);
	switch(extension) {
		case ".js":
			console.log("js", fullPath);
			responseWriters[fullPath] = getCacheResponseWriter("application/x-javascript", data);
			break;
		case ".html":
		case ".htm":
			console.log("html", fullPath);
			responseWriters[fullPath] = getCacheResponseWriter("text/html", data);
			break;
		case ".ico":
			console.log("ico", fullPath);
			responseWriters[fullPath] = getCacheResponseWriter("image/x-icon", data);
			break;
	}

	function getCacheResponseWriter(contentType, data) {
		return function(response) {
			response.writeHead(200, {"Content-Type": contentType});
			response.end(data);
		};
	}
}




