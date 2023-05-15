import React from 'react';
import { Text, TouchableOpacity, Linking } from 'react-native';

const HyperlinkText = ({ text }) => {
  const handleLinkPress = () => {
    Linking.openURL(text);
  };

  const isLink = text && text.startsWith && text.startsWith('http');

  if (isLink) {
    return (
      <TouchableOpacity onPress={handleLinkPress}>
        <Text style={{ color: 'blue' }}>{text}</Text>
      </TouchableOpacity>
    );
  }
else if (!isLink && text.length > 100) {
    const trimmedText = text.substring(0, 100) + '...';
    return <Text>{trimmedText}</Text>;
  }
  return <Text>{text}</Text>;
};

export default HyperlinkText;
