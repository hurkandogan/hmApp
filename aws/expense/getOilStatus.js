exports.getOilStatus = async (con, data) => {
    const postedData = JSON.parse(data);
    const result = await con.promise().query(`SELECT * FROM oil_status WHERE object = '${postedData.object}' ORDER BY date DESC LIMIT 10`);
    if (result[0]) {
        return result[0];
    }
    return null;
};