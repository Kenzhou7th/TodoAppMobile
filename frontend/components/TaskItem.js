import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements'; 

export default function TaskItem({ task, isCompleted, onDelete, onEdit, onToggleComplete }) {
  return (
    <View style={styles.taskContainer}>
      <CheckBox
        checked={isCompleted}
        onPress={onToggleComplete}
        containerStyle={styles.checkboxContainer}
      />
      <Text style={[styles.taskText, isCompleted && styles.completedTaskText]}>{task}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  checkboxContainer: {
    margin: 0,
    padding: 0,
  },

// style for the task text
  taskText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },

// style for the button container
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },

// style for the Edit button
  editButton: {
    backgroundColor: '#FFA500',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

// style for the Delete button
  deleteButton: {
    backgroundColor: '#FF6347',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});