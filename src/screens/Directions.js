import React from 'react';
import {Dimensions} from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';

const Directions = ({route}) => {
  let url = route.params?.url;
  console.log('url  ' + url);
  return (
    <>
      <AutoHeightWebView
        style={{width: Dimensions.get('window').width, marginHorizontal: 2}}
        scalesPageToFit={false}
        source={{uri: url || 'https://www.google.com'}}
      />
    </>
  );
};

export default Directions;
