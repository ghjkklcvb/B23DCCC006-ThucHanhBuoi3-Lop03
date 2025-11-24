import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  StatusBar,
  SafeAreaView,
  Platform,
  ListRenderItemInfo,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type RootStackParamList = {
  Bai5: undefined;
};

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

interface PhotoItem {
  id: string;
  url: string;
}

const MOCK_PHOTOS: PhotoItem[] = Array.from({ length: 30 }).map((_, index) => ({
  id: index.toString(),
  url: `https://picsum.photos/600/600?random=${index + 100}`,
}));

const COLUMN_COUNT = 3;
const IMAGE_GAP = 4; 
const GRID_IMAGE_SIZE = (windowWidth - (IMAGE_GAP * (COLUMN_COUNT + 1))) / COLUMN_COUNT;

type Props = NativeStackScreenProps<RootStackParamList, 'Bai5'>;

const Bai5: React.FC<Props> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const modalFlatListRef = useRef<FlatList<PhotoItem>>(null);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setSelectedImageIndex(viewableItems[0].index);
    }
  }).current;

  const renderGridItem = ({ item, index }: ListRenderItemInfo<PhotoItem>) => {
    const marginLeft = IMAGE_GAP;
    const marginBottom = IMAGE_GAP;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => openModal(index)}
        style={[
          styles.gridItemContainer,
          { marginLeft, marginBottom, width: GRID_IMAGE_SIZE, height: GRID_IMAGE_SIZE }
        ]}
      >
        <Image
          source={{ uri: item.url }}
          style={styles.gridImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  const renderFullScreenItem = ({ item }: ListRenderItemInfo<PhotoItem>) => {
    return (
      <View style={styles.fullScreenItemContainer}>
        <Image
          source={{ uri: item.url }}
          style={styles.fullScreenImage}
          resizeMode="contain"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} // Tăng vùng bấm
          >
            <Text style={styles.backButtonIcon}>‹</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.headerTitle}>Bộ sưu tập</Text>
            <Text style={styles.headerSubtitle}>{MOCK_PHOTOS.length} bức ảnh</Text>
          </View>

          <View style={styles.backButton} />
        </View>
      </SafeAreaView>

      <FlatList
        data={MOCK_PHOTOS}
        renderItem={renderGridItem}
        keyExtractor={(item) => item.id}
        numColumns={COLUMN_COUNT}
        contentContainerStyle={{ paddingTop: IMAGE_GAP }} 
        showsVerticalScrollIndicator={false}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        statusBarTranslucent={true} 
      >
        <View style={styles.modalContainer}>
          <SafeAreaView style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </SafeAreaView>

          <FlatList
            ref={modalFlatListRef}
            data={MOCK_PHOTOS}
            renderItem={renderFullScreenItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={selectedImageIndex}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}

            getItemLayout={(data, index) => ({
              length: windowWidth,
              offset: windowWidth * index,
              index,
            })}
          />

          <View style={styles.footerIndicator}>
            <Text style={styles.indicatorText}>
              {selectedImageIndex + 1} / {MOCK_PHOTOS.length}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Bai5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA', 
  },
  headerSafeArea: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    height: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backButtonIcon: {
    fontSize: 40,
    color: '#2C3E50',
    marginTop: -5, 
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },

  gridItemContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0', 
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: '#000', 
  },
  modalHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 10, 
  },
  closeButton: {
    backgroundColor: 'rgba(255,255,255,0.2)', 
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fullScreenItemContainer: {
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: windowWidth,
    height: windowHeight,
  },

  footerIndicator: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  indicatorText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
