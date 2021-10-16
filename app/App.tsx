import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

// Get the model
const modelJson = require('./model/model.json');
const m1 = require('./model/group1-shard1of5.bin');
const m2 = require('./model/group1-shard2of5.bin');
const m3 = require('./model/group1-shard3of5.bin');
const m4 = require('./model/group1-shard4of5.bin');
const m5 = require('./model/group1-shard5of5.bin');

export default function App() {

  // Green lights
  const [backendInfo,setBackendInfo] = useState<string>()
  const [resultReady,setResultReady] = useState<boolean>(false)

  // Data stored in state
  const [bert, setBert] = useState<any>()
  const [text, setText] = useState<string>()
  const [result, setResult] = useState<any>()

  // Await TensorFlow to be ready and update the state
  useEffect(() => {
    const load = async () => {
      try {
        await tf.ready()
        setBackendInfo(JSON.stringify(tf.getBackend()))
        console.log("TensorFlow is ready with backend :",backendInfo)
        const model = await tf.loadLayersModel(bundleResourceIO(modelJson, [m1,m2,m3,m4,m5]))
        setBert(model)
        console.log("Model is ready: ", model)
      }
      catch (error) {
        // Debug
        console.error(error)
      }
    }
    load()
  },[])

  /**
   * Function that does the inference on the text
   */ 
  const predict = async () => {
    if (text) {
    setResultReady(false)
    try {
      const textTensor = tf.tensor1d([text])
      const prediction = await bert.predict(textTensor)
      if (prediction) {
        setResult(prediction)
        setResultReady(true)
        }
      } catch (error) {
        // Debug
        console.error(error)
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        multiline
        numberOfLines={4}
        style={styles.input}
        onChangeText={(value: string) => setText(value)}
        value={text}
        placeholder="Enter a sentence there"
      />
      <StatusBar style="auto" />
      <Button
        onPress={predict}
        title="Predict"
        color="#841584"
        accessibilityLabel="Get predictions from the text"
        disabled = {!!bert && !!text}
      />
      <View style={styles.resultBox}>
        {result ?
          <Text style={styles.result}>
            {result.toString()}
          </Text>
         : 
          <Text style={styles.noResult}>
            Type some text and press "Predict"
          </Text>
        }
      </View>
      <View style={styles.status}>
        <Text style={styles.statusText}>TensorFlow : {backendInfo? "ready" : "not ready"}</Text>
        <Text style={styles.statusText}>Backend: {backendInfo || "not ready"}</Text>
        <Text style={styles.statusText}>Bert: {bert? "ready" : "not ready"}</Text>
        <Text style={styles.statusText}>Prediction: {resultReady? "ready" : "not ready"}</Text>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
    padding:20,
  },
  input: {
    borderWidth: 1,
    marginBottom:20,
    padding: 10,
  },
  resultBox: {
    margin: 12,
    padding: 10,
  },
  result: {
    color: 'blue'
  },
  noResult: {
    color: 'grey'
  },
  status: {
    margin: 12,
    padding: 10,
  },
  statusText: {
    color: 'grey',
    fontSize: 10,
  }

})
