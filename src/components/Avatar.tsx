import React from 'react';
import {View, Text, StyleSheet, ViewStyle, Image} from 'react-native';
import {colors, typography} from '@theme';

interface AvatarProps {
  name?: string;
  imageUri?: string;
  size?: number;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  imageUri,
  size = 40,
  style,
}) => {
  const getInitials = (fullName?: string) => {
    if (!fullName) return '?';
    const names = fullName.trim().split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  const backgroundColor = imageUri
    ? 'transparent'
    : colors.primary.main;

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
        style,
      ]}>
      {imageUri ? (
        <Image
          source={{uri: imageUri}}
          style={[
            styles.image,
            {width: size, height: size, borderRadius: size / 2},
          ]}
        />
      ) : (
        <Text
          style={[
            typography.body2,
            {
              color: colors.text.white,
              fontSize: size * 0.4,
              fontWeight: '600',
            },
          ]}>
          {getInitials(name)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
});

