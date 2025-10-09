import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, TextInput, View, StatusBar as RNStatusBar, FlatList, Button } from 'react-native';
import IOSButton from '../../components/IOSButton'
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { JosefinSans_400Regular } from '@expo-google-fonts/josefin-sans';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo } from '../../features/todos/todosSlice';
import { RootState } from '@/store/store';

const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

type TodoType = {
  id: string,
  title: string
}

export default function HomeScreen() {

  const [inputValue, setInputValue] = useState("")
  // const [todos, setTodos] = useState<TodoType[]>([])

  const todos = useSelector((state: RootState) => state.todos.todos)
  const dispatch = useDispatch()

  const [loaded, error] = useFonts({
    JosefinSans_400Regular
  })

  const handleAddTodo = () => {
    if (!inputValue.trim()) return;
    dispatch(addTodo({
      id: generateId(),
      title: inputValue
    }))
    setInputValue("")
  }

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id))
  }

  return (<FlatList
  data={todos}
  keyExtractor={item => item.id}
  renderItem={({ item, index }) => (
    <Item
      id={item.id}
      title={item.title}
      isLast={index === todos.length - 1}
      onDelete={handleDeleteTodo}
    />
  )}
  ListHeaderComponent={
    <>
      <View style={styles.headerImageContainer}>
        <Image
          source={require("../../assets/images/Bitmap.png")}
          style={styles.reactLogo}
        />
        <View style={styles.overlayContent}>
          <Image
            source={require("../../assets/images/TODO 2.png")}
            contentFit="contain"
            style={styles.todoImage}
          />
          <Ionicons name="moon" size={24} color="white" />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={v => setInputValue(v)}
          placeholder="Create a new todo..."
        />
        {Platform.OS === "ios" ? (
          <IOSButton title="IOS Button Create Todo" onPress={handleAddTodo} />
        ) : (
          <View style={styles.createButton}>
            <Button title="Create Todo" color="#f9c2ff" onPress={handleAddTodo} />
          </View>
        )}
      </View>
    </>
  }
/>

);
}

interface ItemProps {
  title: string,
  id: string,
  isLast: boolean,
  onDelete: (id: string) => void
}

const Item = ({ title, id, isLast, onDelete }: ItemProps) => (
  <View style={[
    styles.item,
    isLast && styles.itemLast,
  ]}>
    <Text style={styles.title}>{title}</Text>
    <EvilIcons name='close' size={32} onPress={() => onDelete(id)} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0ff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 40
  },
  input: {
    height: 48,
    borderRadius: 5,
    paddingHorizontal: 24,
    color: "black",
    backgroundColor: "#f1e1e1ff",
    fontFamily: "JosefinSans_400Regular",
  },
  item: {
    backgroundColor: '#dabfbfff',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#979797",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5
  },
  itemLast: {
    borderBottomWidth: 0,
  },
  title: {
    fontSize: 16,
    fontFamily: "JosefinSans_400Regular",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
  },
  createButton: {
    marginTop: 20,
    margin: "auto",
    borderRadius: 5,
    width: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  reactLogo: {
    height: 210,
    width: 415,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  headerImageContainer: {
    height: 178,
    width: '100%',
    position: 'relative',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 70
  },

  overlayContent: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  todoImage: {
    height: 40,
    width: 120,
    resizeMode: 'contain',
  },
});
