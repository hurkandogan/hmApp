const { getSqlDate } = require('../functions/getSqlDate');
exports.editInsurance = async (con, data) => {
    let insuranceData = JSON.parse(data);

    console.log('insuranceData: ', insuranceData);
    const date = getSqlDate();

    const result = await con.promise().query(
        `UPDATE insurances SET ` +
        `insurance_name=?, insurance_vendor=?, insurance_number=?, insurance_object=?, yearly_amount=?, contract_end_date=?, description=?, payment_type=?, insurance_paper_link=?, monthly_amount=?, is_cancelled=?, cancellation_date=?, contract_renewal=?, createdAt=?, updatedAt=? WHERE id = ?`,
        [
            `${insuranceData.insurance_name}`,
            `${insuranceData.insurance_vendor}`,
            `${insuranceData.insurance_number}`,
            `${insuranceData.insurance_object}`,
            `${insuranceData.yearly_amount}`,
            `${insuranceData.contract_end_date}`,
            `${insuranceData.description}`,
            `${insuranceData.payment_type}`,
            `${insuranceData.insurance_paper_link}`,
            `${insuranceData.monthly_amount}`,
            `${insuranceData.is_cancelled}`,
            `${insuranceData.cancellation_date}`,
            `${insuranceData.contract_renewal}`,
            `${date}`,
            `${date}`,
        ]
    );
    if (result[0]) {
        return result[0];
    }
    return null;
};