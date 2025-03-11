import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native"
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Import template images (ensure these paths are correct and you have a d.ts file)
import Template1 from "./Images/istockphoto-2155311040-1024x1024.jpg";
import Template2 from "./Images/istockphoto-1176535459-1024x1024.jpg";
import Template3 from "./Images/istockphoto-1077728036-1024x1024.jpg";
import Template4 from "./Images/istockphoto-1204794791-1024x1024.jpg";
import Template5 from "./Images/istockphoto-1349208049-1024x1024.jpg";
import Template6 from "./Images/istockphoto-1454098765-1024x1024.jpg";

// Define a constant array of templates
const templates: any[] = [
  Template1,
  Template2,
  Template3,
  Template4,
  Template5,
  Template6,
];

const App: React.FC = () => {
  const [customText, setCustomText] = useState<string>("Happy Birthday!");
  // selectedImage: if user picks from gallery, its URI is stored here
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // backgroundImage: if a template is selected, its image will be used
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const viewShotRef = useRef<ViewShot | null>(null);

  useEffect(() => {
    if (Platform.OS !== "web") {
      ImagePicker.requestMediaLibraryPermissionsAsync();
      
    }
    
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setBackgroundImage(null);
    }
  };

  // Share the card 
  const shareCard = async () => {
    try {
      console.log("shareCard triggered");
  
      if (viewShotRef.current) {
        console.log("viewShotRef.current exists");
  
        // Capture the view as an image
        const uri = await captureRef(viewShotRef.current, {
          format: 'png',
          quality: 0.8,
        });
        console.log("Captured image URI:", uri);
  
        // Save the captured image to the document directory
        const fileUri = FileSystem.documentDirectory + "birthday_card.png";
        
        // Copy the captured image to the desired location
        await FileSystem.copyAsync({
          from: uri,
          to: fileUri,
        });
  
        console.log("Image copied to:", fileUri);
  
        // Share the copied image
        await Sharing.shareAsync(fileUri, {
          mimeType: 'image/png',
          dialogTitle: 'Share Your Card',
        });
  
        console.log("Share action completed");
      } else {
        console.log("viewShotRef.current is null");
      }
    } catch (error) {
      console.error("Error sharing card:", error);
    }
  };
  

  // Set a template as the background
  const selectTemplate = (template: string) => {
    setBackgroundImage(template);
    setSelectedImage(null);
  };

return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.title}>Generic B-Day Card Creator</Text>
      </View>

      <TextInput
        style={styles.input}
        value={customText}
        onChangeText={setCustomText}
        placeholder="Enter your birthday message"
        placeholderTextColor="#ccc"
      />

      <Text style={styles.sectionTitle}>Templates</Text>
      <ScrollView horizontal style={styles.templatesContainer}>
        {templates.map((template, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => selectTemplate(template)}
          >
            <Image source={template} style={styles.templateImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Text Color</Text>
      <View style={styles.colorOptions}>
        {["#e74c3c", "#2ecc71", "#f1c40f", "#ffffff", "#000000"].map(
          (color) => (
            <TouchableOpacity
              key={color}
              style={[styles.colorOption, { backgroundColor: color }]}
              onPress={() => setTextColor(color)}
            />
          )
        )}
      </View>

      {/* Card Preview */}
      <ViewShot ref={viewShotRef} style={styles.viewShotContainer}>
  <View
    style={[
      styles.card,
      { backgroundColor: backgroundImage ? undefined : "#3498db" },
    ]}
  >
    {selectedImage ? (
      <Image source={{ uri: selectedImage }} style={styles.cardImage} />
    ) : backgroundImage ? (
      <Image source={backgroundImage} style={styles.cardImage} />
    ) : (
      <View style={styles.cardPlaceholder}>
        <Text style={styles.cardPlaceholderText}>
          No Image / Template Selected
        </Text>
      </View>
    )}
    <View style={styles.cardTextContainer}>
      <Text style={[styles.cardText, { color: textColor }]}>
        {customText}
      </Text>
    </View>
  </View>
</ViewShot>

<View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <MaterialCommunityIcons name="image" size={24} color="#fff" />
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={shareCard}>
          <MaterialCommunityIcons name="share-variant" size={24} color="#fff" />
          <Text style={styles.buttonText}>Share Card</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 25,
    marginTop: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#bdc3c7",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: "#fff",
    marginBottom: 15,
    color: "#2c3e50",
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginBottom: 10,
    marginTop: 20
  },
  button: {
    flexDirection: "row",
    backgroundColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2c3e50",
    marginVertical: 10,
  },
  colorOptions: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  templatesContainer: {
    marginBottom: 20,
  },
  templateImage: {
    width: 100,
    height: 80,
    marginHorizontal: 5,
    borderRadius: 10,
    resizeMode: "cover",
  },
  card: {
    width: "100%",
    height: 300,
    borderRadius: 15,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    position: "relative",
  },
  cardImage: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  cardPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#bdc3c7",
    alignItems: "center",
    justifyContent: "center",
  },
  cardPlaceholderText: {
    color: "#7f8c8d",
    fontSize: 18,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardTextContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  viewShotContainer: {
    width: "100%",
    height: 300,
  },
});

export default App;