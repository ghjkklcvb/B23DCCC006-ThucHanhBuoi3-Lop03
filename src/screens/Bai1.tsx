import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform
} from 'react-native';

// 1. Định nghĩa kiểu dữ liệu cho Sinh viên
interface Student {
  id: string;
  name: string;
  age: number;
  className: string;
  avatarColor: string;
}

// 2. Hàm random màu sắc avatar
const getRandomColor = () => {
  const colors = ['#e55039', '#4a69bd', '#60a3bc', '#78e08f', '#f6b93b', '#b71540', '#0c2461'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function Bai1Screen() {

  // Tạo dữ liệu giả lập 20 sinh viên
  const students: Student[] = useMemo(() => {
    const list: Student[] = [];
    const firstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Đặng', 'Bùi'];
    const middleNames = ['Văn', 'Thị', 'Đức', 'Ngọc', 'Minh', 'Hữu'];
    const lastNames = ['An', 'Bình', 'Cường', 'Dũng', 'Giang', 'Hương', 'Khánh', 'Lan', 'Minh', 'Nam'];

    for (let i = 1; i <= 20; i++) {
      const randomName = `${firstNames[i % firstNames.length]} ${middleNames[i % middleNames.length]} ${lastNames[i % lastNames.length]}`;
      list.push({
        id: i.toString(),
        name: randomName,
        age: Math.floor(Math.random() * (25 - 18 + 1)) + 18, // Random tuổi 18-25
        className: `CP173${(i % 5) + 1}`, // Random lớp
        avatarColor: getRandomColor(),
      });
    }
    return list;
  }, []);

  // Xử lý sự kiện nhấn vào Item -> Alert tên
  const handlePressItem = (name: string) => {
    Alert.alert('Thông tin sinh viên', `Bạn vừa chọn sinh viên:\n${name}`);
  };

  // Render từng dòng (Item)
  const renderItem = ({ item }: { item: Student }) => {
    // Lấy chữ cái đầu của tên để làm Avatar
    const firstLetter = item.name.trim().split(' ').pop()?.charAt(0).toUpperCase() || '?';

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        activeOpacity={0.7}
        onPress={() => handlePressItem(item.name)}
      >
        {/* Avatar bên trái */}
        <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
          <Text style={styles.avatarText}>{firstLetter}</Text>
        </View>

        {/* Thông tin bên phải */}
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
          <View style={styles.rowDetail}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.age} tuổi</Text>
            </View>
            <Text style={styles.classText}>Lớp: {item.className}</Text>
          </View>
        </View>

        {/* Icon mũi tên giả lập */}
        <Text style={styles.arrowIcon}>›</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar để màu nền sáng, chữ tối */}
      <StatusBar barStyle="dark-content" backgroundColor="#f5f6fa" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Danh Sách Lớp Học</Text>
        <Text style={styles.headerSubtitle}>Bài tập 1: FlatList & Alert</Text>
      </View>

      {/* Danh sách FlatList */}
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    marginBottom: 10,
    // Shadow cho header
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    alignItems: 'center',
    // Shadow nhẹ cho từng item
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 6,
  },
  rowDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 10,
  },
  badgeText: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  classText: {
    fontSize: 13,
    color: '#95a5a6',
  },
  arrowIcon: {
    fontSize: 24,
    color: '#bdc3c7',
    marginLeft: 10,
    fontWeight: '300',
    marginBottom: 4,
  },
});