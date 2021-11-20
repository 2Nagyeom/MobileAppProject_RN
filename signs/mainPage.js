import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
    Alert
} from 'react-native';


import { useNavigation } from '@react-navigation/core';
import AutoHeightImage from 'react-native-auto-height-image';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const Logo = require('../img/logo.png');
const chwidth = Dimensions.get('window').width;

const mainPage = () => {

    const bottomSheetModalRef = useRef(< BottomSheetModal />);
    const snapPoints = useMemo(() => ['75%', '50%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = (index) => {
        console.log(index)
        if (index === -1) {
            setMapHeight('100%')
        } else if (index === 0) {
            setMapHeight('50%')
        } else {
            setMapHeight('25%')
        }
    }

    useEffect(() => {
        console.log(snapPoints)
    }, [snapPoints])

    const [mapheight, setMapHeight] = useState('100%')


    const styles = StyleSheet.create({
        map: {
            height: mapheight,
        },
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

    return (
        <BottomSheetModalProvider>
            <SafeAreaView>
                <MapView
                    style={styles.map} //height로 맵 크기 조절 해줘야 화면에 뜹니다.
                    provider={PROVIDER_GOOGLE} //맵 제공할 회사 선택
                    region={{ // 초기 좌표 설정
                        latitude: 35.17106, //위도, , , 
                        longitude: 129.06929, //경도
                        latitudeDelta: 0.025, //위도 확대(1에 가까워질 수록 zoom out)
                        longitudeDelta: 0.025, //경도 확대(1에 가까워질 수록 zoom out)
                    }}>
                    <Marker title="은비네칼국수" identifier={'은비네칼국수'} onPress={
                        e => {
                            // Alert.alert(e.id + '클릭됨')
                            handlePresentModalPress()
                        }}
                        pinColor="#00c7ae" coordinate={{ latitude: 35.17106, longitude: 129.06929 }} />
                    <Marker title="하고싶은 타이틀" pinColor="#00c7be" coordinate={{ latitude: 35.17853, longitude: 129.07045 }} />
                    <Marker title="하고싶은 타이틀" pinColor="#eed7ae" coordinate={{ latitude: 35.17360, longitude: 129.07629 }} />
                </MapView>

                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                >
                    <View style={styles.contentContainer}>
                        <Text>Awesome 🎉</Text>
                    </View>
                </BottomSheetModal>

            </SafeAreaView>
        </BottomSheetModalProvider>
    );


};




export default mainPage;