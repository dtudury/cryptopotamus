
PACKAGE_CLASS( "cryptopotamus.controller").define_static( function( _) {
	
	var model = IMPORT( "cryptopotamus.model");

	_.update_salt = function( in_event) {
		var _event = window.event || in_event;
		if (!_event.target) _event.target = _event.srcElement;
		model.set_salt( _event.target.value);
	};
	
	_.generate_all = function( in_event) {
		window.alert( "generate based on " + model.get_salt());
	};
	
});