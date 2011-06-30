
PACKAGE_CLASS( "cryptopotamus.model").define_static( function( _) {
	
	var PubSub = IMPORT( "utils.PubSub");

	_.publisher = new PubSub();

	_.NEW_SALT = "newsalt";
	var _salt;
	_.set_salt = function( salt) {
		if( _salt == salt) return;
		_salt = salt;
		_.publisher.sendMessage( _.NEW_SALT);
	};
	_.get_salt = function() { return _salt;};

	var _configs = [];
});