import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native';

export default function App() {
  const [cardText, setCardText] = useState('');
  const [inputText, setInputText] = useState('');
  const [image, setImage] = useState(null);
  const [textSize, setTextSize] = useState(20);
  const [textColor, setTextColor] = useState('#000080');
  const [fontStyle, setFontStyle] = useState('normal');
  const [borderStyle, setBorderStyle] = useState('none');
  const [borderColor, setBorderColor] = useState('#FFD700');
  const [imageSize, setImageSize] = useState(200);
  const [cardBackgroundColor, setCardBackgroundColor] = useState('#ADD8E6');

  const handleAddText = () => {
    setCardText(inputText);
    setInputText('');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Custom Birthday Card Maker V2</Text>

      <View
        style={[
          styles.card,
          {
            borderWidth: borderStyle === 'none' ? 0 : 2,
            borderColor: borderStyle === 'solid' ? borderColor : 'transparent',
            backgroundColor: cardBackgroundColor,
          },
        ]}
      >
        <Text style={[styles.cardText, { fontSize: textSize, color: textColor, fontStyle: fontStyle }]}>{cardText}</Text>
        <Button title="Pick an image from your device" onPress={pickImage} />
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: imageSize, height: imageSize, borderRadius: 10, marginTop: 10 }}
          />
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter your text"
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Add Text" onPress={handleAddText} />

      <Text>Text Size</Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={10}
        maximumValue={40}
        step={1}
        value={textSize}
        onValueChange={setTextSize}
      />

      <Text style={styles.label}>Font Style</Text>
      <Picker
        selectedValue={fontStyle}
        style={styles.picker}
        onValueChange={(itemValue) => setFontStyle(itemValue)}
      >
        <Picker.Item label="Normal" value="normal" />
        <Picker.Item label="Italic" value="italic" />
      </Picker>

      <Text style={styles.label}>Text Color</Text>
      <Picker
        selectedValue={textColor}
        style={styles.picker}
        onValueChange={(itemValue) => setTextColor(itemValue)}
      >
        <Picker.Item label="Blue" value="#0000FF" />
        <Picker.Item label="Red" value="#FF0000" />
        <Picker.Item label="Green" value="#008000" />
        <Picker.Item label="Black" value="#000000" />
        <Picker.Item label="Yellow" value="#FFFF00" />
        <Picker.Item label="Purple" value="#800080" />
        <Picker.Item label="Orange" value="#FFA500" />
        <Picker.Item label="Pink" value="#FFC0CB" />
      </Picker>

      <Text style={styles.label}>Card Background Color</Text>
      <Picker
        selectedValue={cardBackgroundColor}
        style={styles.picker}
        onValueChange={(itemValue) => setCardBackgroundColor(itemValue)}
      >
        <Picker.Item label="Light Blue" value="#ADD8E6" />
        <Picker.Item label="Light Pink" value="#FFB6C1" />
        <Picker.Item label="Light Green" value="#90EE90" />
        <Picker.Item label="Light Yellow" value="#FFFFE0" />
        <Picker.Item label="White" value="#FFFFFF" />
      </Picker>

      <Text style={styles.label}>Card Decoration (Border)</Text>
      <Picker
        selectedValue={borderStyle}
        style={styles.picker}
        onValueChange={(itemValue) => setBorderStyle(itemValue)}
      >
        <Picker.Item label="None" value="none" />
        <Picker.Item label="Solid Border" value="solid" />
      </Picker>

      {borderStyle === 'solid' && (
        <>
          <Text style={styles.label}>Border Color</Text>
          <Picker
            selectedValue={borderColor}
            style={styles.picker}
            onValueChange={(itemValue) => setBorderColor(itemValue)}
          >
            <Picker.Item label="Gold" value="#FFD700" />
            <Picker.Item label="Silver" value="#C0C0C0" />
            <Picker.Item label="Red" value="#FF0000" />
            <Picker.Item label="Black" value="#000000" />
            <Picker.Item label="Green" value="#008000" />
            <Picker.Item label="Blue" value="#0000FF" />
            <Picker.Item label="Purple" value="#800080" />
          </Picker>
        </>
      )}

      {image && (
        <>
          <Text>Image Size</Text>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={50}
            maximumValue={200}
            step={1}
            value={imageSize}
            onValueChange={setImageSize}
          />
        </>
      )}

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  cardText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: 200,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
});
