PACKAGE( "cryptopotamus.view.FancyDiv", IMPORT( "cryptopotamus.view.Div")).define_instance( function( _) {

	_.get_configuration = function() {
		return this.extend_configuration( { b: "7", c: "8"});
	};
});