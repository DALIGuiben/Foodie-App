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
  const isFavorite = favoriteRecipes.some((fav) => fav.idFood === recipe?.idFood);

  const handleToggleFavorite = () => {
    if (recipe) {
      dispatch(toggleFavorite(recipe));
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
          style={styles.articleImage}
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
        <Text style={styles.contentText