/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 5/3/13
 * Time: 10:58 AM
 * To change this template use File | Settings | File Templates.
 */

var path = require("path");

module.exports = function(grunt) {
	console.log("exporting...");
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		clean: ["build"],
		copy: {
			main: {
				files: [
					{ expand: true, src: ["web/index.html", "web/favicon.ico"], dest: "build/", rename: function(dest, src) {
						return dest + path.basename(src);
					}}
				]
			}
		},
		requirejs: {
			compile: {
				options: {
					name: "main",
					baseUrl: "web/js",
					mainConfigFile: "web/js/main.js",
					out: "build/main.js",
					optimize: "uglify2"
				}
			}
		},
		open : {
			dev : {
				path: "http://localhost:8000/"
			}
		},
		connect: {
			server: {
				options: {
					port: 8000,
					base: "build",
					keepalive: true
				}
			}
		}
	});
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-requirejs");
	grunt.loadNpmTasks("grunt-open");
	grunt.registerTask("log", "Log some stuff.", function() {
		grunt.log.write("Logging some stuff... " + grunt.config("pkg").name + " " + grunt.template.today("isoUtcDateTime"));
	});
	grunt.registerTask("default", ["clean", "copy", "requirejs", "log", "open", "connect"]);
}