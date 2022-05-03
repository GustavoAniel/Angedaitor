import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Container, NativeBaseProvider } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Menu from './src/pages/Menu/Index';
import Cadastro_Plano from './src/pages/Lembrete/Cadastro';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='light'/>
      <Stack.Navigator  screenOptions={{headerShown: false}}>
        <Stack.Screen name='Inicio' component={Menu}/>
        <Stack.Screen name='Cadastro_Plano' component={Cadastro_Plano}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

