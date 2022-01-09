import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NativeBaseProvider, Box } from 'native-base';



export default function App() {
  return (
    <NativeBaseProvider>
      <Box style={styles.container}>
        <Text>Great - now we're off</Text>
        <StatusBar style="auto" />
      </Box>
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
