import {Text, View} from 'react-native';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import {useContext, useEffect, useState} from 'react';
import expenseContext, {ExpenseContext} from '../store/expense-context';
import { getExpenses, getLastWeeksExpenses } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function AllExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [isFetching, setIsFetching] = useState(true)
  const [fetchedExpenses, setFetchedExpenses] = useState([]);
  const expenseCtx = useContext(ExpenseContext);

  useEffect(() => {
    async function fetchExpenses() {
      const expenses = await getExpenses();
      setIsFetching(false);
      setFetchedExpenses(expenses);
      expenseCtx.setExpenses(expenses);
    }
    fetchExpenses();
  }, [fetchedExpenses]);

  if (isFetching) {
    return <LoadingOverlay />;
  }
  return (
    <ExpensesOutput
      expenses={fetchedExpenses}
      expensesPeriod={'Total'}
      fallbackText={'No Expenses registered '}
    />
  );
}
export default AllExpenses;
