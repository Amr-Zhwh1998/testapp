import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://172.16.1.111:3000/api/graves?name=${searchTerm}`,
        { timeout: 10000 }
      );

      //console.log("API Response:", response.data);
      setResults(response.data);
    } catch (error) {
      console.error("Error making request:", error.message);
      console.error("Error status code:", error.response?.status);
    }
  };

  const handleSearchByCemetery = async () => {
    try {
      const response = await axios.get(
        `http://172.16.1.111:3000/api/graves?cemetery=${searchTerm}`,
        { timeout: 100000 }
      );

      //console.log("API Response (Cemetery Search):", response.data);
      setResults(response.data);
    } catch (error) {
      console.error("Error making request:", error.message);
      console.error("Error status code:", error.response?.status);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter name or cemetery to search"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text>Search by Name</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleSearchByCemetery}
      >
        <Text>Search by Cemetery</Text>
      </TouchableOpacity>
      <FlatList
        data={results}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={() => {
          if (searchTerm === "") {
            return (
              <Text style={styles.noResultsText}>Enter search term above</Text>
            );
          } else {
            return <Text style={styles.noResultsText}>No results found</Text>;
          }
        }}
        renderItem={({ item }) => (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Name: {item.name}</Text>
            <Text style={styles.resultText}>Cemetery: {item.cemetery}</Text>
            <Text style={styles.resultText}>
              Grave Location: {item.location.latitude},{" "}
              {item.location.longitude}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  searchButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 8, // Adjust the padding to make the button smaller
    marginBottom: 12,
    alignItems: "center",
    alignSelf: "center", // Align the button to the start of its container (left side)
  },
  resultContainer: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 12,
  },

  resultText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    marginLeft: 5,
  },
  noResultsText: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
  },
});

export default SearchScreen;
