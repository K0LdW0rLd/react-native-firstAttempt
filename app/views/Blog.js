import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, useWindowDimensions} from "react-native";
import RenderHtml from 'react-native-render-html';

export default function Blog(props) {
    const [loaded, loadedSet] = useState(false);
    const [blogList, blogListSet] = useState([]);
    const apiUrl = "https://public-api.wordpress.com/rest/v1.1/sites/k0ldw0rld.wordpress.com/posts";

    useEffect(() => {
        const fetchData = async () => {
            await fetch(apiUrl)
                .then((response) => response.json())
                .then((responseJson) => blogListSet(Array.from(responseJson.posts)))
                .catch((error) => {
                    console.log(error);
                });
            loadedSet(true);
            };
            fetchData();
    }, []);
;
    const chooseBlog = (blogId) => {
        props.navigation.navigate('BlogDetail', {blogId: blogId});
    }

    return (
        <View>
            {loaded && (
                <View style={{paddingTop: 40}} >
                    <FlatList 
                        data={blogList}
                        keyExtractor={(item, index) => item.ID.toString()}
                        renderItem={({item}) => 
                            <BlogItem
                                id={item.ID}
                                title={item.title}
                                imageSrc={item.featured_image}
                                excerpt={item.excerpt}
                                choosePost={chooseBlog}
                            />
                        }
                    />
                </View>
            )}

            {!loaded && (
                <View style={{paddingTop:30}}>
                    <Text>LOADING</Text>
                </View>
            )}
        </View>
    )
}

export function BlogItem (props) {
    const { width } = useWindowDimensions();
    let blogItems = {
        html: `<a href=${props.id} style="textDecorationLine: none; color: #000000; textAlign: center">
        <img src=${props.imageSrc} />
        <h1>${props.title}</h1>
        ${props.excerpt}
    </a>`};

    const renderersProps = {
        a: {
            onPress() {
                props.choosePost(props.id)
            }
        }
    }

    return (
        <View style={{borderBottomWidth: 2, borderBottomColor: '#000000', borderStyle:'solid'}}>
            <RenderHtml contentWidth={width} source={blogItems} renderersProps={renderersProps}/>
        </View>
    )
}