
if( !cryptopotamus) var cryptopotamus = { model:{}, view:{}, controller:{}};

(function() {
	var m = cryptopotamus.model;
	var v = cryptopotamus.view;
	var c = cryptopotamus.controller;

	this.handle_onload = function() {
		var content = document.getElementById( "content");
		content.appendChild( v.new_top_nav());
		//content.appendChild( v.new_text_input());
		content.appendChild( v.new_text_input( "name here"));
		var announce_new_salt = function() {
			//window.alert( "new salt: " + m.get_salt());
		};
		m.publisher.subscribe( {}, announce_new_salt, m.NEW_SALT);
	};
}).call( cryptopotamus);