import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const Recipes = ({ foods, categories }) => {
  const navigation = useNavigation();

  const ArticleCard = ({ item, index }) => {
    const isEven = index % 2 === 0;
    return (
      <TouchableOpacity
        style={[
          styles.articleCard,
          { marginRight: isEven ? wp(1.5) : 0 },
        ]}
        onPress={() => navigation.navigate("RecipeDetail", item)}
      >
        <View testID="articleDisplay" style={styles.articleContainer}>
          <Image
            source={{ uri: item.recipeImage }}
            style={[styles.articleImage, { height: index % 3 === 0 ? hp(25) : hp(35) }]}
          />
          <Text style={styles.articleTitle} numberOfLines={2}>
            {item.recipeName}
          </Text>
          <Text style={styles.articleDescription} numberOfLines={2}>
            {item.category}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View testID="recipesDisplay" style={styles.container}>
      <FlatList
        data={foods}
        numColumns={2}
        keyExtractor={(item) => item.idFood}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item, index }) => (
          <ArticleCard item={item} index={index} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No recipes found in this category</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(1),
  },
  flatListContent: {
    paddingBottom: hp(3),
  },
  articleCard: {
    flex: 1,
    marginBottom: hp(2),
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  articleContainer: {
    flex: 1,
  },
  articleImage: {
    width: "100%",
    resizeMode: "cover",
  },
  articleTitle: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: wp(2),
    paddingTop: hp(0.8),
  },
  articleDescription: {
    fontSize: hp(1.6),
    color: "#666",
    paddingHorizontal: wp(2),
    paddingBottom: hp(0.8),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp(10),
  },
  emptyText: {
    fontSize: hp(2),
    color: "#999",
  },
});

export default Recipes;