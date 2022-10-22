const { v4 } = require('uuid');
const { getSqlDate } = require('../functions/getSqlDate');
exports.saveInsurance = async (con, data) => {
    let insuranceData = JSON.parse(data);

    console.log('insuranceData: ', insuranceData);
    const id = v4();
    const date = getSqlDate();

    const result = await con.promise().query(
        `INSERT INTO insurances  ` +
        `(id, insurance_name, insurance_vendor, insurance_number, insurance_object, yearly_amount, monthly_amount, contract_start_date, contract_end_date, contract_renewal, payment_type, description, insurance_paper_link, createdAt, updatedAt)` +
        `VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            `${id}`,
            `${insuranceData.insurance_name}`,
            `${insuranceData.insurance_vendor}`,
            `${insuranceData.insurance_number}`,
            `${insuranceData.insurance_object}`,
            `${insuranceData.yearly_amount}`,
            `${insuranceData.monthly_amount}`,
            `${insuranceData.contract_start_date}`,
            `${insuranceData.contract_end_date}`,
            `${insuranceData.contract_renewal}`,
            `${insuranceData.payment_type}`,
            `${insuranceData.description}`,
            `${insuranceData.insurance_paper_link}`,
            `${date}`,
            `${date}`,
        ]
    );
    if (result[0]) {
        return result[0];
    }
    return null;
};