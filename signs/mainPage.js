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
    Alert,
    Modal,
    Platform
} from 'react-native';

import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/core';
import AutoHeightImage from 'react-native-auto-height-image';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { noWait, useRecoilState } from 'recoil';
import { atomStoreName, atomStorenum, atomUserId, atomUserPhone } from '../atom/atom';
import Drawer from 'react-native-drawer';

const Logo = require('../img/logo.png');
const logout = require('../img/logout.png');
const finish = require('../img/finish.png');
const revise = require('../img/revise.png');

const chwidth = Dimensions.get('window').width;

const call = require('../img/call.png');
const message = require('../img/message.png');
const gps = require('../img/gps.png');
const clock = require('../img/clock.png');
const menu = require('../img/menu.png');

const mainPage = () => {
    const navigation = useNavigation()

    const bottomSheetModalRef = useRef(< BottomSheetModal />);
    const mapRef = useRef(<MapView></MapView>)
    const snapPoints = useMemo(() => ['75%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = (index) => {
        // console.log(index)
        if (index === -1) {
            setMapHeight('100%')
        } else {
            setMapHeight('50%')
        }
    }
    //바텀시트 준비물 끝////////////////////////////////////////////////////////////////////////////////////////

    const [storeArray, setStoreArray] = useState([])

    async function getStore(params) {
        database().ref('/store/').once('value').then((res) => {
            if (res.val() == null) {
                setStoreArray([]);
                Alert.alert('주변가계가 없습니다.')
            } else {
                setStoreArray((rr) => [...rr, res.val().M1, res.val().M2]);
                console.log(res.val())
                console.log()
            }
        });
    }

    function waitPlusOne(params) {
        const dataRef = database().ref('/store/' + atStoreNum);

        dataRef.once('value').then((rr) => {
            var cc = rr.val().wait + 1
            dataRef.update({ wait: cc }).then(() => {
                Alert.alert("예약되었습니다!");
                navigation.navigate('큐얼코드페이지');
                console.log('함수실행됌');
            })
        })
    }

    function QrcodeSave(params) {
        database()
            .ref(`/users/${atId}`)
            .update({
                qrcode: atStoreNum + '/' + atId + '/now/now/' + atPhone,
            })
            .then(() => {
                console.log('-------------------qrsave 완료---------------------');

                // navigation.navigate('큐얼코드페이지')
            });
    }


    function qrcodereservation(params) {
        database()
            .ref('/reserve/' + atStoreNum + '/' + atId)
            .set({
                id: atId,
                time: 'now',
                day: 'now',
                phone: atPhone,
                M_num: atStoreNum,
                storeName: atStoreName,
            })
            .then(() => {
                QrcodeSave()
                waitPlusOne()
            })
    }

    useEffect(() => {
        getStore()
    }, [])




    const [currentWait, setCurrentWait] = useState(0)
    const [currentTable, setCurrentTable] = useState(0)

    const [atId, setAtId] = useRecoilState(atomUserId) //유저 아이디
    const [atPhone, setAtPhone] = useRecoilState(atomUserPhone)//유저번호

    const [atStoreNum, setAtStoreNum] = useRecoilState(atomStorenum) //마커 선택한 스토어 번호
    const [atStoreName, setAtStoreName] = useRecoilState(atomStoreName) //마커 선택한 스토어 이름

    const [storeMenuArray, setStoreMenuArray] = useState([])

    const [mapheight, setMapHeight] = useState('100%'); //마커 클릭시 맵의 크기 변경을 위한 함수

    const [pName, setPName] = useState('이름!');
    const [pAdress, setPAdress] = useState('주소!');
    const [pTime, setPTime] = useState('영업시간!');
    const [PNumber, setPNumber] = useState('전화번호!');
    //바텀 시트에 들어갈 값들!

    function StoreMenuLoad(params) {
        const dataRef = database().ref('/menu/M1')

        dataRef.once('value').then((res) => {
            if (res.val() != null) {
                console.log(res.val())
            } else {
                console.log('메뉴불러오기 실패');
            }
        })

    }

    useEffect(() => {
        console.log(atStoreNum)
        StoreMenuLoad()
    }, [atStoreNum])


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

    var drowerRef = useRef()

    const closeControlPanel = () => {
        drowerRef.close()
    };
    const openControlPanel = () => {
        drowerRef.open()
    };

    return (
        <Drawer
            ref={(ref) => drowerRef = ref}
            content={<ControlPanel />}
            openDrawerOffset={chwidth / 2}
        >
            <BottomSheetModalProvider>
                <SafeAreaView>
                    <MapView
                        ref={mapRef}
                        style={styles.map} //height로 맵 크기 조절 해줘야 화면에 뜹니다.
                        provider={PROVIDER_GOOGLE} //맵 제공할 회사 선택
                        region={{ // 초기 좌표 설정
                            latitude: 35.17106, //위도, , , 
                            longitude: 129.06929, //경도
                            latitudeDelta: 0.025, //위도 확대(1에 가까워질 수록 zoom out)
                            longitudeDelta: 0.025, //경도 확대(1에 가까워질 수록 zoom out)
                        }}>
                        {storeArray.map((value, index) => {
                            // console.log(value)
                            return (
                                <Marker key={index} title={value.name} identifier={value.name} onPress={
                                    (e) => {
                                        // console.log(e.nativeEvent)
                                        // Alert.alert(e.id + '클릭됨')
                                        handlePresentModalPress()
                                        setPName(value.name)
                                        setPAdress(value.adress)
                                        setPNumber(value.call)
                                        setPTime(value.time)

                                        setAtStoreNum(value.M_num)
                                        setAtStoreName(value.name)

                                        setCurrentTable(value.quest)
                                        setCurrentWait(value.wait)
                                    }}
                                    pinColor="#00c7ae" coordinate={{ latitude: Number(value.gps.split('/')[0]), longitude: Number(value.gps.split('/')[1]) }} />
                            )
                        })}

                        {/* <Marker title="은비네칼국수" identifier={'은비네칼국수'} onPress={
                        e => {
                            console.log(e.nativeEvent)
                            // Alert.alert(e.id + '클릭됨')
                            handlePresentModalPress()
                        }}
                        pinColor="#00c7ae" coordinate={{ latitude: 35.17106, longitude: 129.06929 }} />
                    <Marker title="하고싶은 타이틀" pinColor="#00c7be" coordinate={{ latitude: 35.17853, longitude: 129.07045 }} />
                    <Marker title="하고싶은 타이틀" pinColor="#eed7ae" coordinate={{ latitude: 35.17360, longitude: 129.07629 }} /> */}
                    </MapView>

                    {/* 왼쪽 위 버튼! */}
                    <TouchableWithoutFeedback onPress={() => { openControlPanel() }}>
                        <SafeAreaView style={{
                            position: 'absolute',
                            marginTop: Platform.OS === 'ios' ? 45 : 10,
                            marginLeft: 10,
                            width: 50,
                            height: 50,
                            borderRadius: 5,
                            backgroundColor: 'white',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <AutoHeightImage
                                width={40}
                                source={menu}
                            />

                        </SafeAreaView>
                    </TouchableWithoutFeedback>
                    {/* 왼쪽 위 버튼 끝! */}

                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={0}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                    >
                        <BottomSheetScrollView>
                            <View
                                style={{
                                    width: chwidth - 40,
                                    marginLeft: 20,
                                    marginTop: 10
                                }}>
                                <View>
                                    <Text style={{
                                        fontSize: 30,
                                        color: 'black'
                                    }}>{pName}</Text>
                                </View>

                                <TouchableWithoutFeedback onPress={() => {
                                    Alert.alert(`현재 ${atStoreName} 상황`,
                                        `테이블 수 : ${currentTable}개\n대기 팀 수 : ${currentWait}팀\n\n예약하시겠습니까?`, [
                                        {
                                            text: "취소",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                        },
                                        {
                                            text: "예약하기", onPress: () => {
                                                console.log("OK Pressed"),
                                                    qrcodereservation();
                                            }
                                        }
                                    ])
                                }}>
                                    <View style={{
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
                                        <Text style={{ color: 'white' }}>실시간 예약하기</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    navigation.navigate('예약페이지')
                                }}>
                                    <View style={{
                                        marginTop: 10,
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
                                </TouchableWithoutFeedback>
                                <View style={{
                                    marginTop: 20
                                }}>
                                    <Text style={{
                                        textAlign: 'center'
                                    }}>문의하기</Text>
                                </View>
                                <View style={{
                                    marginTop: 5,
                                    borderRadius: 60,
                                    borderWidth: 1,
                                    width: chwidth - 40,
                                    height: 60,
                                    borderColor: '#6485E6',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                }}>
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flex: 1, backgroundColor: '#6485E6', borderTopLeftRadius: 60, borderBottomLeftRadius: 60
                                    }}>
                                        <AutoHeightImage
                                            width={30}
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
                                            width={30}
                                            source={message}
                                        />
                                    </View>
                                </View>


                                <View style={{ width: chwidth, backgroundColor: 'yellow' }}>
                                    <ScrollView style={{}} horizontal={true} >

                                    </ScrollView>
                                </View>



                                <View style={{
                                    marginTop: 50,
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
                                        }}>{pAdress}</Text>
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
                                        }}>{pTime}</Text>
                                    </View>
                                    <View style={{
                                        marginTop: 40,
                                        width: chwidth - 50,
                                        marginLeft: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginBottom: 40
                                    }}>
                                        <AutoHeightImage
                                            width={30}
                                            source={call}
                                        />
                                        <Text style={{
                                            marginLeft: 30,
                                            fontSize: 20
                                        }}>{PNumber}</Text>
                                    </View>
                                </View>
                            </View>
                        </BottomSheetScrollView>
                    </BottomSheetModal>

                </SafeAreaView>
            </BottomSheetModalProvider>

        </Drawer>
    );


};

const ControlPanel = () => {
    const [atId, setAtId] = useRecoilState(atomUserId) //유저 아이디

    const navigation = useNavigation()
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                marginBottom: 10,
                borderWidth: 0.5,
                backgroundColor: '#6485E6'
            }}>
                <Text style={{ marginLeft: 10, fontSize: 30, fontWeight: 'bold', marginTop: 20, marginBottom: 20 }}>{atId} 님</Text>

            </View>
            <TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: 30, justifyContent: 'center' }}>
                        <AutoHeightImage
                            width={20}
                            source={logout}
                        />
                    </View>
                    <Text style={{ fontSize: 20, margin: 10 }}>로그아웃</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => { navigation.navigate('큐얼코드페이지') }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: 30, justifyContent: 'center' }}>
                        <AutoHeightImage
                            width={20}
                            source={finish}
                        />
                    </View>
                    <Text style={{ fontSize: 20, margin: 10 }}>예약확인</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => { navigation.navigate('정보수정 페이지') }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: 30, justifyContent: 'center' }}>
                        <AutoHeightImage
                            width={20}
                            source={revise}
                        />
                    </View>
                    <Text style={{ fontSize: 20, margin: 10 }}>정보수정</Text>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}




export default mainPage;