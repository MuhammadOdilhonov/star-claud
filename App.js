import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './pages/Login/Login';
import TapMenu from './TapMenu/TapMenu'; // Import TapMenu which contains the Tab Navigator
import FullInformation from './components/FullInformation/FullInformation';
import CollectInformation from './components/CollectInformation/CollectInformation';
import Statistics from './components/Statistics/Statistics';
import MonthlyKipay from './components/MonthlyKipay/MonthlyKipay';
import AddWorker from './components/AddWorker/AddWorker';
import AddProduct from './components/AddProduct/AddProduct';
import RentedItems from './components/RentedItems/RentedItems';
import ProductsSold from './components/ProductsSold/ProductsSold';
import ReturningRental from './components/ReturningRental/ReturningRental';
import UserProfile from './components/UserProfile/UserProfile';
import ProductInventory from './components/ProductInventory/ProductInventory';
import WorkersList from './components/WorkersList/WorkersList';
import Details from './components/Details/Details';
import ViewAndAddCategory from './components/ViewAndAddCategory/ViewAndAddCategory';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TapMenu" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="TapMenu" component={TapMenu} />
        <Stack.Screen name="FullInformation" component={FullInformation} />
        <Stack.Screen name='CollectInformation' component={CollectInformation} />
        <Stack.Screen name='Statistics' component={Statistics} />
        <Stack.Screen name='MonthlyKipay' component={MonthlyKipay} />
        <Stack.Screen name='AddWorker' component={AddWorker} />
        <Stack.Screen name='AddProduct' component={AddProduct} />
        <Stack.Screen name='RentedItems' component={RentedItems} />
        <Stack.Screen name='ProductsSold' component={ProductsSold} />
        <Stack.Screen name='ReturningRental' component={ReturningRental} />
        <Stack.Screen name='UserProfile' component={UserProfile} />
        <Stack.Screen name='ProductInventory' component={ProductInventory} />
        <Stack.Screen name='WorkersList' component={WorkersList} />
        <Stack.Screen name='Details' component={Details} />
        <Stack.Screen name='ViewAndAddCategory' component={ViewAndAddCategory} />



      </Stack.Navigator>
    </NavigationContainer>
  );
}
