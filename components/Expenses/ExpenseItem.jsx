import {Pressable, Text, View, StyleSheet} from 'react-native';
import {GlobalStyles} from '../../constants/styles';
import {useNavigation} from '@react-navigation/native';
function ExpenseItem({id, title, date, amount}) {
  const navigation = useNavigation();
  function expenseHandler() {
    navigation.navigate('Manage Expenses', {
      expenseId: id,
    });
  }

  return (
    <Pressable
      onPress={expenseHandler}
      style={pressed => pressed && styles.pressed}
      android_ripple={{color: 'black'}}>
      <View style={styles.expenseItem}>
        <View style={styles.expenseInfo}>
          <Text style={[styles.textBase, styles.description]}>{title}</Text>
          <Text style={styles.textBase}>{date.toISOString().slice(0, 10)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    borderRadius: 6,
    elevation: 4,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOpacity: 0.5,
    shadowOffset: {width: 1, height: 1},
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  expenseInfo: {
    maxWidth: 275,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExpenseItem;
