import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample(props) {
  const [image, setImage] = useState(null);

  const [loading, setloading] = useState(false)
  const data = [
    ["asparagus", "500", "4"],
    ["tomato", "300", "2"],
    ["mushroom", "150", "4.32"],
    ["butter", "454", "5"],
    ["rice", "1400", "9"],
    ["eggs", "700", "8"],
    ["potato", "800", "3"],
    ["carrots", "700", "4"],
    ["cucumbers", "150", "2"],
    ["onion", "200", "1.50"],
    ["pepper", "340", "3"],
    ["celery", "500", "4"],
    ["milk", "1000", "4"],
    ["lettuce", "450", "3"],

  ]

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);

      setloading(true)
      setTimeout(() => {
        data.map(i => {
          props.addItem(...i)
        })
        setloading(false)
      }, 2500)
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderColor: 'white', borderWidth: 1, margin: 20 }}>
      <Button title="Upload image" onPress={pickImage} color='white' />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {loading && <ActivityIndicator />}
    </View>
  );
}