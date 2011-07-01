PACKAGE( "cryptopotamus.view.FancierDiv", IMPORT( "cryptopotamus.view.FancyDiv")).define_instance( function( _) {

	_.get_configuration = function() {
		return this.extend_configuration( { c: "14", d: "15"});
	};
});