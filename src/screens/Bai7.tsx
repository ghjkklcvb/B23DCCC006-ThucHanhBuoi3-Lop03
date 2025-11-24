import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const DATA_HOME = [
  { id: '1', title: 'React Native 0.76', content: 'Phiên bản mới cải thiện kiến trúc Bridge.', color: '#686de0' },
  { id: '2', title: 'Học Flexbox', content: 'Cách dàn trang hiệu quả trong Mobile.', color: '#badc58' },
  { id: '3', title: 'Redux Toolkit', content: 'Quản lý State chưa bao giờ dễ hơn.', color: '#ff7979' },
];

function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate('HomeDetail', { itemData: item })}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardContent}>{item.content}</Text>
      <Text style={styles.clickHint}>Chạm để xem chi tiết ➔</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#4834d4" />
      <View style={styles.headerHome}>
        <Text style={styles.headerTitle}>Trang Chủ</Text>
        <Text style={styles.headerSub}>Chọn một bài học để xem chi tiết</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.scrollContent}
        data={DATA_HOME}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

function HomeDetailScreen({ route, navigation }) {
  const { itemData } = route.params;

  return (
    <View style={[styles.screenContainer, { backgroundColor: '#fff' }]}>
      <View style={[styles.headerHome, { backgroundColor: itemData.color, paddingBottom: 20 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
          <Text style={{ color: '#fff', fontSize: 18 }}>⬅ Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{itemData.title}</Text>
      </View>

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, lineHeight: 26, color: '#2f3542' }}>
          {itemData.content}
        </Text>
        <Text style={{ marginTop: 20, fontStyle: 'italic', color: '#747d8c' }}>
          (Dữ liệu từ màn hình Home)
        </Text>
      </View>
    </View>
  );
}

function NewsScreen({ navigation }) {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.searchHeader}>
        <Text style={styles.pageTitle}>Tin Tức</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.newsItem} onPress={() => navigation.navigate('NewsDetail')}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400' }} style={styles.newsImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.newsTitle}>Công nghệ AI mới ra mắt</Text>
            <Text style={styles.newsDesc}>Bấm để đọc thêm...</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.newsItem}>
           <Image source={{ uri: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400' }} style={styles.newsImage} />
           <View style={{ flex: 1 }}>
            <Text style={styles.newsTitle}>Lập trình Mobile 2025</Text>
            <Text style={styles.newsDesc}>Xu hướng Flutter và React Native.</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function NewsDetailScreen() {
  return (
    <View style={[styles.screenContainer, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Nội dung chi tiết tin tức</Text>
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.profileHeaderCurve}>
        <Text style={styles.profileHeaderTitle}>Hồ Sơ</Text>
      </View>

      <View style={styles.profileInfoContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://cms.rhinoshield.app/public/images/IP_Icon_550x550_1_d0cc58fb01.jpg' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editIconContainer}>
             <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/84/84380.png' }} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>Đỗ Thị Phương Anh</Text>
        <Text style={styles.profileRole}>Sinh viên IT</Text>

        <View style={styles.statsContainer}>
            <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Dự án</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
                <Text style={styles.statNumber}>850</Text>
                <Text style={styles.statLabel}>Giờ học</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
                <Text style={styles.statNumber}>4.9</Text>
                <Text style={styles.statLabel}>Đánh giá</Text>
            </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.settingsContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProfileDetail')}>
          <View style={[styles.menuIconBox, { backgroundColor: '#eccc68' }]}>
             <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png' }} style={styles.menuIcon} />
          </View>
          <Text style={styles.menuText}>Thông tin cá nhân</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.menuIconBox, { backgroundColor: '#ff7f50' }]}>
             <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1827/1827349.png' }} style={styles.menuIcon} />
          </View>
          <Text style={styles.menuText}>Thông báo</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.menuIconBox, { backgroundColor: '#7bed9f' }]}>
             <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3064/3064197.png' }} style={styles.menuIcon} />
          </View>
          <Text style={styles.menuText}>Bảo mật & Mật khẩu</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.menuIconBox, { backgroundColor: '#70a1ff' }]}>
             <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/900/900797.png' }} style={styles.menuIcon} />
          </View>
          <Text style={styles.menuText}>Ngôn ngữ</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { marginTop: 20 }]}>
           <View style={[styles.menuIconBox, { backgroundColor: '#ff6b6b' }]}>
             <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828479.png' }} style={styles.menuIcon} />
          </View>
          <Text style={[styles.menuText, { color: '#ff6b6b', fontWeight: 'bold' }]}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function ProfileDetailScreen() {
    return (
        <View style={[styles.screenContainer, {padding: 20}]}>
            <Text style={styles.pageTitle}>Thông tin chi tiết</Text>
            <Text>Mã sinh viên: B23DCCC006</Text>
            <Text>Lớp: B23CQCC02-B</Text>
        </View>
    )
}

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="HomeDetail" component={HomeDetailScreen} />
    </HomeStack.Navigator>
  );
}

