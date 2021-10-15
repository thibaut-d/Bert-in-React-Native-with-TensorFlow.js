import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [bert, setBert] = useState<any>()
  const [text, setText] = useState<string>()
  const [result, setResult] = useState<any>()

  return (
    <SafeAreaView style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <TextInput
        multiline
        numberOfLines={4}
        style={styles.input}
        onChangeText={(value: string) => setText(value)}
        value={text}
        placeholder="Enter a sentence there"
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
