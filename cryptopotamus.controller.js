
if( !cryptopotamus) var cryptopotamus = { model:{}, view:{}, controller:{}};

(function() {
	var m = cryptopotamus.model;
	var v = cryptopotamus.view;
	var c = this;

	c.update_salt = function( in_event) {
		var _event = window.event || in_event;
		if (!_event.target) _event.target = _event.srcElement;
		m.set_salt( _event.target.value);
	};
	c.generate_all = function( in_event) {
		window.alert( "generate based on " + m.get_salt());
	};
}).call( cryptopotamus.controller);