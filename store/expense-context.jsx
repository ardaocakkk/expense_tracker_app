import {createContext, useReducer} from 'react';

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({title, amount, date}) => {},
  setExpenses: expenses => {},
  deleteExpense: ({id}) => {},
  updateExpense: (id, {title, amount, date}) => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().getTime().toString() + Math.random().toString();
      return [{...action.payload, id: id}, ...state];
    case 'SET':
      return action.payload;
    case 'REMOVE':
      return state.filter(expense => expense.id !== action.payload);
    case 'UPDATE':
      return state.map(expense => {
        if (expense.id === action.payload.id) {
          return {...expense, ...action.payload.data};
        }
        return expense;
      });
    default:
      return state;
  }
}

function ExpensesContextProvider({children}) {
  const [expensesState, dispatch] = useReducer(expenseReducer, []);
  function addExpense(expenseData) {
    dispatch({type: 'ADD', payload: expenseData});
  }

  function setExpenses(expenses) {
    dispatch({type: 'SET', payload: expenses});
  }

  function deleteExpense(id) {
    dispatch({type: 'REMOVE', payload: id});
  }
  function updateExpense(id, expenseData) {
    dispatch({type: 'REMOVE', payload: {id: id, data: expenseData}});
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export default ExpensesContextProvider;
