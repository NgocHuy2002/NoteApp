import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenList from './Screen/ScreenList';
import ScreenAdd from './Screen/ScreenAdd';
import { store, persistor } from './store';
import ScreenEdit from './Screen/ScreenEdit';


const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack.Navigator>
        <Stack.Screen name="List" component={ScreenList} />
        <Stack.Screen name="Add" component={ScreenAdd} />
        <Stack.Screen name="Edit" component={ScreenEdit} />
      </Stack.Navigator>
      </PersistGate>
    </Provider>
    </NavigationContainer>
  );
};

export default App;