import React, { useCallback, useMemo, useRef } from 'react';
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
    Dimensions,
    Button
} from 'react-native';

import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import { useNavigation } from '@react-navigation/core';
import AutoHeightImage from 'react-native-auto-height-image';

const Logo = require('../img/logo.png');
const chwidth = Dimensions.get('window').width;
const StoreLookPage = () => {
    // ref
    const bottomSheetModalRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['30%', '60%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);




    return (
        <BottomSheetModalProvider>
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
                    <Marker title="은비 냉국수" pinColor="#00c7ae" coordinate={{ latitude: 35.17106, longitude: 129.06929 }} onPress={() => {
                        console.log('-----------은비네 냉국수 클릭됌-----------');
                        handlePresentModalPress();
                    }}>
                    </Marker>

                    <Marker title="은비 떡볶이" pinColor="#00c7be" coordinate={{ latitude: 35.17853, longitude: 129.07045 }} onPress={() => console.log('-----------은비네 떡볶이 클릭됌-----------')} />
                    <Marker title="은비 칼국수" pinColor="#eed7ae" coordinate={{ latitude: 35.17360, longitude: 129.07629 }} onPress={() => console.log('-----------은비네 칼국수 클릭됌-----------')} />

                </MapView>
            </SafeAreaView>
        </BottomSheetModalProvider>
    );
};


export const style = StyleSheet.create({
    map: {
        height: '100%',
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default StoreLookPage;