import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from 'react-native';
import TaskItem from '../components/TaskItem';

export default function HomeScreen({ navigation }) {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); 
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);


// function to add or update a task
  const addTask = () => {
    if (task.trim()) {
      if (isEditing) {
        const updatedTasks = [...tasks];
        updatedTasks[editingIndex].text = task;
        setTasks(updatedTasks);
        setIsEditing(false);
        setEditingIndex(null);
      } else {
        setTasks([...tasks, { text: task, completed: false }]);
      }
      setTask('');
    }
  };

// function to edit a task
  const editTask = (index) => {
    setTask(tasks[index].text);
    setIsEditing(true);
    setEditingIndex(index);
  };

// function to remove a task
  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; // 'all'
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ImageBackground
      source={
        isDarkMode
          ? require('../assets/arice.jpg')
          : require('../assets/arice.jpg')
      }
      style={styles.background}
    >
      {/* Overlay for dark mode */}
      {isDarkMode && <View style={styles.darkOverlay} />}
      <View style={[styles.container, isDarkMode && styles.darkContainer]}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <Text style={[styles.title, isDarkMode && styles.darkText]}>To-Do List</Text>
        <TextInput
          style={[styles.input, isDarkMode && styles.darkInput]}
          placeholder="Add a new task"
          placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>{isEditing ? 'Save' : 'Add'}</Text>
        </TouchableOpacity>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'all' && styles.activeFilterButton]}
            onPress={() => setFilter('all')}
          >
            <Text style={styles.filterButtonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'completed' && styles.activeFilterButton]}
            onPress={() => setFilter('completed')}
          >
            <Text style={styles.filterButtonText}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'pending' && styles.activeFilterButton]}
            onPress={() => setFilter('pending')}
          >
            <Text style={styles.filterButtonText}>Pending</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredTasks}
          renderItem={({ item, index }) => (
            <TaskItem
              task={item.text}
              isCompleted={item.completed}
              onDelete={() => removeTask(index)}
              onEdit={() => editTask(index)}
              onToggleComplete={() => toggleTaskCompletion(index)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity
          style={[
            styles.darkModeButton,
            { backgroundColor: isDarkMode ? '#064F1F' : '#257a21' }, // Dynamic background color
          ]}
          onPress={toggleDarkMode}
        >
          <Text style={styles.darkModeButtonText}>
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

// style for the dark mode overlay
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.69)', 
  },

// style for the main container
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },

// style for the container in dark mode
  darkContainer: {
    backgroundColor: 'transparent',
  },

// style for the back button
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

// style for the title
  title: {
    fontSize: 49,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
    textAlign: 'center',
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#000',
    backgroundColor: '#fff',
  },
  darkInput: {
    borderColor: '#555',
    color: '#fff',
    backgroundColor: '#444',
  },

// style for the add/save button
  addButton: {
    backgroundColor: 'green',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    width: '50%',
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
  },
  activeFilterButton: {
    backgroundColor: '#007BFF',
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  darkModeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  darkModeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});