import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
export default function App() {
  const [message, setMessage] = useState("Happy Birthday!");
  const [fontSize, setFontSize] = useState(24);
  const [textColor, setTextColor] = useState("#000000");
  const [selectedImage, setSelectedImage] = useState(require("./assets/360_F_217641566_AWmON9z2iOimut3I859nKuqyHycc3oO4.jpg"));
  const templateArray = [
    require("./assets/blank-paper-with-gift-box-table.jpg"),
    require("./assets/ai-generated-birthday-poster-template-with-large-copy-space-for-text-free-photo.jpg"),
    require("./assets/balloons-298144_1280.png"),
    require("./assets/510719-blue-and-gold-happy-birthday-background-image.jpg"),
  ];
  const MAX_FONT_SIZE = 48;
  const MIN_FONT_SIZE = 12;
  const MAX_TEXT_LENGTH = 80;
  const changeFontSize = (type) => {
    setFontSize((prevSize) =>
      type === "increase"
        ? Math.min(prevSize + 2, MAX_FONT_SIZE)
        : Math.max(MIN_FONT_SIZE, prevSize - 2)
    );
  };
  const changeTextColor = (color) => {
    setTextColor(color);
  };
  const handleMessageChange = (text) => {
    if (text.length <= MAX_TEXT_LENGTH) {
      setMessage(text);
    }
  };
  const handleShare = () => {
    Alert.alert("Share", "You can now share your birthday card!");
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Birthday Card Creator</Text>
      <View style={styles.card}>
        <Image source={selectedImage} style={styles.image} />
        <Text style={[styles.cardText, { fontSize, color: textColor }]}>
          {message}
        </Text>
      </View>
      <View style={styles.editCard}>
        <TextInput
          style={styles.input}
          placeholder="Birthday message"
          value={message}
          onChangeText={handleMessageChange}
        />
        <View style={styles.row}>
          <Button
            title="Increase Text Size"
            onPress={() => changeFontSize("increase")}
          />
          <Button
            title="Decrease Text Size"
            onPress={() => changeFontSize("decrease")}
          />
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => changeTextColor("#000000")}
            style={[styles.colorBox, { backgroundColor: "#000000" }]}
          />
          <TouchableOpacity
            onPress={() => changeTextColor("#FF6347")}
            style={[styles.colorBox, { backgroundColor: "#FF6347" }]}
          />
          <TouchableOpacity
            onPress={() => changeTextColor("#4682B4")}
            style={[styles.colorBox, { backgroundColor: "#4682B4" }]}
          />
          <TouchableOpacity
            onPress={() => changeTextColor("#32CD32")}
            style={[styles.colorBox, { backgroundColor: "#32CD32" }]}
          />
        </View>
        <View style={styles.buttonRow}>
          <Text style={{ marginBottom: 10, textAlign: "center" }}>
            Choose Background:
          </Text>
          <View style={styles.thumbnailRow}>
            {templateArray.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImage(image)}
                style={styles.thumbnailContainer}
              >
                <Image source={image} style={styles.thumbnail} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Button
          title="Reset Card"
          color="blue"
          onPress={() => {
            setSelectedImage(templateArray[0]);
            setMessage("Happy Birthday!");
            setFontSize(24);
            setTextColor("#000000");
          }}
        />
        <Button
          title="Share Card"
          color="green"
          onPress={handleShare}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F3F4F6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    height: 300,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    position: "absolute",
  },
  cardText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  editCard: {
    width: "100%",
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    paddingBottom: 20,
  },
  input: {
    width: "100%",
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
  },
  colorBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  buttonRow: {
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 10,
  },
  thumbnailRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  thumbnailContainer: {
    margin: 5,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  button: {
    marginBottom: 30,
    borderRadius: 20,
    gap: 10
  },
});