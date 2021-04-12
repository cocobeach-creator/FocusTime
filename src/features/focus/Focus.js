import React, { useState } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import RoundedButton from '../../components/RoundedButton';
import {fontSizes, spacing} from "../../utils/sizes";
import {colors} from "../../utils/colors";

export default function Focus({ addFocusSubject }) {
  const [subject, setSubject] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={text => 
              setSubject(text)}
            style={styles.input}
          />
          <RoundedButton
            size={50}
            title="+"
            onPress={() => {
              addFocusSubject(subject);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: spacing.xxxl
  },
  titleContainer: {
    flex: 0.5,
    padding: Platform.OS === 'android' ? spacing.md : 40,
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: spacing.md,
  },
});
