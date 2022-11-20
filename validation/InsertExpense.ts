import { ExecOptionsWithBufferEncoding } from 'child_process';
import Expense from '../types/Expense';

export const validateExpenseFields = (data: Expense) => {
  const requiredFields: string[] = [
    'date',
    'firm',
    'amount',
    'objectId',
    'categoryId',
  ];
  let emptyFields: string[] = [];

  for (const field of requiredFields) {
    // @ts-ignore
    if (!data[field] || data[field] === '' || data[field] === '-') {
      emptyFields.push(field);
    }
  }
  return emptyFields;
};
