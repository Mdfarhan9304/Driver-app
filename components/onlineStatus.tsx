import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { rh } from '../utils/responsive';

interface OnlineStatusCardProps {
  isOnline?: boolean;
  onToggle?: (isOnline: boolean) => void;
  onlineText?: string;
  offlineText?: string;
}

const OnlineStatusCard: React.FC<OnlineStatusCardProps> = ({ 
  isOnline: initialOnline = true,
  onToggle,
  onlineText = "You are Online",
  offlineText = "You are Offline"
}) => {
  const [isOnline, setIsOnline] = useState(initialOnline);
  const [toggleAnim] = useState(new Animated.Value(initialOnline ? 1 : 0));

  const handleToggle = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    
    Animated.timing(toggleAnim, {
      toValue: newStatus ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    
    onToggle?.(newStatus);
  };

  const toggleTranslateX = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const toggleBackgroundColor = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E5E7EB', '#10B981'],
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.statusText, { color: isOnline ? '#000000' : '#6B7280' }]}>
        {isOnline ? onlineText : offlineText}
      </Text>
      
      <TouchableOpacity 
        style={styles.toggleContainer} 
        onPress={handleToggle}
        activeOpacity={0.8}
      >
        <Animated.View 
          style={[
            styles.toggleTrack, 
            { backgroundColor: toggleBackgroundColor }
          ]}
        >
          <Animated.View 
            style={[
              styles.toggleThumb,
              { transform: [{ translateX: toggleTranslateX }] }
            ]}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: rh(3.5),
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginHorizontal: 20,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  toggleContainer: {
    padding: 4,
  },
  toggleTrack: {
    width: 50,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    position: 'relative',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    position: 'absolute',
  },
});

export default OnlineStatusCard;