import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, useWindowDimensions, Image, ScrollView} from "react-native";
import RenderHtml from 'react-native-render-html';

export default function BlogDetail(props) {
    const { width } = useWindowDimensions();
    const {navigation, route } = props;
    let blogId = route.params.blogId;
    let apiUrl = `https://public-api.wordpress.com/rest/v1.1/sites/k0ldw0rld.wordpress.com/posts/${blogId}`;

    const [loaded, loadedSet] = useState(false);
    const [post, postSet] = useState({
        postTitle: '',
        postImage: '',
        postContent: '',
        postID: 0
    })

    useEffect(() => {
        const fetchData = async () => {
            await fetch(apiUrl)
                .then((response) => response.json())
                .then((responseJson) => postSet({
                    ...post,
                    postTitle: responseJson.title,
                    postImage: responseJson.featured_image,
                    postContent: responseJson.content,
                    postID: responseJson.ID
                }))
                .catch((error) => {
                    console.log(error);
                });
            loadedSet(true);
            };
            fetchData();
    }, []);

    const blogTagStyles = {
        img: {display: 'none'},
    };

    const blogClassStyles = {
        blTitle: {marginLeft: 'auto', marginRight: 'auto'},
        blContent: {marginLeft: 10, marginRight: 10},
        blBack: {marginLeft: 'auto', marginRight: 'auto', paddingBottom: 20}
    }

    let postDetails = {
        html: `
        <div class="blTitle">
            <h1>${post.postTitle}</h1>
        </div>
        <div class="blContent">
            ${post.postContent}
        </div>
        <div class="blBack">
            <a href=${post.postID} style="textDecorationLine: none; color: #000000">
                <h2>GO BACK</h2>
            </a>
        </div>`
    };

    const renderersProps = {
        a: {
            onPress() {
                props.navigation.navigate('Blog');
            }
        }
    }
    
    return (
        <View style={{paddingTop: 30 }}>
            {loaded && (
                <ScrollView>
                    <Image 
                        style={{width: '100%', height: 200}}
                        source={{uri: post.postImage}}
                    />
                    <RenderHtml 
                        contentWidth={width} 
                        source={postDetails} 
                        tagsStyles={blogTagStyles}
                        classesStyles={blogClassStyles}
                        renderersProps={renderersProps}
                    />
                </ScrollView>
            )}
            {!loaded && (
                <View style={{paddingTop:20, alignItems: 'center'}}>
                    <Text>LOADING</Text>
                </View>
            )}
        </View>
    )

}