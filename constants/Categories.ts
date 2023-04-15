import { Category } from '../types/Property';

export const Categories: {
  PRAXIS: Category;
  GENERAL: Category;
  CARL: Category;
  SIDE_COSTS: Category;
  RENOVATION: Category;
  COSTS: Category;
  EXPENSES: Category;
} = {
  PRAXIS: { val: 'praxis', label: 'Praxis' },
  GENERAL: { val: 'general', label: 'General' },
  CARL: { val: 'carl_private', label: 'Carl' },
  SIDE_COSTS: { val: 'side_cost', label: 'Side Costs' },
  RENOVATION: { val: 'renovation', label: 'Renovation Costs' },
  COSTS: { val: 'costs', label: 'Costs' },
  EXPENSES: { val: 'expenses', label: 'Expenses' },
};
