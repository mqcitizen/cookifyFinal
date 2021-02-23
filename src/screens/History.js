import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';

const History = () => {
  return (
    <>
      <View>
        <Text>Welcome </Text>
      </View>
      <AutoHeightWebView
        style={{width: Dimensions.get('window').width - 15, marginTop: 35}}
        onSizeUpdated={(size) => console.log(size.height)}
        viewportContent={'width=device-width, user-scalable=no'}
        scalesPageToFit={true}
        source={{uri: 'https://www.google.com'}}
      />
    </>
  );
};

export default History;
