import {Text, View} from 'react-native';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import {useContext, useEffect, useState} from 'react';
import {ExpenseContext} from '../store/expense-context';
import {getExpenses, getLastWeeksExpenses} from '../utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [fetchedExpenses, setFetchedExpenses] = useState([]);
  const [error, setError] = useState(null);
  const expenseCtx = useContext(ExpenseContext);
  const recentExpenses = expenseCtx.expenses.filter(expense => {
    const today = new Date();
    const date7DaysAgo = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDay() - 7,
    );
    return expense.date > date7DaysAgo;
  });

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const expenses = await getLastWeeksExpenses();
        setFetchedExpenses(expenses);
        expenseCtx.setExpenses(expenses);
      } catch (e) {
        console.log(e)
        setError('Could not fetch expenses');
      }
      setIsFetching(false);
    }
    fetchExpenses();
  }, [fetchedExpenses]);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expenses={fetchedExpenses}
      expensesPeriod={'Last 7 Days'}
      fallbackText={'No Expenses registered for last 7 days'}
    />
  );
}
export default RecentExpenses;
