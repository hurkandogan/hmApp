const mysql = require('mysql2');
const { getAllObjects } = require('./objects/getAllObjects');
const { saveObject } = require('./objects/saveObject');
const { getDashboardTotals } = require('./dashboard/getDashboardTotals');

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
        /***** DASHBOARD *****/
        case '/dashboard': {
            switch (event.httpMethod) {
                case 'GET': {
                    const result = await getDashboardTotals(con);
                    console.log('getDashboardTotals: ', result);
                    if (result) {
                        return success(result);
                    }
                    return error('No objects found or some error occured.');
                }
            }
        }

        /***** OBJECTS *****/
        case '/objects': {
            switch (event.httpMethod) {
                case 'GET': {
                    const result = await getAllObjects(con);
                    console.log('getAllObjects: ', result);
                    if (result) {
                        return success(result);
                    }
                    return error('No objects found or some error occured.');
                }
                case 'POST': {
                    const result = await saveObject(con, event.body);
                    console.log('saveObject: ', result);
                    if (result) {
                        return success(result);
                    }
                    return error('No objects found or some error occured.');
                }
            }
        }
            break;
        default:
            return error({ msg: 'This route is not available.' })
    }
};
