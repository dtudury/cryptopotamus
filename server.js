/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 4/30/13
 * Time: 11:03 AM
 * To change this template use File | Settings | File Templates.
 */

var fs = require("fs");
var http = require("http");
var path = require("path");
var url = require("url");

var responseWriters = {};
addResponseWritersForFilesIn("build", "/", responseWriters);
responseWriters["/"] = responseWriters["/index.html"];
startup();

function startup() {
	http.createServer(function (request, response) {
		var data = "";
		request.on("data", function (dataChunk) {
			data += dataChunk;
			if (data.length > 1e4) {
				data = "";
				response.writeHead(413, {"Content-Type": "text/plain"});
				request.connection.destroy();
			}
		});
		request.on("end", function () {
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

function addResponseWritersForFilesIn(localPath, serverPath) {
	fs.stat(localPath, function(err, stat) {
		if(err) throw err;
		if(stat.isDirectory()) {
			fs.readdir(localPath, function(err, fileNames) {
				if(err) throw err;
				for(var i = 0; i < fileNames.length; i++) {
					var fileName = fileNames[i];
					addResponseWritersForFilesIn(path.join(localPath, fileName), path.join(serverPath, fileName));
				}
			});
		} else if(stat.isFile()) {
			fs.readFile(localPath, null, function(err, data) {
				if(err) throw err;
				var extension = path.extname(localPath);
				switch(extension) {
					case ".js":
						console.log("js", localPath);
						responseWriters[serverPath] = getCacheResponseWriter("application/x-javascript", data);
						break;
					case ".html":
					case ".htm":
						console.log("html", localPath);
						responseWriters[serverPath] = getCacheResponseWriter("text/html", data);
						break;
					case ".ico":
						console.log("ico", localPath);
						responseWriters[serverPath] = getCacheResponseWriter("image/x-icon", data);
						break;
				}
			});
		}
	});

}

function getCacheResponseWriter(contentType, data) {
	return function(response) {
		response.writeHead(200, {"Content-Type": contentType});
		response.end(data);
	};
}

