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

const call = require('../img/call.png');
const message = require('../img/message.png');
const gps = require('../img/gps.png');
const clock = require('../img/clock.png');

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
                    <View
                        style={{
                            width: chwidth - 40,
                            marginLeft: 20,
                            marginTop: 40,
                        }}>
                        <View>
                            <Text style={{
                                fontSize: 45,
                            }}>은비칼국수</Text>
                        </View>

                        <View
                            style={{
                                marginTop: 60,
                                borderRadius: 60,
                                borderWidth: 1,
                                width: chwidth - 40,
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#6485E6',
                                borderColor: '#6485E6',
                            }}>
                            <Text style={{ color: 'white' }}>실시간 예약하기</Text>
                        </View>
                        <View
                            style={{
                                marginTop: 20,
                                borderRadius: 60,
                                borderWidth: 1,
                                width: chwidth - 40,
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#6485E6',
                                borderColor: '#6485E6',
                            }}>
                            <Text style={{ color: 'white' }}>예약하기</Text>
                        </View>
                        <View style={{
                            marginTop: 30
                        }}>
                            <Text style={{
                                textAlign: 'center'
                            }}>문의하기</Text>
                        </View>
                        <View
                            style={{
                                marginTop: 10,
                                borderRadius: 60,
                                borderWidth: 1,
                                width: chwidth - 40,
                                height: 80,
                                borderColor: '#6485E6',
                                justifyContent: 'center',
                                flexDirection: 'row',
                            }}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1
                            }}>
                                <AutoHeightImage
                                    width={50}
                                    source={call}
                                />
                            </View>
                            <View style={{
                                borderWidth: 1,
                                borderColor: '#6485E6',
                                height: '100%',
                            }}>
                            </View>
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1
                            }}>
                                <AutoHeightImage
                                    width={50}
                                    source={message}
                                />
                            </View>
                        </View>
                        <View style={{
                            marginTop: 100,
                        }}>
                            <View style={{
                                width: chwidth - 50,
                                marginLeft: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <AutoHeightImage
                                    width={30}
                                    source={gps}
                                />
                                <Text style={{
                                    marginLeft: 30,
                                    fontSize: 20
                                }}>남구 용당동</Text>
                            </View>
                            <View style={{
                                marginTop: 40,
                                width: chwidth - 50,
                                marginLeft: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <AutoHeightImage
                                    width={30}
                                    source={clock}
                                />
                                <Text style={{
                                    marginLeft: 30,
                                    fontSize: 20
                                }}>10 : 00 ~ 22 : 00</Text>
                            </View>
                            <View style={{
                                marginTop: 40,
                                width: chwidth - 50,
                                marginLeft: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <AutoHeightImage
                                    width={30}
                                    source={call}
                                />
                                <Text style={{
                                    marginLeft: 30,
                                    fontSize: 20
                                }}>1111-1111-1111</Text>
                            </View>
                        </View>
                    </View>
                </BottomSheetModal>

            </SafeAreaView>
        </BottomSheetModalProvider>
    );


};




export default mainPage;