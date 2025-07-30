import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { rh, rw, rs } from '../utils/responsive'

const Button = ({
  title,
  onPress,
  disabled
}: {
  title: string,
  onPress: () => void,
  disabled?: boolean
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>
          {title || "Button"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: rh(12),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignSelf: "center",
    backgroundColor: '#FFFFFF',
    borderRadius: rw(4),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 10,
  },
  button: {
    backgroundColor: '#F3E545',
    padding: rw(3),
    width: rw(92),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: rh(2),
    borderRadius: rw(2),
  },
  buttonText: {
    fontFamily: "General-Sans-Bold",
    fontWeight: "600",
    fontSize: rs(4),
    color: "#000",
  },
  buttonDisabled: {
    backgroundColor: '#E0E0E0',
    opacity: 0.7,
  },
  buttonTextDisabled: {
    color: '#808080',
  }
})