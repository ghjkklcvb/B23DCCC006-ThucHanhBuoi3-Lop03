import React, { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  Image
} from 'react-native';

const getRandomColor = () => {
  const colors = ['#6c5ce7', '#00b894', '#0984e3', '#e17055', '#fdcb6e', '#e84393', '#00cec9'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function Bai1Screen() {

  const students = useMemo(() => {
    const list = [];
    const firstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Đặng', 'Bùi'];
    const middleNames = ['Văn', 'Thị', 'Đức', 'Ngọc', 'Minh', 'Hữu', 'Phương'];
    const lastNames = ['An', 'Bình', 'Cường', 'Dũng', 'Giang', 'Hương', 'Linh', 'Tâm', 'Vy'];

    for (let i = 1; i <= 20; i++) {
      const randomName = `${firstNames[i % firstNames.length]} ${middleNames[i % middleNames.length]} ${lastNames[i % lastNames.length]}`;
      list.push({
        id: i.toString(),
        name: randomName,
        age: Math.floor(Math.random() * (25 - 18 + 1)) + 18,
        className: `CP173${(i % 5) + 1}`,
        avatarColor: getRandomColor(),
      });
    }
    return list;
  }, []);

  const handlePressItem = (name) => {
    Alert.alert('Thông tin sinh viên', `Bạn vừa chọn sinh viên:\n${name}`);
  };

  const renderItem = ({ item }) => {
    const firstLetter = item.name.trim().split(' ').pop().charAt(0).toUpperCase();

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        activeOpacity={0.7}
        onPress={() => handlePressItem(item.name)}
      >
        <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
          <Text style={styles.avatarText}>{firstLetter}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{item.name}</Text>

          <View style={styles.detailsRow}>
            <View style={styles.classBadge}>
              <Text style={styles.classText}>{item.className}</Text>
            </View>
            <View style={styles.separator} />
            <Text style={styles.ageText}>{item.age} tuổi</Text>
          </View>
        </View>

        <View style={styles.iconContainer}>
            <Image
                source={{uri: 'https://cdn-icons-png.flaticon.com/512/271/271228.png'}}
                style={styles.arrowIcon}
            />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fd" />

      <View style={styles.header}>
        <View>
            <Text style={styles.headerTitle}>Danh Sách Lớp</Text>
            <Text style={styles.headerSubtitle}>Tổng số: 20 sinh viên</Text>
        </View>
        <View style={styles.headerIconBg}>
            <Image
                source={{uri: 'https://cdn-icons-png.flaticon.com/512/2995/2995620.png'}}
                style={{width: 24, height: 24, tintColor: '#4834d4'}}
            />
        </View>
      </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fd',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2d3436',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#636e72',
    marginTop: 4,
    fontWeight: '500',
  },
  headerIconBg: {
      width: 45,
      height: 45,
      backgroundColor: '#f1f2f6',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center'
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#6c5ce7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 6,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  classBadge: {
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  classText: {
    fontSize: 12,
    color: '#2d3436',
    fontWeight: '600',
  },
  separator: {
      width: 1,
      height: 12,
      backgroundColor: '#b2bec3',
      marginHorizontal: 10
  },
  ageText: {
    fontSize: 13,
    color: '#636e72',
    fontWeight: '500',
  },
  iconContainer: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f6fa',
      borderRadius: 15
  },
  arrowIcon: {
      width: 12,
      height: 12,
      tintColor: '#a4b0be'
  },
});
