import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const MyRecipeScreen = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      const storedRecipes = await AsyncStorage.getItem("customrecipes");
      if (storedRecipes) {
        setRecipes(JSON.parse(storedRecipes));
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching recipes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleRecipeClick = (recipe) => {
    navigation.navigate("CustomRecipesScreen", { recipe });
  };

  const handleAddRecipe = () => {
    navigation.navigate("RecipesFormScreen");
  };

  const deleteRecipe = async (index) => {
    try {
      const updatedRecipes = [...recipes];
      updatedRecipes.splice(index, 1);
      await AsyncStorage.setItem("customrecipes", JSON.stringify(updatedRecipes));
      setRecipes(updatedRecipes);
    } catch (error) {
      console.log("Error deleting recipe:", error);
    }
  };

  const editRecipe = (recipe, index) => {
    navigation.navigate("RecipesFormScreen", {
      recipeToEdit: recipe,
      recipeIndex: index,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FBBF24" />
        <Text style={styles.loadingText}>Loading recipes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Recipes</Text>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddRecipe}>
          <Text style={styles.addBtnText}>+ Add New</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.recipeList}>
        {recipes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No recipes yet!</Text>
            <Text style={styles.emptySubText}>Tap "Add New" to create your first recipe</Text>
          </View>
        ) : (
          recipes.map((recipe, index) => (
            <View key={index} style={styles.recipeCard}>
              <TouchableOpacity
                testID="handleRecipeBtn"
                style={styles.recipeContent}
                onPress={() => handleRecipeClick(recipe)}
              >
                {recipe.image && (
                  <Image
                    source={{ uri: recipe.image }}
                    style={styles.recipeImage}
                  />
                )}
                <View style={styles.recipeInfo}>
                  <Text style={styles.recipeTitle}>{recipe.title}</Text>
                  <Text testID="recipeDescp" style={styles.recipeDescription}>
                    {recipe.description
                      ? recipe.description.substring(0, 50) + "..."
                      : "No description"}
                  </Text>
                </View>
              </TouchableOpacity>

              <View testID="editDeleteButtons" style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.editBtn]}
                  onPress={() => editRecipe(recipe, index)}
                >
                  <Text style={styles.actionBtnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.deleteBtn]}
                  onPress={() => deleteRecipe(index)}
                >
                  <Text style={styles.actionBtnText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: hp(2),
    fontSize: hp(2),
    color: "#666",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    backgroundColor: "#FBBF24",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backBtn: {
    paddingHorizontal: wp(2),
  },
  backBtnText: {
    fontSize: hp(2.2),
    color: "#333",
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: hp(2.8),
    fontWeight: "bold",
    color: "#333",
  },
  addBtn: {
    backgroundColor: "#333",
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.8),
    borderRadius: 8,
  },
  addBtnText: {
    color: "#fff",
    fontSize: hp(1.8),
    fontWeight: "600",
  },
  recipeList: {
    flex: 1,
    paddingHorizontal: wp(3),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(15),
  },
  emptyText: {
    fontSize: hp(3),
    color: "#666",
    fontWeight: "bold",
  },
  emptySubText: {
    fontSize: hp(2),
    color: "#999",
    marginTop: hp(1),
  },
  recipeCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: hp(1.5),
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  recipeContent: {
    flexDirection: "row",
    padding: wp(2),
  },
  recipeImage: {
    width: wp(25),
    height: wp(20),
    borderRadius: 8,
    resizeMode: "cover",
  },
  recipeInfo: {
    flex: 1,
    marginLeft: wp(3),
    justifyContent: "center",
  },
  recipeTitle: {
    fontSize: hp(2.2),
    fontWeight: "bold",
    color: "#333",
  },
  recipeDescription: {
    fontSize: hp(1.8),
    color: "#666",
    marginTop: hp(0.3),
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: wp(3),
    paddingBottom: hp(1),
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: hp(1),
  },
  actionBtn: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.6),
    borderRadius: 6,
    marginLeft: wp(2),
  },
  editBtn: {
    backgroundColor: "#4CAF50",
  },
  deleteBtn: {
    backgroundColor: "#f44336",
  },
  actionBtnText: {
    color: "#fff",
    fontSize: hp(1.8),
    fontWeight: "600",
  },
});

export default MyRecipeScreen;