import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const RecipeDetailScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const recipe = props.route.params;
  const favoriteRecipes = useSelector((state) => state.favorites.favoriteRecipes);
  const isFavorite = favoriteRecipes.some((fav) => fav.idFood === recipe.idFood);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View testID="imageContainer" style={styles.imageContainer}>
        <Image
          source={{ uri: recipe.recipeImage }}
          style={styles.recipeImage}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>← Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}
        >
          <Text style={styles.favoriteIcon}>{isFavorite ? "❤️" : "🤍"}</Text>
        </TouchableOpacity>
      </View>

      <View testID="recipeTitle" style={styles.titleContainer}>
        <Text style={styles.recipeTitle}>{recipe.recipeName}</Text>
      </View>

      <View testID="recipeCategory" style={styles.categoryContainer}>
        <Text style={styles.categoryText}>Category: {recipe.category}</Text>
      </View>

      <View testID="miscContainer" style={styles.miscContainer}>
        <View style={styles.miscItem}>
          <Text style={styles.miscLabel}>⏱️</Text>
          <Text style={styles.miscValue}>{recipe.prepTime}</Text>
        </View>
        <View style={styles.miscItem}>
          <Text style={styles.miscLabel}>🍽️</Text>
          <Text style={styles.miscValue}>{recipe.servings} servings</Text>
        </View>
        <View style={styles.miscItem}>
          <Text style={styles.miscLabel}>🔥</Text>
          <Text style={styles.miscValue}>{recipe.calories} cal</Text>
        </View>
        <View style={styles.miscItem}>
          <Text style={styles.miscLabel}>📊</Text>
          <Text style={styles.miscValue}>{recipe.difficulty}</Text>
        </View>
      </View>

      <View testID="sectionContainer" style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
          <View testID="ingredientsList" key={index} style={styles.ingredientItem}>
            <Text style={styles.ingredientText}>• {ingredient}</Text>
          </View>
        ))}
      </View>

      <View testID="sectionContainer" style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructionsText}>{recipe.recipeInstructions}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: wp(100),
    height: hp(40),
    backgroundColor: "#f0f0f0",
  },
  recipeImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(5),
    marginTop: hp(2),
  },
  backButton: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: 8,
  },
  favoriteButton: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: 8,
  },
  buttonText: {
    fontSize: hp(2),
    color: "#333",
  },
  favoriteIcon: {
    fontSize: hp(3),
  },
  titleContainer: {
    paddingHorizontal: wp(5),
    marginTop: hp(2),
  },
  recipeTitle: {
    fontSize: hp(3.5),
    fontWeight: "bold",
    color: "#333",
  },
  categoryContainer: {
    paddingHorizontal: wp(5),
    marginTop: hp(0.5),
  },
  categoryText: {
    fontSize: hp(2),
    color: "#666",
  },
  miscContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: wp(5),
    marginTop: hp(2),
    paddingVertical: hp(1.5),
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    marginHorizontal: wp(5),
  },
  miscItem: {
    alignItems: "center",
  },
  miscLabel: {
    fontSize: hp(2.5),
  },
  miscValue: {
    fontSize: hp(1.5),
    color: "#666",
    marginTop: hp(0.3),
  },
  sectionContainer: {
    paddingHorizontal: wp(5),
    marginTop: hp(2.5),
    marginBottom: hp(1),
  },
  sectionTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#333",
    marginBottom: hp(1),
  },
  ingredientItem: {
    paddingVertical: hp(0.5),
  },
  ingredientText: {
    fontSize: hp(2),
    color: "#555",
  },
  instructionsText: {
    fontSize: hp(2),
    color: "#555",
    lineHeight: hp(3),
  },
});

export default RecipeDetailScreen;