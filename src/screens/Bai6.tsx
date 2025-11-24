// src/screens/Bai6.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Keyboard,
  Alert,
  StatusBar,
} from 'react-native';

// --- HÀM 1: Lấy tọa độ từ tên thành phố ---
const getCoordinates = (cityName: string) => {
  const city = cityName.toLowerCase().trim();
  switch (city) {
    case 'hanoi':
    case 'ha noi':
    case 'hà nội':
      return { lat: 21.0285, lon: 105.8542, name: 'Hà Nội' };
    case 'hcm':
    case 'ho chi minh':
    case 'hồ chí minh':
    case 'saigon':
    case 'sài gòn':
      return { lat: 10.8231, lon: 106.6297, name: 'TP. Hồ Chí Minh' };
    case 'danang':
    case 'da nang':
    case 'đà nẵng':
      return { lat: 16.0544, lon: 108.2022, name: 'Đà Nẵng' };
    case 'haiphong':
    case 'hai phong':
    case 'hải phòng':
        return { lat: 20.8561, lon: 106.6822, name: 'Hải Phòng' };
    case 'cantho':
    case 'can tho':
    case 'cần thơ':
        return { lat: 10.0452, lon: 105.7469, name: 'Cần Thơ' };
    default:
      return null;
  }
};

// --- HÀM 2: Dịch mã code thời tiết sang tiếng Việt & Icon ---
// Tham khảo mã WMO Weather code
const getWeatherDescription = (code: number) => {
  if (code === 0) return { label: 'Trời quang đãng', icon: '☀️' };
  if (code >= 1 && code <= 3) return { label: 'Có mây', icon: '⛅' };
  if (code >= 45 && code <= 48) return { label: 'Có sương mù', icon: '🌫️' };
  if (code >= 51 && code <= 55) return { label: 'Mưa phùn', icon: '🌦️' };
  if (code >= 61 && code <= 65) return { label: 'Mưa rào', icon: '🌧️' };
  if (code >= 80 && code <= 82) return { label: 'Mưa lớn', icon: '⛈️' };
  if (code >= 95) return { label: 'Dông bão', icon: '🌩️' };
  return { label: 'Không xác định', icon: '🌡️' };
};

export default function Bai6() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchWeather = async () => {
    if (city.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập tên thành phố (vd: Hanoi, HCM...)');
      return;
    }

    Keyboard.dismiss();
    setLoading(true);
    setError('');
    setWeatherData(null);

    // 1. Tìm tọa độ
    const location = getCoordinates(city);

    if (!location) {
      setLoading(false);
      setError('Chưa hỗ trợ thành phố này. Hãy thử: Hanoi, HCM, Da Nang, Can Tho...');
      return;
    }

    try {
      // 2. Gọi API (Thầy thêm weather_code vào URL)
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code`
      );

      const data = await response.json();

      if (data.error) throw new Error('Lỗi từ server');

      // 3. Xử lý dữ liệu trả về
      const code = data.current.weather_code;
      const status = getWeatherDescription(code); // Dịch mã số sang chữ

      setWeatherData({
        cityName: location.name,
        temp: data.current.temperature_2m,
        wind: data.current.wind_speed_10m,
        humid: data.current.relative_humidity_2m,
        desc: status.label, // Mô tả (vd: Có mây)
        icon: status.icon,   // Icon (vd: ⛅)
      });

    } catch (err) {
      setError('Lỗi kết nối mạng hoặc server quá tải.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/564x/e7/12/32/e71232da1667d7162e086208bf53c893.jpg' }}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <View style={styles.overlay}>
        <Text style={styles.headerTitle}>Weather App ⛅</Text>

        {/* INPUT */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên TP (Hanoi, HCM...)"
            placeholderTextColor="#ddd"
            value={city}
            onChangeText={setCity}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleFetchWeather}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* RESULT */}
        <View style={styles.resultContainer}>
          {loading ? (
            <View style={styles.centerBox}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>Đang cập nhật thời tiết...</Text>
            </View>
          ) : error ? (
            <View style={styles.centerBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
            </View>
          ) : weatherData ? (
            <View style={styles.weatherCard}>
              <Text style={styles.cityText}>{weatherData.cityName}</Text>

              {/* Hiển thị Icon và Mô tả thời tiết */}
              <Text style={styles.weatherIcon}>{weatherData.icon}</Text>
              <Text style={styles.weatherDesc}>{weatherData.desc}</Text>

              <Text style={styles.tempText}>{weatherData.temp}°C</Text>

              <View style={styles.divider} />

              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Gió 💨</Text>
                  <Text style={styles.detailValue}>{weatherData.wind} km/h</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Độ ẩm 💧</Text>
                  <Text style={styles.detailValue}>{weatherData.humid || 70}%</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.centerBox}>
              <Text style={styles.guideText}>Hãy nhập tên thành phố để xem</Text>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  input: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontSize: 16,
  },
  searchButton: {
    padding: 10,
  },
  searchIcon: {
    fontSize: 20,
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
  },
  centerBox: {
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 8,
  },
  guideText: {
    color: '#ddd',
    fontSize: 16,
    fontStyle: 'italic',
  },

  // WEATHER CARD
  weatherCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  cityText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
  },
  weatherIcon: {
    fontSize: 60,
    marginTop: 10,
  },
  weatherDesc: {
    fontSize: 20,
    color: '#FFD700', // Màu vàng gold cho nổi bật
    fontWeight: '500',
    marginBottom: 10,
    textTransform: 'capitalize'
  },
  tempText: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#fff',
  },
  divider: {
    width: '50%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginVertical: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    color: '#ddd',
    fontSize: 14,
    marginBottom: 5,
  },
  detailValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});