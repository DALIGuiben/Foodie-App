import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const FavoriteScreen = () => {
  const navigation = useNavigation();
  const favoriteRecipesList = useSelector((state) => state.favorites.favoriteRecipes);

  if (favoriteRecipesList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite recipes yet!</Text>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <Text style={styles.goBackText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Favorite Recipes</Text>
      
      <View testID="favoriteRecipes" style={styles.listContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Go Back</Text>
        </TouchableOpacity>

        <FlatList
          data={favoriteRecipesList}
          keyExtractor={(item) => item.idFood}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recipeCard}
              onPress={() => navigation.navigate("RecipeDetail", item)}
            >
              <Image source={{ uri: item.recipeImage }} style={styles.recipeImage} />
              <Text style={styles.recipeName} numberOfLines={2}>
                {item.recipeName}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: hp(5),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyText: {
    fontSize: hp(3),
    color: "#666",
    marginBottom: hp(2),
  },
  goBackButton: {
    backgroundColor: "#FBBF24",
    paddingHorizontal: wp(8),
    paddingVertical: hp(1.5),
    borderRadius: 10,
  },
  goBackText: {
    fontSize: hp(2),
    color: "#fff",
    fontWeight: "600",
  },
  heading: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: hp(2),
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: wp(3),
  },
  backButton: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: 8,
    marginBottom: hp(2),
    alignSelf: "flex-start",
  },
  backButtonText: {
    fontSize: hp(2),
    color: "#333",
  },
  flatListContainer: {
    paddingBottom: hp(2),
  },
  recipeCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: hp(1.5),
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recipeImage: {
    width: "100%",
    height: hp(20),
    resizeMode: "cover",
  },
  recipeName: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#333",
    padding: wp(3),
  },
});

export default FavoriteScreen;