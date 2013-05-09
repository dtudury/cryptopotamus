/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 5/9/13
 * Time: 2:02 PM
 * To change this template use File | Settings | File Templates.
 */

var fs = require("fs");
var path = require("path");

exports.forAllFiles = function(root, fileCallBack, doneCallBack) {

	var count = 0;
	processPath("");

	function processPath(relativePath) {
		increment();
		fs.stat(path.join(root, relativePath), function(err, stat) {
			if(err) throw err;
			if(stat.isDirectory()) {
				handleDir(relativePath);
			} else if(stat.isFile()) {
				handleFile(relativePath);
			}
			decrement();
		});
	}

	function handleDir(relativePath){
		increment();
		fs.readdir(path.join(root, relativePath), function(err, fileNames) {
			if(err) throw err;
			for(var i = 0; i < fileNames.length; i++) {
				processPath(path.join(relativePath, fileNames[i]));
			}
			decrement();
		});
	}

	function handleFile(relativePath){
		increment();
		fs.readFile(path.join(root, relativePath), null, function(err, data) {
			if(err) throw err;
			fileCallBack(relativePath, data);
			decrement();
		});
	}

	function increment() {
		count++;
//		console.log(count);
	}

	function decrement() {
		count--;
//		console.log(count);
		if(count == 0) {
			doneCallBack();
		}
	}
}