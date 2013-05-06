/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 5/3/13
 * Time: 10:58 AM
 * To change this template use File | Settings | File Templates.
 */

var fs = require("fs");
var path = require("path");

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		clean: {
			build: ["build"]
		},
		copy: {
			web: {
				files: [
					{ expand: true, src: ["web/index.html", "web/favicon.ico"], dest: "build/", rename: function(dest, src) {
						return dest + path.basename(src);
					}}
				]
			}
		},
		requirejs: {
			main: {
				options: {
					name: "main",
					baseUrl: "web/js",
					mainConfigFile: "web/js/main.js",
					out: "build/main.js",
					optimize: "uglify2"
				}
			}
		},
		open: {
			local: {
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
	grunt.loadNpmTasks("grunt-bump");
	grunt.loadNpmTasks("grunt-open");
	grunt.registerTask("template-index", "apply simple templating to index file", function() {
		var index = fs.readFileSync("build/index.html");
		index = index.toString();
		var data = grunt.config("pkg");
		data.date = grunt.template.today("isoUtcDateTime");
		index = grunt.template.process(index, {data: data});
		fs.writeFileSync("build/index.html", index);
	});
	grunt.registerTask("log", "Log some stuff.", function() {
		grunt.log.writeln(grunt.config("pkg").name);
		grunt.log.writeln(grunt.template.today("isoUtcDateTime"));
		grunt.log.writeln(grunt.config("pkg").version);
	});
	grunt.registerTask("build", ["bump:build", "clean:build", "copy:web", "template-index", "requirejs:main"]);
	grunt.registerTask("default", ["build", "log", "open:local", "connect:server"]);
}