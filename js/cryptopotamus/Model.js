
CLASS( "cryptopotamus.Model")
.STATIC( function() {
	
	var PubSub = IMPORT( "utils.PubSub");
	var Generator = IMPORT( "cryptopotamus.model.Generator");

	this.publisher = new PubSub();

	this.NEW_SALT = "newsalt";
	this.INSERTION = "insertion";
	this.INSERTION = "deletion";

	var _salt;
	this.set_salt = function( salt) {
		if( _salt == salt) return;
		_salt = salt;
		this.publisher.sendMessage( this.NEW_SALT);
	};
	this.get_salt = function() { return _salt;};

	var _generators = [];
	this.add_new_generator = function( in_index) {
		if( in_index === undefined) {
			in_index = _generators.length;
		}
		_generators.splice( in_index, 0, new Generator());
		this.publisher.sendMessage( this.INSERTION, in_index);
	};
	this.remove_generator = function( in_index) {
		_generators.splice( in_index, 1);
		this.publisher.sendMessage( this.DELETION, in_index);
	};
	this.get_generator_count = function() {
		return _generators.length;
	};
});
