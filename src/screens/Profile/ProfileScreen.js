import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProfileScreen = () => {
    const followersCount = 120; // Example followers count
    const followingCount = 80; // Example following count

    const handleLogout = () => {
        // Add logout functionality here
        console.log('User logged out');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>User Profile</Text>
            <View style={styles.statsContainer}>
                <Text style={styles.stat}>Followers: {followersCount}</Text>
                <Text style={styles.stat}>Following: {followingCount}</Text>
            </View>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    statsContainer: {
        marginVertical: 20,
    },
    stat: {
        fontSize: 18,
    },
});

export default ProfileScreen;