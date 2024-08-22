import {FlatList, Text, View, StyleSheet} from 'react-native';
import ExpenseItem from './ExpenseItem';

function expenseItem(data) {
  return <ExpenseItem {...data.item} />;
}

export default function Expense({expenses}) {
  return (
    <View>
      <FlatList
        data={expenses}
        renderItem={expenseItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
