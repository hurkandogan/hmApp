exports.getInsurances = async con => {
    const result = await con.promise().query('SELECT * FROM insurances');
    if (result[0]) {
        return result[0];
    }
    return null;
};