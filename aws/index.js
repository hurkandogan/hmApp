const mysql = require('mysql2');
const { getAllObjects } = require('./objects/getAllObjects');
const { saveObject } = require('./objects/saveObject');
const { getCategories } = require('./categories/getCategories');
const { getDashboardTotals } = require('./dashboard/getDashboardTotals');
const { saveExpense } = require('./expense/saveExpense');
const { editExpense } = require('./expense/editExpense');
const { getExpensesForObject } = require('./expense/getExpensesForObject');

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
            break;

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

        /***** CATEGORIES *****/
        case '/categories': {
            switch (event.httpMethod) {
                case 'GET': {
                    const result = await getCategories(con);
                    console.log('getCategories: ', result);
                    if (result) {
                        return success(result);
                    }
                    return error('No categories found or some error occured.');
                }
            }
        }
            break;

        /***** SAVE EXPENSE *****/
        case '/saveexpense': {
            switch (event.httpMethod) {
                case 'POST': {
                    const result = await saveExpense(con, event.body);
                    console.log('saveExpense: ', result);
                    if (result) {
                        return success(result);
                    }
                    return error('No expenses found or some error occured.');
                }
            }
        }
            break;

        /***** EDIT EXPENSE *****/
        case '/editexpense': {
            const result = await editExpense(con, event.body);
            console.log('editExpense: ', result);

            if (result) return success(result);
            return error('No expenses found or some error occured.');

        }
            break;

        /***** GET EXPENSES FOR OBJECT *****/
        case '/getexpensesforobject': {
            switch (event.httpMethod) {
                case 'POST': {
                    const result = await getExpensesForObject(con, event.body);
                    console.log('getexpensesforobject: ', result);
                    if (result) {
                        return success(result);
                    }
                    return error('No expenses found for this object or some error occured.');
                }
            }
        }
            break;
        default:
            return error({ msg: 'This route is not available.' });
    }
};
