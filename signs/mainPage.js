import React from 'react';
import MapView, //맵 띄워준다
{
    Marker, //핀 찍어준다
    PROVIDER_DEFAULT,  //애플맵 제공
    PROVIDER_GOOGLE	//구글맵 제공
} from 'react-native-maps';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Dimensions
} from 'react-native';


import { useNavigation } from '@react-navigation/core';
import AutoHeightImage from 'react-native-auto-height-image';

const Logo = require('../img/logo.png');
const chwidth = Dimensions.get('window').width;

const mainPage = () => {
    return (
        <SafeAreaView>
            <MapView
                style={style.map} //height로 맵 크기 조절 해줘야 화면에 뜹니다.
                provider={PROVIDER_GOOGLE} //맵 제공할 회사 선택
                region={{ // 초기 좌표 설정
                    latitude: 35.17106, //위도, , , 
                    longitude: 129.06929, //경도
                    latitudeDelta: 0.025, //위도 확대(1에 가까워질 수록 zoom out)
                    longitudeDelta: 0.025, //경도 확대(1에 가까워질 수록 zoom out)
                }}>
                <Marker title="하고싶은 타이틀" pinColor="#00c7ae" coordinate={{ latitude: 35.17106, longitude: 129.06929 }} />
                <Marker title="하고싶은 타이틀" pinColor="#00c7be" coordinate={{ latitude: 35.17853, longitude: 129.07045 }} />
                <Marker title="하고싶은 타이틀" pinColor="#eed7ae" coordinate={{ latitude: 35.17360, longitude: 129.07629 }} />
            </MapView>
        </SafeAreaView>
    );
};


export const style = StyleSheet.create({
    map: {
        height: '100%',
    },
});

export default mainPage;