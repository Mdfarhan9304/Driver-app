import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  Text,
  Dimensions,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { LocationHeader } from "../components/LocationHeader";
import { ServiceCards } from "../components/ServiceCards";
import Bannerone from "../../../assets/images/Slider/Bannerone";
import { Ionicons } from "@expo/vector-icons";
import StatsCards from "../../../components/statuscard";
import OnlineStatusCard from "../../../components/onlineStatus";
import Carousel from "../../../components/Carousel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { rh } from "../../../utils/responsive";
import { router } from "expo-router";
import OrderRequest from "../../../components/orderrequest";


const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const GRADIENT_HEIGHT = SCREEN_HEIGHT * 0.45;

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Gradient Container */}
      <LinearGradient
        colors={["#8D14CE", "#470A68"]}
        style={styles.gradientContainer}
      >
        <SafeAreaView edges={["top"]} style={styles.safeArea}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {/* Location Header in Gradient */}
            {/* <LocationHeader /> */}

            {/* Search Bar */}
          

            {/* Logo and Text */}
            <View style={styles.logoContainer}>
              <Image
                source={require("../../../assets/images/icon.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.logoText}>We're here to deliver.</Text>
            </View>

            <View style={styles.divider} />
            <StatsCards />
            <OnlineStatusCard />

            {/* Service Cards */}
            {/* <ServiceCards /> */}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>

      {/* Content below gradient */}
      <View style={styles.contentBelowGradient}>
        <Text style={styles.deliveryText}>New Orders</Text>
        <View style={styles.bottomContent}>
         <OrderRequest />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    fontFamily: "General-Sans-Regular",
    fontWeight: 600,
  },
  gradientContainer: {
    height: GRADIENT_HEIGHT,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
    color: "black",
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    height: "100%",
    fontFamily: "General-Sans-Regular",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: rh(5),
    marginBottom: 16,
  },
  logo: {
    width: 110,
    height: 32,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "300",
    fontFamily: "General-Sans-Regular",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 20,
    marginTop: 20,
  },
  contentBelowGradient: {
    marginTop: GRADIENT_HEIGHT,
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  deliveryText: {
    fontFamily: "General-Sans-Medium",
    fontSize: 20,
    textAlign: "left",
    marginTop: 20,
    marginHorizontal: 20,
    fontWeight: 600,
  },
  bottomContent: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  
   
  },
});