import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 1. Kiểm tra nếu bỏ trống
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Lỗi Đăng Nhập', 'Vui lòng nhập đầy đủ Username và Password!');
      return;
    }

    // 2. Nếu hợp lệ -> Hiện popup thành công
    // Ở đây em có thể thêm logic kiểm tra đúng sai mật khẩu sau này
    Alert.alert('Thông báo', 'Đăng nhập thành công! 🎉');
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1e3c72" />

        {/* Các hình tròn trang trí nền */}
        <View style={styles.bgCircle1} />
        <View style={styles.bgCircle2} />
        <View style={styles.bgCircle3} />

        <View style={styles.contentContainer}>
          <Text style={styles.headerTitle}>Welcome Back</Text>
          <Text style={styles.subHeader}>Đăng nhập vào hệ thống</Text>

          <View style={styles.card}>

            {/* Ô nhập Username */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập tên đăng nhập"
                placeholderTextColor="#A0A0A0"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none" // Không tự động viết hoa
              />
            </View>

            {/* Ô nhập Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu"
                placeholderTextColor="#A0A0A0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true} // Ẩn ký tự mật khẩu
              />
            </View>

            {/* Nút Login */}
            <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
              <Text style={styles.txtLogin}>LOGIN</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3c72',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  // --- Các style trang trí nền (giữ nguyên cho đẹp) ---
  bgCircle1: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#2a5298',
    top: -100,
    left: -100,
    opacity: 0.5,
  },
  bgCircle2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#2a5298',
    bottom: -50,
    right: -50,
    opacity: 0.4,
  },
  bgCircle3: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ffffff',
    top: 100,
    right: 30,
    opacity: 0.1,
  },
  // --- Style nội dung chính ---
  contentContainer: {
    width: width,
    paddingHorizontal: 25,
    alignItems: 'center',
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 5,
    letterSpacing: 1,
  },
  subHeader: {
    fontSize: 16,
    color: '#dbeafe',
    marginBottom: 40,
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    width: '100%',
    backgroundColor: '#F3F6FA',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2c3e50',
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },
  btnLogin: {
    marginTop: 10,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e3c72',
    shadowColor: '#1e3c72',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  txtLogin: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
});