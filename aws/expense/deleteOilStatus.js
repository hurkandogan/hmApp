exports.deleteOilStatus = async (con, data) => {
    const postedData = JSON.parse(data);
    const result = await con.promise().query(`DELETE FROM oil_status WHERE id = '${postedData.id}'`);
    if (result[0]) {
        return result[0];
    }
    return null;
};