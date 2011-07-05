
CLASS( "cryptopotamus.Model")
.STATIC( function() {
	
	var PubSub = IMPORT( "utils.PubSub");

	this.publisher = new PubSub();

	this.NEW_SALT = "newsalt";
	var _salt;
	this.set_salt = function( salt) {
		if( _salt == salt) return;
		_salt = salt;
		this.publisher.sendMessage( this.NEW_SALT);
	};
	this.get_salt = function() { return _salt;};

	var _configs = [];
});