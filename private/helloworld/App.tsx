/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {AuthProvider, useAuth} from './AuthContext';
import LoginScreen from './LoginScreen';

function HomeScreen(): React.ReactNode {
  const {user, logout} = useAuth();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Text style={styles.title}>Hello, {user}!</Text>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={logout}
            testID="logout-button">
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function RootNavigator(): React.ReactNode {
  const {isAuthenticated} = useAuth();
  return isAuthenticated ? <HomeScreen /> : <LoginScreen />;
}

function App(): React.ReactNode {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
