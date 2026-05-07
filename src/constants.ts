export interface Expense {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
}

export const INITIAL_EXPENSES: Expense[] = [
  { id: "1", description: "Monthly Rent", category: "Rent", amount: 15000, date: "2024-05-01" },
  { id: "2", description: "Grocery Store", category: "Food", amount: 4500, date: "2024-05-03" },
  { id: "3", description: "Gas Station", category: "Travel", amount: 2000, date: "2024-05-04" },
  { id: "4", description: "Internet Bill", category: "Bills", amount: 999, date: "2024-05-05" },
  { id: "5", description: "Movie Night", category: "Entertainment", amount: 800, date: "2024-05-06" },
];
