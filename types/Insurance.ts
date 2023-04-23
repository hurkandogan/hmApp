export type Insurance = {
  id?: string;
  contract_end_date: string;
  contract_renewal: string;
  contract_start_date: string;
  description: string;
  insurance_name: string;
  insurance_number: string;
  insurance_property: string;
  insurance_paper_link: string;
  insurance_vendor: string;
  monthly_amount: number | string;
  payment_type: string;
  yearly_amount: number | string;
  user?: string;
};
