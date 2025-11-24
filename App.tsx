import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ListRenderItem,
} from 'react-native';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import Bai1 from './src/screens/Bai1';
import Bai2 from './src/screens/Bai2';
import Bai3 from './src/screens/Bai3';
import Bai4 from './src/screens/Bai4';
import Bai5 from './src/screens/Bai5';
import Bai6 from './src/screens/Bai6';
import Bai7 from './src/screens/Bai7';
import Bai8 from './src/screens/Bai8';

const { width } = Dimensions.get('window');

export type RootStackParamList = {
  Menu: undefined;
  Bai1: undefined;
  Bai2: undefined;
  Bai3: undefined;
  Bai4: undefined;
  Bai5: undefined;
  Bai6: undefined;
  Bai7: undefined;
  Bai8: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface ExerciseItem {
  id: keyof RootStackParamList;
  title: string;
  sub: string;
  color: string;
  component: React.FC<any>;
}

const EXERCISES: ExerciseItem[] = [
  { id: 'Bai1', title: 'Danh Sách Sinh Viên', sub: '', color: '#4834d4', component: Bai1 },
  { id: 'Bai2', title: 'Đăng Nhập', sub: '', color: '#6ab04c', component: Bai2 },
  { id: 'Bai3', title: 'Đồng Hồ', sub: '', color: '#eb4d4b', component: Bai3 },
  { id: 'Bai4', title: 'To-Do List', sub: '', color: '#f0932b', component: Bai4 },
  { id: 'Bai5', title: 'Gallery Ảnh', sub: '', color: '#0984e3', component: Bai5 },
  { id: 'Bai6', title: 'Thời Tiết', sub: '', color: '#22a6b3', component: Bai6 },
  { id: 'Bai7', title: 'Navigation', sub: '', color: '#be2edd', component: Bai7 },
  { id: 'Bai8', title: 'Tin Tức', sub: '', color: '#30336b', component: Bai8 },
];

type MenuProps = NativeStackScreenProps<RootStackParamList, 'Menu'>;

const MenuScreen: React.FC<MenuProps> = ({ navigation }) => {

  const renderItem: ListRenderItem<ExerciseItem> = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate(item.id)}
      activeOpacity={0.9}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardId}>#{item.id}</Text>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSub}>{item.sub}</Text>
      </View>
      <View style={styles.decorativeCircle} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#130f40" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>React Native TSX</Text>
        <Text style={styles.headerSub}>Tổng hợp 8 bài tập (TypeScript)</Text>
      </View>

      <FlatList
        data={EXERCISES}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="Menu" component={MenuScreen} />

        {EXERCISES.map((ex) => (
          <Stack.Screen
            key={ex.id}
            name={ex.id}
            component={ex.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#dff9fb' },
  header: {
    backgroundColor: '#130f40',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    elevation: 10,
  },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#fff' },
  headerSub: { color: '#bdc3c7', marginTop: 5, fontSize: 16 },
  listContent: { paddingHorizontal: 15, paddingBottom: 50 },
  row: { justifyContent: 'space-between' },
  card: {
    width: (width - 45) / 2,
    height: 160,
    borderRadius: 20,
    marginBottom: 15,
    padding: 15,
    justifyContent: 'center',
    overflow: 'hidden',
    elevation: 5,
  },
  cardContent: { zIndex: 10 },
  cardId: { color: 'rgba(255,255,255,0.6)', fontWeight: 'bold', marginBottom: 5 },
  cardTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  cardSub: { color: 'rgba(255,255,255,0.9)', fontSize: 13 },
  decorativeCircle: {
    position: 'absolute',
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    bottom: -20, right: -20,
  },
});
