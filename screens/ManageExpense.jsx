import {Text, View, StyleSheet} from 'react-native';
import {useContext, useLayoutEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconButton from '../components/UI/IconButton';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GlobalStyles} from '../constants/styles';
import Button from '../components/UI/Button';
import {ExpenseContext} from '../store/expense-context';
import {addExpense, updateExpense, deleteExpense} from '../utils/http';
import ExpenseForm from '../components/Expenses/ManageExpense/ExpenseForm';

function ManageExpenses({route, navigation}) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const expenseCtx = useContext(ExpenseContext);
  useLayoutEffect(() => {
    console.log(isEditing);
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const selectedExpense = expenseCtx.expenses.find(
    expense => expense.id === editedExpenseId,
  );

  async function deleteExpenseFromContext() {
    await deleteExpense(editedExpenseId);
    expenseCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    if (isEditing) {
      expenseCtx.updateExpense(editedExpenseId, expenseData);
      await updateExpense(editedExpenseId, expenseData);
      navigation.goBack();
    } else {
      const id = await addExpense(expenseData);
      expenseCtx.addExpense({...expenseData, id: id});
      navigation.goBack();
    }
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        isEditing={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon={'remove'}
            size={48}
            color={'red'}
            onPress={deleteExpenseFromContext}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});

export default ManageExpenses;
