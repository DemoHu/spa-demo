export function apiLoginByUser ( email, password ) {
    return new Promise( ( resolve, reject ) => {
        import( '@/mork/userInfo.js' ).then( data => {
            let index, flag, user;

            flag = data.default.some( ( el, i ) => {
                index = i;
                return el.email === email &&
                el.password === password;
            } );

            if ( flag ) {     // 成功
                user = data.default[ index ];
                user.status = 1;
                resolve( { data: user, code: 1 } );
            } else {
                reject( { data: { }, code: -1 } );
            }
        } );
    } );
}
