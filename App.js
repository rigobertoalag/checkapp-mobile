import React from 'react';

//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//React Redux
import store from './src/app/store'
import { Provider } from 'react-redux'

//Components
import Login from './src/components/users/Login'
import MainPage from './src/components/MainPage'
import CheckIn from './src/components/checks/CheckIn'
import CheckOut from './src/components/checks/CheckOut'

import GetDataScreen from './src/features/getData/GetDataScreen'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="GetData">

          {/* Pantallas de usuario */}
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          {/* <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} /> */}

          {/* Componentes */}
          <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
          <Stack.Screen name="CheckIn" component={CheckIn} />
          <Stack.Screen name="CheckOut" component={CheckOut} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;