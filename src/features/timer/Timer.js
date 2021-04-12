import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { colors } from '../../utils/colors';
import { fontSizes, spacing } from '../../utils/sizes';
import Countdown from '../../components/Countdown';
import RoundedButton from '../../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

export default function Timer({ focusSubject, onTimerEnd, clearSubject }) {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onProgress = (progressLeft) => {
    setProgress(progressLeft);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(5*1000);
    }
  };

  const onEnd = () => {
    setMinutes(1);
    setProgress(1);
    setIsStarted(false);
    vibrate();
    onTimerEnd(focusSubject);
  };

  return (
    <View style={styles.timerContainer}>
      <View style={styles.countdown}>
        <Countdown
          isPaused={!isStarted}
          minutes={minutes}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={styles.timeButtonWrapper}>
        <RoundedButton
          title="10"
          size={75}
          onPress={() => {
            setMinutes(10);
            setProgress(1);
            setIsStarted(false);
          }}
        />
        <RoundedButton
          title="15"
          size={75}
          onPress={() => {
            setMinutes(15);
            setProgress(1);
            setIsStarted(false);
          }}
        />
        <RoundedButton
          title="20"
          size={75}
          onPress={() => {
            setMinutes(20);
            setProgress(1);
            setIsStarted(false);
          }}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.subjectTitle}>{focusSubject}</Text>
      </View>
      <View style={styles.barContainer}>
        <ProgressBar
          progress={progress}
          color={colors.transparentBlue}
          style={{ height: 10 }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            title="Pause"
            onPress={() => {
              setIsStarted(false);
            }}
          />
        ) : (
          <RoundedButton
            title="Start"
            onPress={() => {
              setIsStarted(true);
            }}
          />
        )}
      </View>
      <View style={styles.clearSubject}>
      <RoundedButton
            title="Clear"
            size={50}
            onPress={() => 
              clearSubject(focusSubject)}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    flex: 1,
    padding: spacing.lg,
  },
  countdown: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
    marginRight: spacing.sm,
  },
  subjectTitle: {
    fontSize: fontSizes.lg,
    color: colors.white,
    fontWeight: 'bold',
  },
  timeButtonWrapper: {
    flex: 0.2,
    flexDirection: 'row',
    padding: spacing.sm,
    justifyContent: 'space-around',
  },
  barContainer: {
    padding: spacing.xxl,
  },
  buttonWrapper: {
    flex: 0.3,
    padding: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject:{
   paddingLeft:spacing.xxl
  }
});
