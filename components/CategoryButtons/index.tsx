import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CategoryButtonsProps {
  onCategoryPress: (category: string) => void;
  selectedCategory: string | null;
}

const categories = [
  { id: 'restaurant', name: 'Ресторани', icon: 'restaurant' },
  { id: 'hotel', name: 'Готелі', icon: 'bed' },
  { id: 'hospital', name: 'Лікарні', icon: 'medical' },
  { id: 'shop', name: 'Магазини', icon: 'bag' },
  { id: 'entertainment', name: 'Розваги', icon: 'game-controller' },
];

export default function CategoryButtons({ onCategoryPress, selectedCategory }: CategoryButtonsProps) {
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.button,
            selectedCategory === category.id && styles.selectedButton
          ]}
          onPress={() => onCategoryPress(category.id)}
        >
          <Ionicons
            name={category.icon as any}
            size={24}
            color={selectedCategory === category.id ? '#fff' : '#333'}
          />
          <Text style={[
            styles.buttonText,
            selectedCategory === category.id && styles.selectedButtonText
          ]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1000,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 10,
    marginTop: 4,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedButtonText: {
    color: '#fff',
  },
}); 