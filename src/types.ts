export type Expense = {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
};

export type Income = {
  id: string;
  amount: number;
  source: string;
  date: string;
};

export type Goal = {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  deadline: string | null;
};