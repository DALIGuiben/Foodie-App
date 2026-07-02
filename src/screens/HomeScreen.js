import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Categories from "../components/categories";
import Recipes from "../components/recipes";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Chicken");
  
  const categories = [
    { idCategory: "1", strCategory: "Chicken", strCategoryThumb: "https://www.themealdb.com/images/category/chicken.png" },
    { idCategory: "2", strCategory: "Beef", strCategoryThumb: "https://www.themealdb.com/images/category/beef.png" },
    { idCategory: "3", strCategory: "Pasta", strCategoryThumb: "https://www.themealdb.com/images/category/pasta.png" },
    { idCategory: "4", strCategory: "Dessert", strCategoryThumb: "https://www.themealdb.com/images/category/dessert.png" },
    { idCategory: "5", strCategory: "Seafood", strCategoryThumb: "https://www.themealdb.com/images/category/seafood.png" },
    { idCategory: "6", strCategory: "Vegetarian", strCategoryThumb: "https://www.themealdb.com/images/category/vegetarian.png" },
    { idCategory: "7", strCategory: "Pork", strCategoryThumb: "https://www.themealdb.com/images/category/pork.png" },
    { idCategory: "8", strCategory: "Lamb", strCategoryThumb: "https://www.themealdb.com/images/category/lamb.png" },
    { idCategory: "9", strCategory: "Breakfast", strCategoryThumb: "https://www.themealdb.com/images/category/breakfast.png" },
    { idCategory: "10", strCategory: "Goat", strCategoryThumb: "https://www.themealdb.com/images/category/goat.png" },
  ];

  const allFood = [
    {
      idFood: "1",
      recipeName: "Chicken Curry",
      recipeInstructions: "Cook chicken with spices and coconut milk",
      recipeImage: "https://www.themealdb.com/images/media/meals/qyxwsp1511341296.jpg",
      category: "Chicken",
      prepTime: "30 mins",
      servings: 4,
      calories: 450,
      difficulty: "Medium",
      ingredients: ["Chicken", "Coconut Milk", "Spices", "Onion", "Garlic"]
    },
    {
      idFood: "2",
      recipeName: "Beef Stew",
      recipeInstructions: "Slow cook beef with vegetables",
      recipeImage: "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
      category: "Beef",
      prepTime: "60 mins",
      servings: 6,
      calories: 550,
      difficulty: "Easy",
      ingredients: ["Beef", "Carrots", "Potatoes", "Onion", "Stock"]
    },
    {
      idFood: "3",
      recipeName: "Spaghetti Carbonara",
      recipeInstructions: "Mix pasta with egg and cheese",
      recipeImage: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
      category: "Pasta",
      prepTime: "20 mins",
      servings: 2,
      calories: 600,
      difficulty: "Easy",
      ingredients: ["Spaghetti", "Eggs", "Parmesan", "Bacon", "Pepper"]
    },
    {
      idFood: "4",
      recipeName: "Tiramisu",
      recipeInstructions: "Layer coffee soaked biscuits with cream",
      recipeImage: "https://www.themealdb.com/images/media/meals/qxuqtt1511728939.jpg",
      category: "Dessert",
      prepTime: "40 mins",
      servings: 8,
      calories: 350,
      difficulty: "Medium",
      ingredients: ["Biscuits", "Coffee", "Mascarpone", "Eggs", "Sugar"]
    },
    {
      idFood: "5",
      recipeName: "Grilled Salmon",
      recipeInstructions: "Grill salmon with herbs and lemon",
      recipeImage: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
      category: "Seafood",
      prepTime: "25 mins",
      servings: 2,
      calories: 380,
      difficulty: "Easy",
      ingredients: ["Salmon", "Lemon", "Herbs", "Olive Oil", "Salt"]
    },
    {
      idFood: "6",
      recipeName: "Vegetable Stir Fry",
      recipeInstructions: "Quick fry vegetables with sauce",
      recipeImage: "https://www.themealdb.com/images/media/meals/wuvrtu1511292691.jpg",
      category: "Vegetarian",
      prepTime: "15 mins",
      servings: 4,
      calories: 250,
      difficulty: "Easy",
      ingredients: ["Broccoli", "Carrots", "Sauce", "Tofu", "Garlic"]
    },
    {
      idFood: "7",
      recipeName: "Pork Ribs",
      recipeInstructions: "Slow cook ribs with BBQ sauce",
      recipeImage: "https://www.themealdb.com/images/media/meals/yuvtos1511553762.jpg",
      category: "Pork",
      prepTime: "90 mins",
      servings: 4,
      calories: 700,
      difficulty: "Hard",
      ingredients: ["Pork Ribs", "BBQ Sauce", "Spices", "Onion", "Garlic"]
    },
    {
      idFood: "8",
      recipeName: "Lamb Chops",
      recipeInstructions: "Grill lamb chops with rosemary",
      recipeImage: "https://www.themealdb.com/images/media/meals/uwtuuw1511293192.jpg",
      category: "Lamb",
      prepTime: "35 mins",
      servings: 2,
      calories: 500,
      difficulty: "Medium",
      ingredients: ["Lamb", "Rosemary", "Garlic", "Olive Oil", "Salt"]
    },
    {
      idFood: "9",
      recipeName: "Pancakes",
      recipeInstructions: "Mix batter and cook on griddle",
      recipeImage: "https://www.themealdb.com/images/media/meals/rpdupv1511553273.jpg",
      category: "Breakfast",
      prepTime: "15 mins",
      servings: 4,
      calories: 300,
      difficulty: "Easy",
      ingredients: ["Flour", "Eggs", "Milk", "Sugar", "Butter"]
    },
    {
      idFood: "10",
      recipeName: "Goat Curry",
      recipeInstructions: "Cook goat meat with spices",
      recipeImage: "https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg",
      category: "Goat",
      prepTime: "50 mins",
      servings: 6,
      calories: 480,
      difficulty: "Medium",
      ingredients: ["Goat Meat", "Spices", "Coconut", "Onion", "Garlic"]
    },
  ];

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
  };

  const filteredFoods = allFood.filter((food) => food.category === activeCategory);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView testID="scrollContainer" showsVerticalScrollIndicator={false}>
        <View testID="headerContainer" style={styles.headerContainer}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              style={styles.avatar}
            />
            <Text style={styles.greeting}>Hello, User!</Text>
          </View>
        </View>

        <View testID="titleContainer" style={styles.titleContainer}>
          <Text style={styles.title}>Make your own food</Text>
          <Text style={styles.subtitle}>stay at home</Text>
        </View>

        <View testID="categoryList" style={styles.categoryContainer}>
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        <View testID="foodList" style={styles.foodContainer}>
          <Recipes foods={filteredFoods} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    paddingHorizontal: wp(5),
    paddingTop: hp(5),
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    marginRight: wp(3),
  },
  greeting: {
    fontSize: hp(2.5),
    fontWeight: "600",
    color: "#333",
  },
  titleContainer: {
    paddingHorizontal: wp(5),
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  title: {
    fontSize: hp(3.5),
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: hp(2),
    color: "#666",
    marginTop: hp(0.5),
  },
  categoryContainer: {
    marginTop: hp(1),
  },
  foodContainer: {
    marginTop: hp(1),
    paddingHorizontal: wp(2),
  },
});

export default HomeScreen;