/*****************************************************************************
 * 
 *****************************************************************************/
 
FUNCTION( "cryptopotamus.handle_onload")
.DEFINITION( function() {
	ATTACH_LOGGER();
	//var view = IMPORT( "cryptopotamus.View");
	var TopNav = IMPORT( "cryptopotamus.view.TopNav");
	var GeneratorList = IMPORT( "cryptopotamus.view.GeneratorList");
	var NewGeneratorButton = IMPORT( "cryptopotamus.view.NewGeneratorButton");

	var content = document.createElement( "div");
	document.body.appendChild( content);
	//content.appendChild( view.new_top_nav());
	//content.appendChild( view.new_text_input( "name here"));
	
	
	( new TopNav( content)).append();
	( new GeneratorList( content)).append();
	( new NewGeneratorButton( content)).append();
});
