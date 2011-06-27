
if( !cryptopotamus) var cryptopotamus = { model:{}, view:{}, controller:{}};

(function() {
	var m = this;
	var v = cryptopotamus.view;
	var c = cryptopotamus.controller;

	m.publisher = new utils.PubSub();

	m.NEW_SALT = "newsalt";
	var _salt;
	m.set_salt = function( salt) {
		if( _salt == salt) return;
		_salt = salt;
		m.publisher.sendMessage( m.NEW_SALT);
	};
	m.get_salt = function() { return _salt;};

	var _configs = [];
}).call( cryptopotamus.model);