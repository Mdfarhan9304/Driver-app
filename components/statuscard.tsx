import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { rh } from '../utils/responsive';

interface StatsCardsProps {
  earnings?: string;
  duration?: string;
}

const StatsCards: React.FC<StatsCardsProps> = ({ 
  earnings = '₹ 310', 
  duration = '6:15 mins' 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardValue}>{earnings}</Text>
        <Text style={styles.cardLabel}>Today's earning</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardValue}>{duration}</Text>
        <Text style={styles.cardLabel}>Login duration</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 20,
    marginTop: rh(3),
  },
  card: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FFD700',
    padding: 20,
    minHeight: 80,
    justifyContent: 'center',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '400',
  },
});

export default StatsCards;