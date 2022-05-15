const mysql = require('mysql2');
const { getAllObjects } = require('./objects/getAllObjects');

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

const success = (data = null) => {
    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        },
        body: JSON.stringify({ data: data }),
    };
    return response;
};

const error = (err) => {
    return {
        statusCode: 500,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        },
        body: JSON.stringify({ msg: err }),
    };
};

exports.handler = async (event) => {
    console.log('Main Event:', event);
    switch (event.resource) {
        /***** OBJECTS *****/
        case '/objects': {
            switch (event.httpMethod) {
                case 'GET': {
                    const objects = await getAllObjects(con);
                    console.log('getAllObjects: ', objects);
                    return success(objects);
                }
            }
        }
            break;
        default:
            return error({ msg: 'This route is not available.' })
    }
};
