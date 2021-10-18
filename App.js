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

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">

          {/* Pantallas de usuario */}
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

          {/* Componentes */}
          <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;