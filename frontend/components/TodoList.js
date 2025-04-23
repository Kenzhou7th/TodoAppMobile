import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getTasks } from './api/api'; // Import your API functions

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskData = await getTasks();
        setTasks(taskData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Todo List</Text>
      {tasks.map(task => (
        <Text key={task.id}>{task.title}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8FF', // Light lavender
  },
  button: {
    backgroundColor: '#FFC0CB', // Lighter pink for cuteness
    borderRadius: 15, 
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFC0CB', // Default pink background
  },
  activeFilterButton: {
    backgroundColor: '#FF69B4', // Highlighted pink for active filter
  },
  filterButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default TodoList;