const NewsStack = createNativeStackNavigator();
function NewsStackScreen() {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen name="NewsMain" component={NewsScreen} options={{ headerShown: false }} />
      <NewsStack.Screen name="NewsDetail" component={NewsDetailScreen} options={{ title: 'Chi tiết tin' }} />
    </NewsStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function Bai7() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => {
          let iconUrl;
          if (route.name === 'HomeTab') {
            iconUrl = focused
              ? 'https://cdn-icons-png.flaticon.com/512/1946/1946436.png'
              : 'https://cdn-icons-png.flaticon.com/512/1946/1946488.png';
          } else if (route.name === 'NewsTab') {
            iconUrl = focused
              ? 'https://cdn-icons-png.flaticon.com/512/2965/2965879.png'
              : 'https://cdn-icons-png.flaticon.com/512/2965/2965879.png';
          } else if (route.name === 'ProfileTab') {
            iconUrl = focused
              ? 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png'
              : 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png';
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
      <Tab.Screen name="HomeTab" component={HomeStackScreen} />
      <Tab.Screen name="NewsTab" component={NewsStackScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: '#f1f2f6' },

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
    backgroundColor: '#4834d4',
    marginTop: -20,
    shadowColor: '#4834d4',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },

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
  clickHint: { color: 'rgba(255,255,255,0.8)', marginTop: 10, fontSize: 12, fontWeight: 'bold' },

  searchHeader: { padding: 20, paddingTop: 50, backgroundColor: '#fff' },
  pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#2f3542' },
  content: { padding: 20, paddingBottom: 100 },
  newsItem: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      marginBottom: 15,
      borderRadius: 10,
      overflow: 'hidden',
      padding: 10,
      alignItems: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 5
  },
  newsImage: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  newsTitle: { fontSize: 16, fontWeight: 'bold', color: '#2f3542' },
  newsDesc: { fontSize: 13, color: '#a4b0be', marginTop: 5 },

  profileHeaderCurve: {
    backgroundColor: '#4834d4',
    height: 180,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginTop: -40
  },
  profileInfoContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 5
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: '#fff',
  },
  editIconContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: '#fff',
      padding: 6,
      borderRadius: 15,
      elevation: 5
  },
  editIcon: { width: 16, height: 16, tintColor: '#2f3542' },
  profileName: { fontSize: 24, fontWeight: 'bold', color: '#2f3542', marginBottom: 5 },
  profileRole: { color: '#a4b0be', fontSize: 16, marginBottom: 20 },

  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 15,
    paddingVertical: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 20
  },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#2f3542' },
  statLabel: { fontSize: 13, color: '#a4b0be' },
  statDivider: { width: 1, height: 30, backgroundColor: '#f1f2f6' },

  settingsContainer: { paddingHorizontal: 20, paddingBottom: 120 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
  },
  menuIconBox: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 15
  },
  menuIcon: { width: 20, height: 20, tintColor: '#fff' },
  menuText: { flex: 1, fontSize: 16, color: '#2f3542', fontWeight: '500' },
  arrow: { color: '#ced6e0', fontSize: 20, fontWeight: 'bold' },
});
