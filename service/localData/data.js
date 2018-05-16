const click = require( '../static/click' );

export default new Promise( ( resolve, reject ) => {
    click.register( null, ( err, data ) => resolve( err, data ) );
} );
