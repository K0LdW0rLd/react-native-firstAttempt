import React from 'react';
import {Text, View} from 'react-native';
import { WebView } from 'react-native-webview';

export default function VideoDetail (props) {
    const {navigation, route } = props;
    let tubeId = route.params.ytubeId;
    let tubeUrl = `https://www.youtube.com/embed/${tubeId}`;
    
    return (
        <WebView
            style={{marginTop: 20}}
            javaScriptEnabled={true}
            source={{uri: tubeUrl}}
        />
    );
}


