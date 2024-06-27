import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Modal, FlatList, Text } from 'react-native';
import { Video } from 'expo-av';
import React, { useRef, useState, useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import {AdjustmentsHorizontalIcon} from 'react-native-heroicons/outline'
import {ArrowUturnLeftIcon} from 'react-native-heroicons/outline'

export default function App() {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [currentPosition, setCurrentPosition] = useState(0);
  const [showQualityOptions, setShowQualityOptions] = useState(false); // Track if quality options are shown
  const [showSpeedOptions, setShowSpeedOptions] = useState(false); // Track if speed options are shown
  const [selectedQuality, setSelectedQuality] = useState(null); // Track selected quality
  const [selectedSpeed, setSelectedSpeed] = useState(1); // Track selected playback speed

  const qualityOptions = [
    { label: '480p', uri: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/tears-of-steel-audio_eng=64008-video_eng=401000.m3u8', peakBitrate: 1000000 },
    { label: '720p', uri: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/tears-of-steel-audio_eng=128002-video_eng=1001000.m3u8', peakBitrate: 2000000 },
    { label: '1080p', uri: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/tears-of-steel-audio_eng=128002-video_eng=1501000.m3u8', peakBitrate: 4000000 },
    { label: '2160p (4K)', uri: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/tears-of-steel-audio_eng=128002-video_eng=2200000.m3u8', peakBitrate: 8000000 }
  ];

  const speedOptions = [0.25, 0.5, 1, 1.5, 2]; // Define speed options

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    setSelectedQuality(qualityOptions[0]); // Set initial quality when component mounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  useEffect(() => {
    // Play the video when the component mounts
    if (video.current) {
      video.current.playAsync();
    }
  }, []);

  // Function to toggle the visibility of quality options modal
  const toggleQualityOptions = () => {
    setShowQualityOptions(!showQualityOptions);
  };

  // Function to the toggle the visibility of speed options modal
  const toggleSpeedOptions = () => {
    setShowSpeedOptions(!showSpeedOptions);
  };

  // Function to switch video resolution
  const switchResolution = (resolution) => {
    video.current.getStatusAsync().then(({ positionMillis }) => {
      setCurrentPosition(positionMillis);
      video.current.unloadAsync()
        .then(() => {
          video.current.loadAsync({ uri: resolution.uri }, { preferredPeakBitrate: resolution.peakBitrate }, false)
            .then(async () => {
              await video.current.setPositionAsync(currentPosition);
              video.current.playAsync(); // Resume playback after changing resolution
            });
        })
        .catch(error => console.error('Error switching resolution:', error));
    });
  };

  // Function to switch playback speed
  const switchPlaybackSpeed = (speed) => {
    video.current.setRateAsync(speed, true);
    setSelectedSpeed(speed);
  };

  const handleVideoTap = () => {
    toggleQualityOptions();
    if (status.isPlaying) {
      video.current.pauseAsync();
    } else {
      video.current.playAsync();
    } // Show quality options when video is tapped
  };

  useEffect(() => {
    // Set initial quality when component mounts
    setSelectedQuality(qualityOptions[0]);
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const handlePlaybackStatusUpdate = (newStatus) => {
    setStatus(newStatus);
    if (newStatus.isPlaying && newStatus.positionMillis !== undefined) {
      setCurrentPosition(newStatus.positionMillis);
    }
  };

  const closeQualityOptions = () => {
    setShowQualityOptions(false);
  };

  const closeSpeedOptions = () => {
    setShowSpeedOptions(false);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: selectedQuality ? selectedQuality.uri : null }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        onPress={handleVideoTap}
      />
      {/* Show the current quality with a button */}
      <TouchableOpacity style={styles.qualityButton} onPress={toggleQualityOptions}>
        <Text style={styles.qualityButtonText}>
          <Text style={styles.settingSymbol}>⚙️</Text> {/* Setting symbol */}
        </Text>
      </TouchableOpacity>
      {/* Show the playback speed options with a button */}
      <TouchableOpacity style={styles.speedButton} onPress={toggleSpeedOptions}>
        {/* <Text style={styles.speedButtonText}>
           { Playback speed icon }
           <AdjustmentsHorizontalIcon style={styles.settingSymbol} color='white'/>
        </Text> */}
        <AdjustmentsHorizontalIcon style={styles.settingSymbol} color='white'/>
      </TouchableOpacity>
      {/* Quality options modal */}
      <Modal
  animationType="slide"
  transparent={true}
  visible={showQualityOptions}
  onRequestClose={closeQualityOptions} // Close modal when back button is pressed or user taps outside the modal
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        {/* Back button */}
        <TouchableOpacity onPress={closeQualityOptions}>
        <ArrowUturnLeftIcon style={styles.settingSymbol} color='white'/>
        </TouchableOpacity>
        {/* Modal title */}
        <Text style={styles.modalTitle}>Quality Control</Text>
      </View>
      <FlatList
        data={qualityOptions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => switchResolution(item)}>
            <Text style={styles.qualityOption}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  </View>
</Modal>

      {/* Speed options modal */}
      <Modal
  animationType="slide"
  transparent={true}
  visible={showSpeedOptions}
  onRequestClose={closeSpeedOptions} // Close modal when back button is pressed or user taps outside the modal
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        {/* Back button */}
        <TouchableOpacity onPress={closeSpeedOptions}>
          <ArrowUturnLeftIcon style={styles.settingSymbol} color='white'/>
        </TouchableOpacity>
        {/* Modal title */}
        <Text style={styles.modalTitle}>Playback Speed</Text>
      </View>
      <FlatList
        data={speedOptions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => switchPlaybackSpeed(item)}>
            <Text style={styles.qualityOption}>
              {item}x
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  </View>
</Modal>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
    marginTop: 25,
  },
  qualityButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 1.8)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  speedButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 1.8)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    zIndex:2,
  },
  qualityButtonText: {
    color: 'white',
    fontSize: 16,
  },
  speedButtonText: {
    color: 'white',
    fontSize: 16,
  },
  settingSymbol: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'left',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginLeft: 10,
  },
  modalContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    width: '25%',
  },
  modalTitle: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    
  },
  qualityOption: {
    fontSize: 16,
    paddingTop: 5,
    color: 'white',
    paddingLeft:10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    color: 'white',
    fontSize: 18,
    marginRight: 10,
  },
});
