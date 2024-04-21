import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<{ firstName: string; lastName: string; username: string; password: string }[]>([]);
  const [tasks, setTasks] = useState<{ task: string; percentage: number }[]>([]);
  const [taskInput, setTaskInput] = useState('');
  const [percentageInputs, setPercentageInputs] = useState<string[]>(Array(tasks.length).fill(''));

  const handleLogin = () => {
    const user = users.find((user) => user.username === username);
    if (user) {
      if (user.password === password) {
        setIsLoggedIn(true);
      } else {
        Alert.alert('Error', 'Invalid password');
      }
    } else {
      Alert.alert('Error', 'User not found');
    }
  };

  const handleSignUp = () => {
    if (firstName.trim() === '' || lastName.trim() === '' || username.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields');
    } else {
      setUsers([...users, { firstName, lastName, username, password }]);
      setIsSignUp(false);
    }
  };

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { task: taskInput, percentage: 0 }]);
      setPercentageInputs([...percentageInputs, '']);
      setTaskInput('');
    }
  };

  const deleteTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    const updatedPercentages = [...percentageInputs];
    updatedPercentages.splice(index, 1);
    setPercentageInputs(updatedPercentages);
  };

  const editPercentage = (index: number, percentage: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].percentage = parseInt(percentage);
    setTasks(updatedTasks);
    const updatedPercentages = [...percentageInputs];
    updatedPercentages[index] = percentage;
    setPercentageInputs(updatedPercentages);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn && !isSignUp) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          title="Login"
          onPress={handleLogin}
          disabled={!username.trim() || !password.trim()}
          color="#007AFF"
        />
        <Text style={styles.switchText}>Don't have an account?</Text>
        <Button
          title="Sign Up"
          onPress={() => setIsSignUp(true)}
          color="#4CD964"
        />
      </View>
    );
  }

  if (!isLoggedIn && isSignUp) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          title="Sign Up"
          onPress={handleSignUp}
          color="#4CD964"
        />
        <Text style={styles.switchText}>Already have an account?</Text>
        <Button
          title="Back to Login"
          onPress={() => setIsSignUp(false)}
          color="#007AFF"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TASK EASE</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={taskInput}
        onChangeText={(text) => setTaskInput(text)}
      />
      <Button
        title="Add Task"
        onPress={addTask}
        color="#007AFF"
      />
      <FlatList
        style={styles.list}
        data={tasks}
        renderItem={({ item, index }) => (
          <View style={styles.task}>
            <Text>{item.task}</Text>
            <TextInput
              style={styles.percentageInput}
              placeholder="0"
              keyboardType="numeric"
              value={percentageInputs[index]}
              onChangeText={(text) => {
                const updatedPercentages = [...percentageInputs];
                updatedPercentages[index] = text;
                setPercentageInputs(updatedPercentages);
              }}
              onBlur={() => editPercentage(index, percentageInputs[index])}
            />
            <Button
              title="Delete"
              onPress={() => deleteTask(index)}
              color="#FF3B30"
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        title="Log out"
        onPress={() => setIsLoggedIn(false)}
        color="#007AFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007AFF',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#333333',
  },
  list: {
    width: '100%',
    marginTop: 20,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#F0F0F0',
  },
  percentageInput: {
    width: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    textAlign: 'center',
    color: '#333333',
  },
  switchText: {
    marginTop: 10,
    marginBottom: 10,
    color: '#666666',
  },
});

export default App;
