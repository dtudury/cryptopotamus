CLASS( "cryptopotamus.view.FancierDiv")
.EXTENDS( "cryptopotamus.view.FancyDiv")
.DEFINITION( function() {

	this.get_configuration = function() {
		return this.extend_configuration( { c: "14", d: "15"});
	};
});