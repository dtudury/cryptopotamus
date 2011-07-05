CLASS( "cryptopotamus.view.Div")
.EXTENDS( "cryptopotamus.view.Base")
.DEFINITION( function() {
	
	//override
	this.create_node = function() {
		this.node = document.createElement( "div");
	};
	
	this.get_configuration = function() {
		return this.extend_configuration( { a: "1", b: "2"});
	};

});