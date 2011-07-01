	
/*****************************************************************************
 * 
 *****************************************************************************/
 
PACKAGE( "utils.PubSub").define_instance( function( _) {

	var Closure = IMPORT( "utils.Closure");

	var _topics = {};
	
	_.subscribe = function( target, executable, topic) {
		if( !_topics[ topic]) _topics[ topic] = [];
		_topics[ topic].push( new Closure( target, executable));
	};
	
	_.unsubscribe = function( target, executable, topic) {
		if( !_topics[ topic]) _topics[ topic] = [];
		var subscriptions = _topics[ topic];
		_topics[ topic] = [];
		var closure = new Closure( target, executable);
		for( var i = 0; i < subscriptions.length; i++) {
			if( !closure.compare( subscriptions[ i])) {
				_topics[ topic].push( subscriptions[ i]);
			}
		}
	};
	
	_.sendMessage = function( topic) {
		if( !_topics[ topic]) _topics[ topic] = [];
		var _args = [].slice.call( arguments, 1);
		for( var i = 0; i < _topics[ topic].length; i++) {
			_topics[ topic][ i].execute.apply( null, _args);
		}
	};
});
