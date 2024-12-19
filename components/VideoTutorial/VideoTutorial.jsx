import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ImageBackground,
} from 'react-native';
import { Video } from 'expo-av';

const videoData = {
    Director: [
        { id: '1', title: '1. Kirish qismini ko`rib chiqamiz', uri: 'http://fayllar1.ru/29/kinolar/Qurolli%20yovuzlar%202021%20480p%20O%27zbek%20tilida%20(asilmedia.net).mp4' },
        { id: '2', title: '2. Batafsil tushunish', uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { id: '3', title: '3. Yakuniy xulosa', uri: 'https://www.example.com/video3.mp4' },
    ],
    Admin: [
        { id: '1', title: '1. Admin Kirish', uri: 'https://www.example.com/admin1.mp4' },
        { id: '2', title: '2. Admin Vazifalari', uri: 'https://www.example.com/admin2.mp4' },
    ],
    Seller: [
        { id: '1', title: '1. Seller uchun Kirish', uri: 'https://www.example.com/seller1.mp4' },
        { id: '2', title: '2. Seller Qo`llanma', uri: 'https://www.example.com/seller2.mp4' },
    ],
};

const VideoTutorial = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [activeTab, setActiveTab] = useState('Director');

    const renderVideoItem = ({ item }) => (
        <View style={styles.videoCard}>
            {selectedVideo === item.uri ? (
                <Video
                    source={{ uri: item.uri }}
                    style={styles.videoPlayer}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                />
            ) : (
                <ImageBackground
                    source={{ uri: 'https://via.placeholder.com/300x200.png?text=Video+Thumbnail' }}
                    style={styles.thumbnail}
                >
                    <TouchableOpacity
                        style={styles.playButton}
                        onPress={() => setSelectedVideo(item.uri)}
                    >
                        <Text style={styles.playButtonText}>▶</Text>
                    </TouchableOpacity>
                </ImageBackground>
            )}
            <Text style={styles.videoTitle}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Tabs */}
            <View style={styles.tabContainer}>
                {Object.keys(videoData).map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[
                            styles.tabButton,
                            activeTab === tab && styles.activeTabButton,
                        ]}
                        onPress={() => {
                            setActiveTab(tab);
                            setSelectedVideo(null);
                        }}
                    >
                        <Text
                            style={[
                                styles.tabButtonText,
                                activeTab === tab && styles.activeTabButtonText,
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Video List */}
            <FlatList
                data={videoData[activeTab]}
                renderItem={renderVideoItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.videoList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        marginTop: 50,
    },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
    },
    activeTabButton: {
        backgroundColor: '#6200ea',
    },
    tabButtonText: {
        fontSize: 16,
        color: '#000',
    },
    activeTabButtonText: {
        color: '#fff',
    },
    videoList: {
        padding: 10,
    },
    videoCard: {
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 3,
    },
    thumbnail: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    videoTitle: {
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    videoPlayer: {
        height: 200,
        width: '100%',
    },
});

export default VideoTutorial;
