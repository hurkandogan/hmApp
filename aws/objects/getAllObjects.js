exports.getAllObjects = async con => {
    const test = await con.promise().query('SELECT * FROM objects');
    return test[0];
};