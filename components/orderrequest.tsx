import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const DeliveryEarningsScreen = () => {
  // Mock JSON data - replace with your dynamic data later
  const deliveryData = {
    earnings: 310,
    currency: '₹',
    isPaid: true,
    deliveries: [
      {
        id: 1,
        name: 'Miglani Restaurant',
        address: '123, Anything Street, Your City, n...',
        distance: '0.5 km',
        status: 'pickup', // pickup or dropoff
      },
      {
        id: 2,
        name: 'India Gate',
        address: '123, Anything Street, Your City, n...',
        distance: '4.2 km',
        status: 'dropoff',
      },
    ],
  };

  const handleAccept = () => {
    console.log('Order accepted');
    // Add your accept logic here
  };

  const handleReject = () => {
    console.log('Order rejected');
    // Add your reject logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Earnings Section */}
        <View style={styles.earningsSection}>
          <Text style={styles.earningsLabel}>Earnings</Text>
          <View style={styles.earningsRow}>
            <Text style={styles.earningsAmount}>
              {deliveryData.currency} {deliveryData.earnings}
            </Text>
            <View style={styles.paidBadge}>
              <Text style={styles.paidText}>Paid</Text>
            </View>
          </View>
        </View>

        {/* Delivery Route */}
        <View style={styles.deliverySection}>
          {deliveryData.deliveries.map((delivery, index) => (
            <View key={delivery.id} style={styles.deliveryItem}>
              <View style={styles.deliveryRow}>
                <View style={styles.locationInfo}>
                  <View
                    style={[
                      styles.locationDot,
                      delivery.status === 'pickup'
                        ? styles.pickupDot
                        : styles.dropoffDot,
                    ]}
                  />
                  <View style={styles.locationDetails}>
                    <Text style={styles.locationName}>{delivery.name}</Text>
                    <Text style={styles.locationAddress}>{delivery.address}</Text>
                  </View>
                </View>
                <Text style={styles.distance}>{delivery.distance}</Text>
              </View>
              
              {/* Connection line between locations */}
              {index < deliveryData.deliveries.length - 1 && (
                <View style={styles.connectionLine} />
              )}
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:20,
    backgroundColor: '#FFFFFF',
    paddingVertical:5,
    paddingHorizontal:25,
    borderRadius:20
  },
  content: {
    flex: 1,
    padding: 10,
  },
  earningsSection: {
    marginBottom: 10,
  },
  earningsLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  earningsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  earningsAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  paidBadge: {
    backgroundColor: '#d4edda',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  paidText: {
    color: '#155724',
    fontSize: 14,
    fontWeight: '500',
  },
  deliverySection: {
    flex: 1,
    marginBottom: 20,
  },
  deliveryItem: {
    position: 'relative',
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 15,
  },
  pickupDot: {
    backgroundColor: '#28a745',
  },
  dropoffDot: {
    backgroundColor: '#dc3545',
  },
  locationDetails: {
    flex: 1,
  },
  locationName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
  },
  distance: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  // connectionLine: {
  //   position: 'absolute',
  //   left: 5,
  //   top: 27,
  //   width: 2,
  //   height: 40,
  //   backgroundColor: '#ffc107',
  // },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#e9ecef',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  rejectText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  acceptText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

export default DeliveryEarningsScreen;