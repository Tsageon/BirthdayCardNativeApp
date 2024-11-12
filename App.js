import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Share, Image, TouchableOpacity, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground } from 'react-native';
import Img1 from './assets/ai-generated-8511709_1280.png';
import Img2 from './assets/balloons-298144_1280.png';
import Img3 from './assets/blank-paper-with-gift-box-table.jpg';
import Img4 from './assets/happy-birthday-5042779_1280.jpg';
import Img5 from './assets/white-birthday-invitation-mock-up-with-pinkish-supplies.jpg';
import Img6 from './assets/360_F_217641566_AWmON9z2iOimut3I859nKuqyHycc3oO4.jpg'
import Img7 from './assets/510719-blue-and-gold-happy-birthday-background-image.jpg';
import Img8 from './assets/blank-paper-with-gift-box-table.jpg';
import * as ImagePicker from 'expo-image-picker';
import { captureScreen } from 'react-native-view-shot';

const templates = [Img1, Img2, Img3, Img4, Img5,Img6,Img7,Img8];

export default function App() {
  const [cardText, setCardText] = useState('');
  const [inputText, setInputText] = useState('');
  const [image, setImage] = useState(null);
  const [textSize, setTextSize] = useState(20);
  const [textColor, setTextColor] = useState('#000080');
  const [fontStyle, setFontStyle] = useState('normal');
  const [borderStyle, setBorderStyle] = useState('none');
  const [borderColor, setBorderColor] = useState('none');
  const [imageSize, setImageSize] = useState(200);
  const [cardBackgroundColor, setCardBackgroundColor] = useState('#ADD8E6');

  const shareData = async () => {
    try {
      if (navigator.share) {
        const shareContent = {
          title: 'Check out this content!',
          text: `Text: ${cardText}`,
          url: image || '',  
        };
        await navigator.share(shareContent);
        alert('Content shared!');
      } else {
        alert('Web sharing is not supported in your browser');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  

  const saveCard = async () => {
    try {
      const base64Uri = await captureScreen({
        format: 'jpg',
        quality: 1,
      });
  
      console.log('Base64 Card saved:', base64Uri);
  
      const a = document.createElement('a');
      a.href = base64Uri;
      a.download = 'card.jpg';
      a.click();
  
      alert('Card saved as base64! Good luck finding it.');
    } catch (error) {
      console.error('Error saving card:', error);
    }
  };

  const handleAddText = () => {
    setCardText(inputText);
    setInputText('');
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access the camera roll is required. Please enable it.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSelectTemplate = (template) => {
    console.log('Template selected:', template);
    setImage(template);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Custom Birthday Card Maker V2</Text>

      <Text style={styles.subtitle}>Choose a Template</Text>
      <View style={styles.templateContainer}>
        {templates.map((template, index) => (
          <TouchableOpacity key={index} onPress={() => handleSelectTemplate(template)}>
            <Image source={template} style={styles.templateImage} />
          </TouchableOpacity>
        ))}
      </View>

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
        {image ? (
        <ImageBackground
        source={image}
        style={[styles.imageBackground, { height: 500, width: 300 }]}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.6)', 'transparent']}
          style={styles.overlay}
        >
          <Text style={[styles.cardText, { fontSize: textSize, color: textColor, fontStyle: fontStyle }]}>
            {cardText}
          </Text>
        </LinearGradient>
      </ImageBackground>
      
        ) : (
          <Text
            style={[styles.cardText, { fontSize: textSize, color: textColor, fontStyle: fontStyle }]}
          >
            {cardText}
          </Text>
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
      <View style={styles.buttonContainer}>
        <Button title="Share Card" onPress={shareData} />
        <Button title="Save Card" onPress={saveCard} />
      </View>

      <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an Image from Library</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  templateContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  templateImage: {
    width: 60,
    height: 60,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  card: {
    width: 300,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,  
    backgroundColor: '#ddd', 
  },
  cardText: {
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
    width: 250,
    paddingLeft: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  picker: {
    width: 200,
    height: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
    marginTop: 30,
  },
  pickImageButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,  
  }
  
});