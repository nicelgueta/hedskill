import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './screens';
import { useTheme } from './colors';


const config = {
  // dependencies: {
  //   'linear-gradient': require('react-native-linear-gradient').default,
  // },
};


export default function App() {
  const theme = useTheme();
  return (
    <NativeBaseProvider config={config} theme={theme}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
