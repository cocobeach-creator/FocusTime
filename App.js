import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Focus from './src/features/focus/Focus';
import { colors } from './src/utils/colors';
import Timer from './src/features/timer/Timer';
import { fontSizes, spacing } from './src/utils/sizes';
import RoundedButton from './src/components/RoundedButton';

// You can import from local files

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusSubject = (newSubject) => {
    setFocusSubject(newSubject);
  };

  const historyItem = ({ item, index }) => {
    return (
      <Text
        style={
          item.completed
            ? {
                color: colors.green,
                fontSize: fontSizes.lg,
                marginTop: spacing.md,
              }
            : {
                color: colors.pink,
                fontSize: fontSizes.lg,
                marginTop: spacing.md,
              }
        }>
        {item.task}
      </Text>
    );
  };

  const onTimerEnd = (subject) => {
    setFocusSubject(null);
    setFocusHistory([
      ...focusHistory,
      { key: String(focusHistory.length + 1), task: subject, completed: true },
    ]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={onTimerEnd}
          clearSubject={(subject) => {
            setFocusSubject(null);
            setFocusHistory([
              ...focusHistory,
              {
                key: String(focusHistory.length + 1),
                task: subject,
                completed: false,
              },
            ]);
          }}
        />
      ) : (
        <Focus addFocusSubject={addFocusSubject} />
      )}
      {focusHistory.length > 0 && !focusSubject && (
        <SafeAreaView style={styles.taskContainer}>
          <Text style={styles.title}>Things you've focused on:</Text>
          <FlatList
            style={{ flex: 0.5 }}
            contentContainerStyle={{ flex: 0.7, alignItems: 'center' }}
            data={focusHistory}
            renderItem={historyItem}
          />
          <View style={styles.button}>
            <RoundedButton
              title="Clear"
              size={50}
              onPress={() => setFocusHistory([])}
            />
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}

// {focusHistory.map((h) => (
//   <Text
//     style={
//       h.completed
//         ? {
//             color: colors.green,
//             fontSize: fontSizes.lg,
//             marginTop: spacing.md,
//           }
//         : {
//             color: colors.pink,
//             fontSize: fontSizes.lg,
//             marginTop: spacing.md,
//           }
//     }>
//     {h.task}
//   </Text>
// ))}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  taskContainer: {
    flex: 2,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
  },
  button: {
    flex: 0.3,
    marginTop: spacing.sm,
  },
});
