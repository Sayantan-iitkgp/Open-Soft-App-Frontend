import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Video } from 'expo-av';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import {PauseIcon} from 'react-native-heroicons/outline'
import {PlayIcon, SpeakerWaveIcon, SpeakerXMarkIcon} from 'react-native-heroicons/solid'


const Vid = ({play}) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(play);
  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(parseFloat(rate));
    if (videoRef.current) {
      videoRef.current.setRateAsync(parseFloat(rate), true);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pauseAsync();
      } else {
        videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const handleMuteUnmute = () => {
    if (videoRef.current) {
      videoRef.current.setIsMutedAsync(!isMuted);
      setIsMuted(!isMuted);
    }
  };


  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' }}
        rate={playbackRate}
        volume={1.0}
        isMuted={isMuted} 
        resizeMode="cover"
        shouldPlay={isPlaying}
        
        isLooping
        style={styles.video}
      />
      <TouchableOpacity style={styles.overlay} onPress={handlePlayPause}>
        {isPlaying ? <PauseIcon size={48} color="white" /> : <PlayIcon size={48} color="white" />}
      </TouchableOpacity>
      <TouchableOpacity style={styles.muteButton} onPress={handleMuteUnmute}>
        {isMuted ? <SpeakerXMarkIcon size={24} color="white" /> : <SpeakerWaveIcon size={24} color="white" />}
      </TouchableOpacity>
      <Picker
        selectedValue={playbackRate.toString()}
        style={styles.picker}
        onValueChange={(itemValue) => handlePlaybackRateChange(itemValue) }
      >
         <Picker.Item label="0.25x" value="0.25" />
        <Picker.Item label="0.5x" value="0.5" />
        <Picker.Item label="0.75x" value="0.75" />
        <Picker.Item label="1.0x" value="1.0" />
        <Picker.Item label="1.25x" value="1.25" />
        <Picker.Item label="1.5x" value="1.5" />
        <Picker.Item label="1.75x" value="1.75" />
        <Picker.Item label="2.0x" value="2.0" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  muteButton: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
  video: {
    width: '100%',
    height: '80%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Vid;
