import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(() => {
      ring1padding.value = withSpring(ring1padding.value + hp(5));
    }, 100);
    setTimeout(() => {
      ring2padding.value = withSpring(ring2padding.value + hp(5.5));
    }, 300);
    setTimeout(() => {
      navigation.navigate("Home");
    }, 2500);
  }, []);

  const ring1Style = useAnimatedStyle(() => {
    return {
      padding: ring1padding.value,
    };
  });

  const ring2Style = useAnimatedStyle(() => {
    return {
      padding: ring2padding.value,
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={[styles.ring, ring1Style]}>
        <Animated.View style={[styles.ring, ring2Style]}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
        </Animated.View>
      </Animated.View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Foodie!</Text>
        <Text style={styles.subtitle}>your food recipe app</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBBF24",
    justifyContent: "center",
    alignItems: "center",
  },
  ring: {
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  logo: {
    width: hp(20),
    height: hp(20),
    resizeMode: "contain",
  },
  textContainer: {
    alignItems: "center",
    marginTop: hp(5),
  },
  title: {
    fontSize: hp(8),
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: hp(2.5),
    color: "#fff",
    letterSpacing: 1,
    marginTop: hp(0.5),
  },
});

export default WelcomeScreen;