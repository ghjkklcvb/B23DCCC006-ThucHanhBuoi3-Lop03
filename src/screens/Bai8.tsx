import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  Keyboard,
  SafeAreaView,
  Platform, 
} from 'react-native';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function Bai8() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const fetchArticles = async (pageNum: number, query: string = '', isRefresh: boolean = false) => {
    if (loading) return;
    setLoading(true);

    try {
      let url = '';
      if (query.length > 0) {
        url = `${API_URL}?q=${query}`;
      } else {
        url = `${API_URL}?_page=${pageNum}&_limit=10`;
      }

      const response = await fetch(url);
      const json = await response.json();

      const dataWithImages = json.map((item: any) => ({
        ...item,
        image: `https://picsum.photos/600/400?random=${item.id}`,
        author: 'Admin',
        time: '2 giờ trước'
      }));

      if (isRefresh || query.length > 0) {
        setData(dataWithImages);
      } else {
        setData(prev => [...prev, ...dataWithImages]);
      }

      if (json.length < 10) setHasMore(false);
      else setHasMore(true);

    } catch (error) {
      console.error('Lỗi:', error);
    } finally {
      setLoading(false);
      setRefreshing(false); 
    }
  };

  useEffect(() => {
    fetchArticles(1, '');
  }, []);

  const handleSearch = () => {
    Keyboard.dismiss();
    setPage(1);
    fetchArticles(1, searchText, true);
  };

  const handleRefresh = () => {
    setRefreshing(true); 
    setPage(1);
    setSearchText('');
    fetchArticles(1, '', true);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore && searchText === '') {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchArticles(nextPage, '');
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.cardPreview} numberOfLines={3}>{item.body} {item.body}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardAuthor}>✍️ {item.author}</Text>
          <Text style={styles.cardTime}>🕒 {item.time}</Text>
        </View>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return <View style={{height: 20}} />; 
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color="#6c5ce7" />
        <Text style={{ marginLeft: 10, color: '#636e72' }}>Đang tải thêm...</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Tin Tức 24h 📰</Text>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm bài viết..."
            placeholderTextColor="#a4b0be"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchBtn}>
            <Text style={{ fontSize: 20 }}>🔍</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toString() + index}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}

        refreshControl={
          <RefreshControl
            refreshing={refreshing}     
            onRefresh={handleRefresh}   
            colors={['#6c5ce7']}        
            tintColor="#6c5ce7"         
            title="Đang tải lại..."   
          />
        }

        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Text style={{ fontSize: 50 }}>📭</Text>
              <Text style={{ color: '#636e72', marginTop: 10 }}>Không có bài viết nào</Text>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f2f6',
  },
  headerContainer: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 30) + 20 : 60,
    paddingBottom: 15,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    zIndex: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28, 
    fontWeight: '800',
    color: '#2d3436',
    marginBottom: 15,
    textAlign: 'center' 
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#f1f2f6',
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#dfe6e9'
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2d3436',
  },
  searchBtn: {
    padding: 5,
  },

  listContent: {
    padding: 20,
    paddingTop: 20, 
  },
  
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#dfe6e9',
  },
  cardBody: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  cardPreview: {
    fontSize: 14,
    color: '#636e72',
    lineHeight: 22,
    marginBottom: 15,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f1f2f6',
    paddingTop: 10,
  },
  cardAuthor: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6c5ce7',
  },
  cardTime: {
    fontSize: 12,
    color: '#b2bec3',
  },
});
