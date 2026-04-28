import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    // Sample messages for demonstration
    useEffect(() => {
        setMessages([
            { id: '1', text: 'Hello!', sender: 'user1' },
            { id: '2', text: 'Hi there!', sender: 'user2' },
        ]);
    }, []);

    const sendMessage = () => {
        if (inputText.trim()) {
            setMessages(prevMessages => [...prevMessages, { id: new Date().toISOString(), text: inputText, sender: 'me' }]);
            setInputText('');
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <Text style={item.sender === 'me' ? styles.myMessage : styles.otherMessage}>{item.text}</Text>
                )}
                keyExtractor={item => item.id}
            />
            <TextInput
                value={inputText}
                onChangeText={setInputText}
                placeholder="Type a message..."
                style={styles.input}
            />
            <Button title="Send" onPress={sendMessage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 5,
    },
    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
        padding: 10,
        borderRadius: 5,
        marginVertical: 2,
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 5,
        marginVertical: 2,
    },
});

export default ChatScreen;