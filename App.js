import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenList from './Screen/ScreenList';
import ScreenAdd from './Screen/ScreenAdd';
import { store, persistor } from './store';


const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="List" component={ScreenList}/>
            <Stack.Screen name="Add" component={ScreenAdd} />
          </Stack.Navigator>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;