import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
// LƯU Ý: Không cần NavigationContainer nữa vì App tổng đã lo rồi
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// --- Màn hình 1: HOME ---
function HomeScreen() {
  return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#4834d4" />
      <View style={styles.headerHome}>
        <Text style={styles.headerTitle}>Trang Chủ</Text>
        <Text style={styles.headerSub}>Chào mừng bạn đến với app</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔥 Tin Nổi Bật</Text>
          <Text style={styles.cardContent}>React Native cập nhật phiên bản mới với hiệu suất tăng 30%.</Text>
        </View>
        <View style={[styles.card, { backgroundColor: '#badc58' }]}>
          <Text style={[styles.cardTitle, { color: '#2c3e50' }]}>📈 Thống kê</Text>
          <Text style={[styles.cardContent, { color: '#2c3e50' }]}>Bạn đã hoàn thành 8/10 bài tập tuần này.</Text>
        </View>
        <View style={[styles.card, { backgroundColor: '#ff7979' }]}>
          <Text style={styles.cardTitle}>🔔 Thông báo</Text>
          <Text style={styles.cardContent}>Đừng quên nộp bài tập Tab Navigation nhé.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

// --- Màn hình 2: SEARCH ---
function SearchScreen() {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.searchHeader}>
        <Text style={styles.pageTitle}>Tìm Kiếm</Text>
        <View style={styles.searchBar}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/54/54481.png' }}
            style={styles.searchIconInput}
          />
          <TextInput
            style={styles.input}
            placeholder="Nhập từ khóa..."
            placeholderTextColor="#95a5a6"
          />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Tìm kiếm gần đây</Text>
        <View style={styles.tagContainer}>
          {['React Native', 'Javascript', 'Flexbox', 'Animation', 'Expo'].map((tag, index) => (
            <TouchableOpacity key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

// --- Màn hình 3: SETTINGS ---
function SettingsScreen() {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400' }}
          style={styles.avatar}
        />
        <Text style={styles.profileName}>Nguyễn Văn A</Text>
        <Text style={styles.profileRole}>Mobile Developer</Text>
      </View>

      <View style={styles.settingsList}>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>👤  Tài khoản</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>🔔  Thông báo</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>🌙  Giao diện tối</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>🔒  Đổi mật khẩu</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.settingItem, { borderBottomWidth: 0 }]}>
          <Text style={[styles.settingText, { color: '#eb4d4b' }]}>🚪  Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- Cấu hình TAB BAR ---
const Tab = createBottomTabNavigator();

// Đổi tên thành Bai9 và XÓA NavigationContainer bao ngoài
export default function Bai9() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Ẩn header mặc định
        tabBarShowLabel: false, // Ẩn chữ bên dưới icon
        tabBarStyle: styles.tabBar, // Style tùy chỉnh cho thanh Tab

        // Cấu hình Icon cho từng Tab
        tabBarIcon: ({ focused, color, size }) => {
          let iconUrl;

          if (route.name === 'Home') {
            iconUrl = focused
              ? 'https://cdn-icons-png.flaticon.com/512/1946/1946436.png' // Home đậm
              : 'https://cdn-icons-png.flaticon.com/512/1946/1946488.png'; // Home nhạt
          } else if (route.name === 'Search') {
            iconUrl = focused
              ? 'https://cdn-icons-png.flaticon.com/512/2811/2811806.png'
              : 'https://cdn-icons-png.flaticon.com/512/2811/2811765.png';
          } else if (route.name === 'Settings') {
            iconUrl = focused
              ? 'https://cdn-icons-png.flaticon.com/512/2099/2099058.png'
              : 'https://cdn-icons-png.flaticon.com/512/2099/2099192.png';
          }

          return (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
              <Image
                source={{ uri: iconUrl }}
                style={{ width: 24, height: 24, tintColor: focused ? '#fff' : '#747d8c' }}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  // Style chung
  screenContainer: {
    flex: 1,
    backgroundColor: '#f1f2f6',
  },

  // Tab Bar Custom (Floating Style)
  tabBar: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 5,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    height: 70,
    borderTopWidth: 0,
    // Shadow cho iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  iconContainerFocused: {
    backgroundColor: '#4834d4', // Màu nền khi active
    marginTop: -20, // Hiệu ứng nổi lên
    shadowColor: '#4834d4',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },

  // Home Styles
  headerHome: {
    backgroundColor: '#4834d4',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  headerSub: { color: '#dff9fb', marginTop: 5 },
  scrollContent: { padding: 20, paddingBottom: 100 },
  card: {
    backgroundColor: '#686de0',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  cardContent: { color: '#fff', lineHeight: 22 },

  // Search Styles
  searchHeader: { padding: 20, paddingTop: 50, backgroundColor: '#fff' },
  pageTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#2f3542' },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f1f2f6',
    borderRadius: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    height: 50,
  },
  searchIconInput: { width: 20, height: 20, tintColor: '#a4b0be', marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: '#2f3542' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#57606f', marginBottom: 15 },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  tag: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ced6e0',
  },
  tagText: { color: '#2f3542' },

  // Settings Styles
  profileHeader: { alignItems: 'center', marginTop: 60, marginBottom: 30 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  profileName: { fontSize: 22, fontWeight: 'bold', color: '#2f3542' },
  profileRole: { color: '#a4b0be', marginTop: 5 },
  settingsList: { backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 20, padding: 10 },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
  },
  settingText: { fontSize: 16, color: '#2f3542', fontWeight: '500' },
  arrow: { color: '#a4b0be', fontSize: 18, fontWeight: 'bold' },
});