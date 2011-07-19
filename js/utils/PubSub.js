	
/*****************************************************************************
 * 
 *****************************************************************************/
 
CLASS( "utils.PubSub")
.DEFINITION( function() {

	var Closure = IMPORT( "utils.Closure");

	this.get_topic = function( in_topic) {
		if( !this._topics) this._topics = {};
		if( !this._topics[ in_topic]) this._topics[ in_topic] = [];
		return this._topics[ in_topic];
	}
	
	this.subscribe = function( target, executable, topic) {
		this.get_topic( topic).push( new Closure( target, executable));
	};
	
	this.unsubscribe = function( target, executable, topic) {
		var subscriptions = this.get_topic( topic);
		this._topics[ topic] = [];
		var closure = new Closure( target, executable);
		for( var i = 0; i < subscriptions.length; i++) {
			if( !closure.compare( subscriptions[ i])) {
				this.get_topic( topic).push( subscriptions[ i]);
			}
		}
	};
	
	this.sendMessage = function( topic) {
		var _args = [].slice.call( arguments, 1);
		var topics = this.get_topic( topic).slice( 0);
		for( var i = 0; i < topics.length; i++) {
			topics[ i].execute.apply( null, _args);
		}
	};
});
