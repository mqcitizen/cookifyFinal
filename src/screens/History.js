import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const History = () => {
  return (
    <View style={styles.main}>
      <View style={styles.sub}>
        <Text style={styles.text}>User History</Text>
      </View>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sub: {
    flex: 1,
    alignItems: 'center',
  },
  text: {fontSize: 32},
});
