import {View, StyleSheet, Text, Alert} from 'react-native';
import Input from './Input';
import {useState} from 'react';
import Button from '../../UI/Button';
import { GlobalStyles } from "../../../constants/styles";

function ExpenseForm({onCancel, isEditing, onSubmit, defaultValues}) {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      valid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
      valid: true,
    },
    title: {
      value: defaultValues ? defaultValues.title : '',
      valid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues(prevStates => {
      return {
        ...prevStates,
        [inputIdentifier]: {value: enteredValue, valid: true},
      };
    });
  }

  function submitHandler() {
    console.log(isEditing)
    const formData = {
      amount: parseFloat(inputValues.amount.value),
      date: new Date(inputValues.date.value),
      title: inputValues.title.value,
    };

    const isValidAmount = !isNaN(formData.amount) && formData.amount > 0;
    const isValidDate = formData.date.toString() !== 'Invalid Date';
    const isValidTitle = formData.title.trim().length > 0;

    if (isValidTitle && isValidAmount && isValidDate) {
      onSubmit(formData);
    } else {
      setInputValues(currentInputs => {
        return {
          amount: {
            value: currentInputs.amount.value,
            valid: isValidAmount,
          },
          date: {
            value: currentInputs.date.value,
            valid: isValidDate,
          },
          title: {
            value: currentInputs.title.value,
            valid: isValidTitle,
          },
        };
      });
      //Alert.alert('Invalid Input', 'Please check the form');
    }
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label={'Amount'}
          invalid={!inputValues.amount.valid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputValues.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label={'Date'}
          invalid={!inputValues.date.valid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputValues.date.value,
          }}
        />
      </View>
      <Input
        label={'Title'}
        invalid={!inputValues.title.valid}
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          onChangeText: inputChangedHandler.bind(this, 'title'),
          value: inputValues.title.value,
        }}
      />
      {inputValues.title.valid &&
      inputValues.amount.valid &&
      inputValues.date.valid ? null : (
        <Text style={styles.errorText}>Invalid Input Values!</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode={'flat'} onPres={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPres={submitHandler}>
          {isEditing}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.error500,
    margin: 16,
  },
});
export default ExpenseForm;
