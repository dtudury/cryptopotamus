/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 5/9/13
 * Time: 2:02 PM
 * To change this template use File | Settings | File Templates.
 */


var fs = require("fs");
var path = require("path");
var Q = require("q");
var _ = require("underscore");

exports.forAllFiles = function(root, fileCallBack, doneCallBack) {

	processPath("").then(doneCallBack).done();

	function processPath(relativePath) {
		return Q.nfcall(fs.stat, path.join(root, relativePath))
			.then(function(stat) {
				if(stat.isDirectory()) {
					return handleDir(relativePath);
				} else if(stat.isFile()) {
					return handleFile(relativePath);
				}
			});
	}

	function handleDir(relativePath) {
		return Q.nfcall(fs.readdir, path.join(root, relativePath))
			.then(function(fileNames) {
				return Q.all(
					_.chain(fileNames)
						.map(function(fileName) {
							return path.join(relativePath, fileName)
						})
						.map(processPath)
						.value()
				);
			});
	}

	function handleFile(relativePath) {
		return Q.nfcall(fs.readFile, path.join(root, relativePath))
			.then(function(data) {
				fileCallBack(relativePath, data);
			});
	}
};
