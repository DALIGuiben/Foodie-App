import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const Categories = ({ categories, activeCategory, handleChangeCategory }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const isActive = category.strCategory === activeCategory;
          return (
            <TouchableOpacity
              key={category.idCategory}
              style={[styles.categoryItem, isActive && styles.activeCategory]}
              onPress={() => handleChangeCategory(category.strCategory)}
            >
              <View style={[styles.imageContainer, isActive && styles.activeImageContainer]}>
                <Image
                  source={{ uri: category.strCategoryThumb }}
                  style={styles.categoryImage}
                />
              </View>
              <Text style={[styles.categoryName, isActive && styles.activeText]}>
                {category.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(1),
  },
  scrollContent: {
    paddingHorizontal: wp(3),
    gap: wp(2),
  },
  categoryItem: {
    alignItems: "center",
    marginHorizontal: wp(1.5),
  },
  imageContainer: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(9),
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
  },
  activeImageContainer: {
    borderColor: "#FBBF24",
    borderWidth: 3,
  },
  categoryImage: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
    resizeMode: "cover",
  },
  categoryName: {
    fontSize: hp(1.6),
    color: "#666",
    marginTop: hp(0.5),
    textAlign: "center",
  },
  activeText: {
    color: "#FBBF24",
    fontWeight: "bold",
  },
  activeCategory: {
    opacity: 1,
  },
});

export default Categories;