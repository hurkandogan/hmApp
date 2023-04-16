export default interface Expense {
  id?: string;
  date: string;
  firm: string;
  description: string;
  amount: string;
  link: string;
  isPaid: boolean;
  category: string;
  property: string;
  user?: string;
  [key: string]: string | boolean | undefined;
}
