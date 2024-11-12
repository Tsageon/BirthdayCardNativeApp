import { ImageBackground } from 'react-native';

<View
  style={[styles.card, {
    borderWidth: borderStyle === 'none' ? 0 : 2,
    borderColor: borderStyle === 'solid' ? borderColor : 'transparent',
    backgroundColor: cardBackgroundColor,
  }]}
>
  {image ? (
    <ImageBackground
      source={{ uri: image }}
      style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
    >
      <Text style={[styles.cardText, { fontSize: textSize, color: textColor, fontStyle: fontStyle }]}>
        {cardText}
      </Text>
    </ImageBackground>
  ) : (
    <Text style={[styles.cardText, { fontSize: textSize, color: textColor, fontStyle: fontStyle }]}>
      {cardText}
    </Text>
  )}
</View>