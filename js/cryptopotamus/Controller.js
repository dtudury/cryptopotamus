
CLASS( "cryptopotamus.Controller")
.STATIC( function() {
	
	var Model = IMPORT( "cryptopotamus.Model");

	this.update_salt = function( in_salt) {
		LOG( "cryptopotamus.Controller.update_salt " + in_salt);
	};
	this.generate_all = function() {
		LOG( "cryptopotamus.Controller.generate_all");
	};
	this.add_generator = function() {
		LOG( "cryptopotamus.Controller.add_generator");
		Model.add_new_generator();
	};
	this.remove_generator = function( in_index) {
		LOG( "cryptopotamus.Controller.remove_generator " + in_index);
		Model.remove_generator( in_index);
	}
	
});
