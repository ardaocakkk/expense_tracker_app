import './gesture-handler';
import {Text, View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ManageExpenses from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import {GlobalStyles} from './constants/styles';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expense-context";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={RecentExpenses} />
      <Drawer.Screen name="Article" component={AllExpenses} />
    </Drawer.Navigator>
  );
}

function ExpensesOverview() {
  return (
    <BottomTab.Navigator
      screenOptions={({navigation}) => ({
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white',
        tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({tintColor}) => {
          return (
            <IconButton icon={"plus"} size={24} color={tintColor} onPress={() => {
              navigation.navigate("Manage Expenses")
            }} />
          );
        }
      })}>
      <BottomTab.Screen
        name={'RecentExpenses'}
        options={{
          title: 'Recent Expenses',
          headerShown: true,
          headerTitle: 'Recent Expenses',
          headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
          headerTintColor: 'white',
          tabBarIcon: ({color, size}) => <Icon name="hourglass-o" color={color} size={size} />
        }}
        component={RecentExpenses}
      />
      <BottomTab.Screen
        name={'AllExpenses'}
        options={{
          title: 'All Expenses',
          headerShown: true,
          headerTitle: 'All Expenses',
          headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
          headerTintColor: 'white',
          tabBarIcon: ({color, size}) => <Icon name="calendar" color={color} size={size} />
        }}
        component={AllExpenses} />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar barStyle={"default"}/>
      <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
          headerTintColor: 'white'
        }}>
          <Stack.Screen
            name={'ExpensesOverview'}
            component={ExpensesOverview}
            options={{headerShown: false}}
          />
          <Stack.Screen name={'Manage Expenses'} component={ManageExpenses} options={{
            presentation: 'modal',
          }} />
        </Stack.Navigator>
      </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
