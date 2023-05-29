import 'react-native-gesture-handler';
import React from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ScreenList from './Screen/ScreenList';
import ScreenAdd from './Screen/ScreenAdd';
import { store, persistor } from './store';
import { MenuProvider } from 'react-native-popup-menu';
import Favorite from './Screen/Favorite';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './extra/CustomDrawer';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

const Drawer = createDrawerNavigator();
<CustomDrawer />
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PersistGate loading={null} persistor={persistor}>
          <MenuProvider>
            <Drawer.Navigator screenOptions=
              {{
                headerShown: false,
                drawerLabelStyle: { marginLeft: -25 },
                drawerActiveBackgroundColor: '#374955',
                drawerItemStyle: { borderRadius: 30 },
                activeTintColor: '#6EB7DC',
                drawerInactiveTintColor: '#D2E5F3',
                swipeEnabled: false,
              }}
              drawerContent={(props) => <CustomDrawer{...props} />}
            >
              <Drawer.Screen name="List" component={ScreenList} options={{
                drawerIcon: () => (
                  <Icon name='lightbulb-o' color={'#D2E5F3'} size={30} style={{ paddingRight: 35 }} />
                )
              }} />
              <Drawer.Screen name="Favorite" component={Favorite} options={{
                drawerIcon: () => (
                  <Icon name='heart' color={'#D2E5F3'} size={30} style={{ paddingRight: 20 }} />
                )
              }} />
              <Drawer.Screen name="Add" component={ScreenAdd} options={{
                drawerItemStyle: { height: 0 },
              }} />
            </Drawer.Navigator>
          </MenuProvider>
        </PersistGate>
      </NavigationContainer>
    </Provider>
  );
};

export default () =>
(
  <ApplicationProvider  {...eva} theme={eva.light}>
    <App/>
  </ApplicationProvider>
);