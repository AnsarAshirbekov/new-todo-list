import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import type { BarcodeScanningResult } from 'expo-camera';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addTodo } from '../../features/todos/todosSlice';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Vibration } from 'react-native';


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
  const [flashOn, setFlashOn] = useState(false);

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

    Vibration.vibrate(1000)

    Toast.show({
      type: 'success',
      text1: 'Отсканировано',
      text2: 'Новая задача добавлена ✅',
      position: 'bottom',
      visibilityTime: 2000,
    });

    setTimeout(() => {
      setFlashOn(false)
      navigation.goBack();
    }, 2000);

    setTimeout(() => {
      setHasScanned(false);
      setScannedData(null);
    }, 3000)
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
      {!hasScanned && (
        <CameraView
          flash='on'
          enableTorch={flashOn === true ? true : false}
          active
          style={styles.preview}
          facing="back"
          // onCameraReady={() => setIsCameraReady(true)}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],  // можно указать другие типы, если нужно
          }}
          onBarcodeScanned={handleBarcodeScanned}
        />
      )}
      <View style={styles.controls}>
        <Text style={styles.scannedText}>
          {scannedData ? `Scanned: ${scannedData}` : 'Ничего не сканировано'}
        </Text>
      </View>
      <View style={styles.flash}>
        <TouchableOpacity
          onPress={() => { flashOn === false ? setFlashOn(true) : setFlashOn(false) }}>
          <MaterialIcons name="flashlight-on" size={36} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: 25,
    backgroundColor: '#fafafa',
  },
  preview: {
    height: 500,
    borderRadius: 25

  },
  controls: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 25,
    backgroundColor: "#f1e1e1ff",
  },
  scannedText: {
    color: 'black',
    marginTop: 10,
  },
  flash: {
    marginTop: 24,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default CameraScreen;