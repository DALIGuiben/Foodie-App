import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const RecipesFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { recipeToEdit, recipeIndex } = route.params || {};

  const [title, setTitle] = useState(recipeToEdit?.title || "");
  const [image, setImage] = useState(recipeToEdit?.image || "");
  const [ingredients, setIngredients] = useState(recipeToEdit?.ingredients || "");
  const [instructions, setInstructions] = useState(recipeToEdit?.instructions || "");

  const saveRecipe = async () => {
    try {
      const newRecipe = { 
        title, 
        image, 
        ingredients, 
        instructions,
        description: `${ingredients}\n\n${instructions}` // for fallback
      };
      const storedRecipes = await AsyncStorage.getItem("customrecipes");
      let recipes = storedRecipes ? JSON.parse(storedRecipes) : [];

      if (recipeToEdit !== undefined) {
        recipes[recipeIndex] = newRecipe;
      } else {
        recipes.push(newRecipe);
      }

      await AsyncStorage.setItem("customrecipes", JSON.stringify(recipes));
      navigation.goBack();
    } catch (error) {
      console.log("Error saving recipe:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {recipeToEdit ? "Edit Recipe" : "Add New Recipe"}
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Recipe Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter recipe name"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Image Upload</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter image URL"
          value={image}
          onChangeText={setImage}
        />
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.placeholderText}>Upload Image URL</Text>
        )}

        <Text style={styles.label}>Ingredients List</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter ingredients (one per line)"
          value={ingredients}
          onChangeText={setIngredients}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Step-by-step Instructions</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter instructions"
          value={instructions}
          onChangeText={setInstructions}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.saveButton} onPress={saveRecipe}>
          <Text style={styles.saveButtonText}>Save Recipe</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    backgroundColor: "#FBBF24",
  },
  backText: {
    fontSize: hp(2.2),
    color: "#333",
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#333",
    marginLeft: wp(5),
  },
  form: {
    paddingHorizontal: wp(5),
    paddingTop: hp(3),
    paddingBottom: hp(4),
  },
  label: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#333",
    marginBottom: hp(0.5),
    marginTop: hp(1.5),
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.2),
    fontSize: hp(2),
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: hp(12),
    textAlignVertical: "top",
  },
  imagePreview: {
    width: wp(40),
    height: hp(20),
    borderRadius: 8,
    marginTop: hp(1),
    resizeMode: "cover",
    alignSelf: "center",
  },
  placeholderText: {
    fontSize: hp(1.8),
    color: "#999",
    textAlign: "center",
    marginTop: hp(1),
  },
  saveButton: {
    backgroundColor: "#FBBF24",
    paddingVertical: hp(2),
    borderRadius: 10,
    marginTop: hp(3),
    alignItems: "center",
  },
  saveButtonText: {
    color: "#333",
    fontSize: hp(2.2),
    fontWeight: "bold",
  },
});

export default RecipesFormScreen;
