import axios from 'axios';

const BACKEND_URL = 'https://test-ca62a-default-rtdb.firebaseio.com/';

export async function addExpense(expenseData) {
  const response = await axios
    .post(BACKEND_URL + 'expenses.json', expenseData)
    .then(r => {});
  return response.data.name;
}

export async function getExpenses() {
  const expenses = [];
  const response = await axios.get(BACKEND_URL + 'expenses.json');
  for (const key in response.data) {
    const expenseObject = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      title: response.data[key].title,
    };
    expenses.push(expenseObject);
  }
  return expenses;
}

export async function getLastWeeksExpenses() {
  const expenses = [];
  const response = await axios.get(BACKEND_URL + 'expenses.json');
  const today = new Date();
  const sevenDaysAgo = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDay() - 7,
  );
  for (const key in response.data) {
    const expensesDay = new Date(response.data[key].date.slice(0, 10));
    if (expensesDay > sevenDaysAgo) {
      const expenseObject = {
        id: key,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        title: response.data[key].title,
      };
      expenses.push(expenseObject);
    }
  }
  return expenses;
}
export function updateExpense(expenseId, expense) {
  return axios.put(BACKEND_URL + `expenses/${expenseId}.json`, expense);
}

export function deleteExpense(expenseId) {
  axios.delete(BACKEND_URL + `expenses/${expenseId}.json`);
}
