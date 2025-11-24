import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Vibration,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  const [inputSeconds, setInputSeconds] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      Vibration.vibrate([500, 500, 500]);
      Alert.alert("Time's up", "Hết giờ rồi!");
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    const seconds = parseInt(inputSeconds);
    if (isNaN(seconds) || seconds <= 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập số giây hợp lệ');
      return;
    }
    setTimeLeft(seconds);
    setIsRunning(true);
    Keyboard.dismiss();
  };

  const handleStop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTimeLeft(0);
    setInputSeconds('');
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

        <View style={styles.decorationCircle1} />
        <View style={styles.decorationCircle2} />

        <Text style={styles.title}>TIMER</Text>

        <View style={styles.timerCircle}>
          <View style={styles.timerInnerCircle}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập số giây..."
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            value={inputSeconds}
            onChangeText={setInputSeconds}
            editable={!isRunning}
          />
        </View>

        <View style={styles.buttonContainer}>
          {!isRunning ? (
            <TouchableOpacity style={[styles.button, styles.btnStart]} onPress={handleStart}>
              <Text style={styles.btnText}>START</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.button, styles.btnStop]} onPress={handleStop}>
              <Text style={styles.btnText}>STOP</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.button, styles.btnReset]} onPress={handleReset}>
            <Text style={[styles.btnText, styles.txtReset]}>RESET</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  decorationCircle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#3b82f6',
    top: -50,
    left: -100,
    opacity: 0.1,
  },
  decorationCircle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ec4899',
    bottom: 50,
    right: -50,
    opacity: 0.1,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#e2e8f0',
    marginBottom: 40,
    letterSpacing: 4,
  },
  timerCircle: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  timerInnerCircle: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    borderWidth: 2,
    borderColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
  },
  timerText: {
    fontSize: 60,
    fontWeight: '700',
    color: '#ffffff',
    fontVariant: ['tabular-nums'],
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#1e293b',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  btnStart: {
    backgroundColor: '#3b82f6',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  btnStop: {
    backgroundColor: '#ef4444',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  btnReset: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#475569',
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  txtReset: {
    color: '#94a3b8',
  },
});