import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const CustomRecipesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { recipe } = route.params || {};

  const favoriteRecipes = useSelector((state) => state.favorites.favoriteRecipes);
  const isFavorite = favoriteRecipes.some((fav) => 
    fav.idFood === recipe?.idFood || fav.title === recipe?.title
  );

  const handleToggleFavorite = () => {
    if (recipe) {
      const recipeWithId = { ...recipe, idFood: recipe.idFood || `custom_${Date.now()}` };
      dispatch(toggleFavorite(recipeWithId));
    }
  };

  if (!recipe) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No Recipe Details Available</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View testID="imageContainer" style={styles.imageContainer}>
        <Image
          source={{ uri: recipe.image || "https://via.placeholder.com/400x300" }}
          style={[styles.articleImage, { height: hp(35) }]}
        />
      </View>

      <View testID="topButtonsContainer" style={styles.topButtonsContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>← GoBack</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.favoriteButton} onPress={handleToggleFavorite}>
          <Text style={styles.favoriteIcon}>{isFavorite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      <View testID="contentContainer" style={styles.contentContainer}>
        <Text style={styles.title}>{recipe.title || "Untitled Recipe"}</Text>
        
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <Text style={styles.contentText}>
          {recipe.ingredients || "No ingredients listed"}
        </Text>

        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.contentText}>
          {recipe.instructions || "No instructions provided"}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: hp(2.5),
    color: "#666",
    marginBottom: 20,
  },
  backText: {
    fontSize: hp(2.2),
    color: "#FBBF24",
    fontWeight: "600",
  },
  imageContainer: {
    width: "100%",
    backgroundColor: "#f0f0f0",
  },
  articleImage: {
    width: "100%",
    resizeMode: "cover",
  },
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(5),
    marginTop: hp(2),
    marginBottom: hp(1),
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
  contentContainer: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
  },
  title: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#333",
    marginBottom: hp(1.5),
  },
  sectionTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#333",
    marginTop: hp(2),
    marginBottom: hp(0.5),
  },
  contentText: {
    fontSize: hp(2),
    color: "#555",
    lineHeight: hp(2.8),
    marginBottom: hp(1),
  },
});

export default CustomRecipesScreen;
