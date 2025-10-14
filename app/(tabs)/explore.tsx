import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import type { BarcodeScanningResult } from 'expo-camera';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addTodo } from '../../features/todos/todosSlice';
import { useNavigation } from '@react-navigation/native';
import { FA5Style } from '@expo/vector-icons/build/FontAwesome5';

const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

type TodoType = {
  id: string,
  title: string
}

const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [hasScanned, setHasScanned] = useState(false);

  const navigation = useNavigation();
  const todos = useSelector((state: RootState) => state.todos.todos)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      if (!permission) {
        await requestPermission();
      }
    })();
  }, [permission]);

  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
  if (hasScanned) return;

  const { data } = result;

  setScannedData(data);
  setHasScanned(true);

  dispatch(addTodo({
    id: generateId(),
    title: data
  }));

  setHasScanned(false)

  

  // Подожди чуть-чуть (например, 500 мс), чтобы UI не дернулся, и навигируй
  // setTimeout(() => {
  //   navigation.navigate('TodoList'); // Название маршрута из твоего навигатора
  // }, 500);
};

  if (!permission || !permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Требуется разрешение на камеру</Text>
        <TouchableOpacity onPress={() => requestPermission()}>
          <Text>Запросить разрешение</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.preview}
        facing="back"
        // onCameraReady={() => setIsCameraReady(true)}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],  // можно указать другие типы, если нужно
        }}
        onBarcodeScanned={handleBarcodeScanned}
      />
      <View style={styles.controls}>
        <Text style={styles.scannedText}>
          {scannedData ? `Scanned: ${scannedData}` : 'Ничего не сканировано'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  preview: { flex: 1 },
  controls: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  scannedText: {
    color: 'white',
    marginTop: 10,
  },
});

export default CameraScreen;
