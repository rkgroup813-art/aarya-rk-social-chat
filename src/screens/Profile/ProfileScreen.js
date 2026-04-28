import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Alert } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const userEmail = firebase.auth().currentUser?.email;

  // SUPER ADMIN CHECK 👑
  const isSuperAdmin = userEmail === 'rkgroup813@gmail.com';

  useEffect(() => {
    // Fetch user data from Firestore
    const unsubscribe = firebase.firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((doc) => {
        setUserData(doc.data());
      });
    return () => unsubscribe();
  }, []);

  const handleTask = () => Alert.alert("Task System", "Daily tasks: Chat for 10 mins to earn 50 Gold.");
  const handleInvitation = () => Alert.alert("Invite & Earn", "Share your code: RK" + userData?.uid?.slice(0, 5) + " to earn 100 Gold.");

  return (
    <ScrollView style={styles.container}>
      {/* HEADER / PROFILE SECTION */}
      <View style={styles.header}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImg} />
        <View>
          <Text style={styles.userName}>{userData?.name || "Rakesh Raja"}</Text>
          <Text style={styles.userHandle}>@VIP_RAJAJI</Text>
          {isSuperAdmin && <View style={styles.adminBadge}><Text style={styles.adminText}>SUPER ADMIN</Text></View>}
        </View>
      </View>

      {/* WALLET SECTION */}
      <View style={styles.walletCard}>
        <Text style={styles.walletLabel}>Wallet</Text>
        <Text style={styles.walletBalance}>💰 {userData?.gold || "1.2K"}</Text>
      </View>

      {/* ACTIVE FEATURES (GREEN MARKED) */}
      <View style={styles.menuBox}>
        <TouchableOpacity style={styles.menuItem} onPress={handleTask}>
          <Text>📝 Task</Text>
          <Text style={styles.rewardText}>Reward Available</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleInvitation}>
          <Text>✉️ Invitation</Text>
          <Text style={styles.rewardText}>Earn Gold</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AccountSecurity')}>
          <Text>🔒 Account Security</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Support')}>
          <Text>💬 Help and Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
          <Text>⚙️ Settings</Text>
        </TouchableOpacity>
      </View>

      {/* SUPER ADMIN CONTROLS 👑 */}
      {isSuperAdmin && (
        <View style={styles.adminPanel}>
          <Text style={styles.panelTitle}>Aarya RK Control Panel</Text>
          <TouchableOpacity style={styles.adminBtn} onPress={() => Alert.alert("Admin", "Managing Aarya & Users...")}>
            <Text style={styles.adminBtnText}>Manage All Users</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.adminBtn, {backgroundColor: '#ff4757'}]}>
            <Text style={styles.adminBtnText}>App Maintenance Mode</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', padding: 20, alignItems: 'center', backgroundColor: '#1e272e' },
  profileImg: { width: 80, height: 80, borderRadius: 40, marginRight: 15, borderWidth: 2, borderColor: '#ffd32a' },
  userName: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
  userHandle: { color: '#ffd32a' },
  adminBadge: { backgroundColor: '#ffd32a', paddingHorizontal: 8, borderRadius: 5, marginTop: 5 },
  adminText: { fontSize: 10, fontWeight: 'bold', color: '#000' },
  walletCard: { backgroundColor: '#fff', margin: 15, padding: 20, borderRadius: 15, elevation: 5, flexDirection: 'row', justifyContent: 'space-between' },
  walletLabel: { fontSize: 18, color: '#888' },
  walletBalance: { fontSize: 20, fontWeight: 'bold', color: '#2ed573' },
  menuBox: { backgroundColor: '#fff', marginHorizontal: 15, borderRadius: 15, padding: 10 },
  menuItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', justifyContent: 'space-between' },
  rewardText: { color: '#ff7f50', fontSize: 12 },
  adminPanel: { margin: 15, padding: 15, backgroundColor: '#2f3542', borderRadius: 15 },
  panelTitle: { color: '#fff', fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  adminBtn: { backgroundColor: '#1e90ff', padding: 12, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  adminBtnText: { color: '#fff', fontWeight: 'bold' }
});

export default ProfileScreen;
