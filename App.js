import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenList from './Screen/ScreenList';
import ScreenAdd from './Screen/ScreenAdd';
import { store, persistor } from './store';
import { MenuProvider } from 'react-native-popup-menu';
import Favorite from './Screen/Favorite';

const Stack = createStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>

        <PersistGate loading={null} persistor={persistor}>
          <MenuProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="List" component={ScreenList} />
              <Stack.Screen name="Add" component={ScreenAdd} />
              <Stack.Screen name="Favorite" component={Favorite} />
            </Stack.Navigator>
          </MenuProvider>
        </PersistGate>

      </NavigationContainer>
    </Provider>
  );
};

export default App;