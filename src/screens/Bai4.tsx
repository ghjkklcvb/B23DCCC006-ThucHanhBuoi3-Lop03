import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Alert,
  StatusBar,
  Modal,
  LayoutAnimation,
  Platform,
  UIManager,
  KeyboardAvoidingView,
  ActivityIndicator 
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const [isDataReady, setIsDataReady] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@my_tasks');
        if (jsonValue != null) {
          setTaskList(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error("Lỗi khi load dữ liệu:", e);
      } finally {
        setIsDataReady(true);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    if (isDataReady) {
      const saveTasks = async () => {
        try {
          await AsyncStorage.setItem('@my_tasks', JSON.stringify(taskList));
        } catch (e) {
          console.error("Lỗi khi lưu dữ liệu:", e);
        }
      };
      saveTasks();
    }
  }, [taskList, isDataReady]);

  const handleAddTask = () => {
    if (task.trim().length === 0) {
      Alert.alert('Cảnh báo', 'Nội dung không được để trống!');
      return;
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newTask = {
      id: Math.random().toString(),
      title: task,
      isCompleted: false,
      date: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setTaskList([newTask, ...taskList]);
    setTask('');
    Keyboard.dismiss();
  };

  const handleDeleteTask = (id) => {
    Alert.alert('Xác nhận', 'Bạn muốn xóa công việc này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          setTaskList(taskList.filter((item) => item.id !== id));
        }
      }
    ]);
  };

  const handleToggleComplete = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const updatedList = taskList.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTaskList(updatedList);
  };

  const openEditModal = (item) => {
    setEditingTask(item);
    setEditText(item.title);
    setModalVisible(true);
  };

  const handleUpdateTask = () => {
    if (editText.trim().length === 0) return;

    const updatedList = taskList.map((item) =>
      item.id === editingTask.id ? { ...item, title: editText } : item
    );

    setTaskList(updatedList);
    setModalVisible(false);
    setEditingTask(null);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.card, item.isCompleted && styles.cardCompleted]}>
      <TouchableOpacity
        style={styles.checkButton}
        onPress={() => handleToggleComplete(item.id)}
      >
        <Text style={styles.checkIcon}>{item.isCompleted ? '✅' : '⬜'}</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={[styles.itemText, item.isCompleted && styles.textCompleted]}>
          {item.title}
        </Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => openEditModal(item)}
        >
          <Text style={styles.actionIcon}>✏️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleDeleteTask(item.id)}
        >
          <Text style={styles.actionIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (!isDataReady) {
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <ActivityIndicator size="large" color="#2980B9" />
        <Text style={{marginTop: 10, color: '#7F8C8D'}}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2C3E50" />

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Xin chào,</Text>
          <Text style={styles.headerTitle}>My Tasks 🎯</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {taskList.filter(t => !t.isCompleted).length}
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <FlatList
          data={taskList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyEmoji}>📝</Text>
              <Text style={styles.emptyText}>Danh sách trống</Text>
              <Text style={styles.emptySub}>Thêm việc mới để bắt đầu ngày hiệu quả!</Text>
            </View>
          }
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder="Nhập công việc mới..."
          placeholderTextColor="#95A5A6"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addText}>＋</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chỉnh sửa công việc</Text>
            <TextInput
              style={styles.modalInput}
              value={editText}
              onChangeText={setEditText}
              autoFocus={true}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.btnCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.btnTextCancel}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.btnSave]}
                onPress={handleUpdateTask}
              >
                <Text style={styles.btnTextSave}>Lưu thay đổi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
  },
  header: {
    backgroundColor: '#2C3E50',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 100,
  },
  greeting: {
    color: '#BDC3C7',
    fontSize: 14,
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ECF0F1',
  },
  countBadge: {
    backgroundColor: '#E74C3C',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  countText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  cardCompleted: {
    backgroundColor: '#F2F4F6',
    opacity: 0.8,
  },
  checkButton: {
    padding: 5,
    marginRight: 10,
  },
  checkIcon: {
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '600',
    marginBottom: 4,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#95A5A6',
  },
  dateText: {
    fontSize: 12,
    color: '#95A5A6',
  },
  actionRow: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  iconButton: {
    padding: 8,
    marginLeft: 5,
    backgroundColor: '#F7F9F9',
    borderRadius: 8,
  },
  actionIcon: {
    fontSize: 16,
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: 60,
    borderRadius: 30,
    paddingHorizontal: 25,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    marginRight: 15,
    color: '#2C3E50',
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: '#2980B9',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2980B9',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  addText: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: '300',
    marginTop: -2,
  },
  emptyBox: {
    alignItems: 'center',
    marginTop: 80,
    opacity: 0.6,
  },
  emptyEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7F8C8D',
  },
  emptySub: {
    fontSize: 14,
    color: '#95A5A6',
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#BDC3C7',
    fontSize: 18,
    paddingVertical: 10,
    marginBottom: 25,
    color: '#2C3E50',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  btnCancel: {
    backgroundColor: '#ECF0F1',
  },
  btnSave: {
    backgroundColor: '#2980B9',
  },
  btnTextCancel: {
    color: '#7F8C8D',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnTextSave: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
