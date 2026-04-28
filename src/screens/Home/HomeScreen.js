import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const posts = [
  { id: '1', content: 'First post!', likes: 10, comments: 2 },
  { id: '2', content: 'Hello World!', likes: 5, comments: 1 },
  { id: '3', content: 'React Native is awesome!', likes: 20, comments: 3 },
];

const HomeScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.postContainer}> 
      <Text style={styles.postContent}>{item.content}</Text>
      <Text style={styles.postLikes}>Likes: {item.likes}</Text>
      <Text style={styles.postComments}>Comments: {item.comments}</Text>
    </View>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  postContainer: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  postContent: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postLikes: {
    color: 'gray',
  },
  postComments: {
    color: 'gray',
  },
});

export default HomeScreen;