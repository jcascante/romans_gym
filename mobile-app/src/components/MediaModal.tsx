import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ImageResizeMode,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme';

interface MediaModalProps {
  visible: boolean;
  type: 'image' | 'video';
  src: string | any; // Allow both string URLs and require() objects
  alt: string;
  onClose: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function MediaModal({ visible, type, src, alt, onClose }: MediaModalProps) {
  const { theme } = useTheme();

  if (!visible || !src) return null;

  // Helper function to determine image source
  const getImageSource = (src: string | any) => {
    if (typeof src === 'string') {
      return { uri: src };
    }
    return src; // For require() objects
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={[styles.overlay, { backgroundColor: 'rgba(0, 0, 0, 0.8)' }]}>
        <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
          {/* Close Button */}
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: theme.colors.border }]}
            onPress={onClose}
          >
            <Ionicons name="close" size={24} color={theme.colors.text} />
          </TouchableOpacity>

          {/* Media Content */}
          <View style={styles.mediaContainer}>
            {type === 'video' ? (
              <Video
                source={{ uri: src }}
                style={styles.video}
                useNativeControls
                shouldPlay={false}
                isLooping={false}
              />
            ) : (
              <Image
                source={getImageSource(src)}
                style={styles.image}
                resizeMode="contain"
              />
            )}
          </View>

          {/* Caption */}
          <Text style={[styles.caption, { color: theme.colors.text }]}>
            {alt}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: screenWidth * 0.9,
    maxHeight: screenHeight * 0.8,
    borderRadius: 12,
    padding: 16,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  mediaContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 140,
    borderRadius: 8,
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  caption: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
  },
}); 