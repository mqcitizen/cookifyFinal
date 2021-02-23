import React from 'react';
import {Dimensions} from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';

const Directions = ({route}) => {
  let url = route.params?.url;
  console.log('url  ' + url);
  return (
    <>
      <AutoHeightWebView
        style={{width: Dimensions.get('window').width, marginHorizontal: 5}}
        scalesPageToFit={false}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        scrollEnabledWithZoomedin={true}
        source={{uri: url || 'https://www.google.com'}}
      />
    </>
  );
};

export default Directions;
