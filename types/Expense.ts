export default interface Expense {
  date: string;
  firm: string;
  description: string;
  amount: string;
  link: string;
  isPaid: boolean;
  categoryId: string;
  objectId: string;
  userId?: string;
}
