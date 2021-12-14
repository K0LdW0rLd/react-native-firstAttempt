import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, Image, TouchableWithoutFeedback } from "react-native";
import { REACT_APP_GOOGLE_API_KEY } from "@env";


export default function Video (props) {
    const [listLoaded, listLoadedSet] = useState(false);
    const [videoList, videoListSet] = useState([]);

    useEffect(() => {
        return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=pluralsight&type=video&key=${REACT_APP_GOOGLE_API_KEY}`)
        .then((response) => response.json())
        .then((responseJson) => videoListSet(Array.from(responseJson.items)))
        .catch((error) => {
            console.log(error);
        })
        .finally(()=> listLoadedSet(true))
    }, []);

    const {navigate} = props.navigation;

    return(
        <View>
            {listLoaded && (
                <View style={{paddingTop: 30}}>
                    <FlatList
                        data={videoList}
                        renderItem={({item}) =>
                            <TubeItem 
                                navigate = {navigate}
                                id={item.id.videoId}
                                title={item.snippet.title}
                                imageSrc={item.snippet.thumbnails.high.url}
                            />
                        }
                    />
                </View>
            )}

            { !listLoaded && (
                <View style={{paddingTop: 30}}>
                    <Text>LOADING</Text>
                </View>
            )}

        </View>
    )
}


export function TubeItem (props) {
    
    const onPress = () => {
        props.navigate('VideoDetail', { ytubeId: props.id });
    };

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{paddingTop: 20, alignItems: 'center'}}>
                <Image 
                    style={{width: '100%', height: 200}}
                    source={{uri: props.imageSrc}}
                />
                <Text>
                    {props.title}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}