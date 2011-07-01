
/*****************************************************************************
 * 
 *****************************************************************************/
 
PACKAGE( "utils.Closure").define_instance( function( _) {
	_.constructor = function( target, executable) {
	    var args = [].slice.call( arguments, 2);
		this.target = target;
		this.executable = executable;
		this.args = args;
		this.execute = function() {
			var _args = [].slice.call( arguments);
			executable.apply( target, args.concat( _args));
		};
		this.compare = function( in_closure) {
			if( this.target != in_closure.target) return false;
			if( this.executable != in_closure.executable) return false;
			if( this.args.length != in_closure.args.length) return false;
			for( var i = 0; i < this.args.length; i++) {
				if( this.args[ i] != in_closure.args[ i]) return false;
			}
			return true;
		};
	};
});