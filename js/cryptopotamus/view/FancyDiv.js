CLASS( "cryptopotamus.view.FancyDiv")
.EXTENDS( "cryptopotamus.view.Div")
.DEFINITION( IMPORT( "utils.PubSub"))
.DEFINITION( function() {

	this.get_configuration = function() {
		return this.extend_configuration( { b: "7", c: "8"});
	};
});