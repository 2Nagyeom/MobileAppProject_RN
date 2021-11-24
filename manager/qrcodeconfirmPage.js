import React, { useEffect, useState } from 'react';
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
    Modal
} from 'react-native';

import database from '@react-native-firebase/database';

import { useNavigation } from '@react-navigation/core';
import AutoHeightImage from 'react-native-auto-height-image';
import { atomManagernum, atomUserId } from '../atom/atom';
import { useRecoilState } from 'recoil';
import { RNCamera } from 'react-native-camera';

const Logo = require('../img/logo.png');
const qrimg = require('../img/qrcode.png');
const chwidth = Dimensions.get('window').width;



const qrcodeconfirmPage = () => {
    const navigation = useNavigation();

    const [currentWait, setCurrentWait] = useState(0)
    const [currentTable, setCurrentTable] = useState(0)

    const [isQrDetect, setIsQrDetect] = useState(false)

    const [atManagernum, setAtManagernum] = useRecoilState(atomManagernum)
    const [atId, setAtId] = useRecoilState(atomUserId) //유저 아이디

    //qr에서 뽑은데이터들
    const [userId, setUserId] = useState('')
    const [userPh, setUserPh] = useState('')
    const [userStoreName, setUserStoreName] = useState('')
    const [userStoreNum, setUserStoreNum] = useState('')
    const [userStoreDate, setUserStoreDate] = useState('')
    const [userStoreDay, setUserStoreDay] = useState('')
    /////////////////////////

    // const databasefunction = () => {
    //     database()
    //         .ref('/users/' + id)
    //         .once('value')
    //         .then((snapshot) => {
    //             console.log('-------------------로그인정보---------------------');
    //             console.log(snapshot.val());
    //             setAtId(id);
    //             setAtManagernum(snapshot.val().M_num);
    //         });
    // };

    function dataDelete(params) {
        const dataRef = database().ref('/reserve/' + userStoreNum + '/' + userId)


        dataRef.once('value').then((res) => {
            console.log(res.val() + userStoreName + userId);
            if (res.val()) {
                dataRef.remove().then(() => {
                    Alert.alert('입장 완료가 확인되었습니다!')
                    navigation.goBack()
                })
            }
        })
    }

    useEffect(() => {
        if (userStoreNum) {
            const dataRef = database().ref('/store/' + userStoreNum)
            dataRef.once('value').then((res) => {
                if (res.val()) {
                    setUserStoreName(res.val().name)
                }
            })
        }
    }, [userStoreNum])


    return (

        <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: '#F7F7F7', flex: 1 }}>
            <View style={{
                flex: 1,
                marginTop: 10,
                justifyContent: 'center',
                backgroundColor: "#F7F7F7"
            }}>

                <RNCamera
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        if (Object.keys(barcodes).length > 0) {
                            console.log(barcodes[0].data)

                            // setUserStoreName()
                            setUserStoreNum(barcodes[0].data.split('/')[0])
                            setUserPh(barcodes[0].data.split('/')[4])
                            setUserId(barcodes[0].data.split('/')[1])
                            setUserStoreDate(barcodes[0].data.split('/')[2])
                            setUserStoreDay(barcodes[0].data.split('/')[3])
                            setIsQrDetect(true)
                        }
                        // if (barcodes[0].data !== null) {
                        //     console.log(barcodes[0].data);
                        // } else {

                        // }
                    }}
                >

                    <View style={{ alignItems: 'center', flex: 1, marginBottom: 20, justifyContent: 'center' }}>
                        <View style={{
                            width: chwidth / 1.5,
                            height: chwidth / 1.5,
                            borderWidth: 10,
                            borderRadius: 10,
                            borderColor: '#6485E6',
                            borderStyle: 'dashed'
                        }}>
                        </View>
                    </View>
                </RNCamera>

                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <View style={{
                        marginBottom: 10,
                        marginTop: 60,
                        borderRadius: 60,
                        borderWidth: 1,
                        marginLeft: 20,
                        width: chwidth - 40,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: '#6485E6',
                    }}>
                        <Text style={{ color: 'black' }}>뒤로가기</Text>
                    </View>
                </TouchableWithoutFeedback>

            </View>

            <Modal visible={isQrDetect} animationType={'slide'}>
                <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{
                        padding: 20,
                        justifyContent: 'center',
                        width: chwidth - 40,
                        marginLeft: 20,
                        borderRadius: 20,
                        borderWidth: 10,
                        borderColor: '#6485E6',
                        marginTop: 20,
                    }}>
                        <View style={{
                            alignItems: 'flex-start',
                            marginLeft: 20,
                        }}>
                            <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginBottom: 40 }}>매장 이름 : {userStoreName}</Text>
                            <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginBottom: 40 }}>아이디 : {userId}</Text>
                            <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginBottom: 40 }}>전화번호 : {userPh}</Text>
                            <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginBottom: 40 }}>예약날짜 : {userStoreDate == 'now' ? '오늘' : userStoreDate}</Text>
                            <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginBottom: 40 }}>예약시간 : {userStoreDay == 'now' ? '현재 입장' : userStoreDay}</Text>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: chwidth - 40,
                        marginLeft: 20
                    }}>
                        <Text style={{ textAlign: 'center', fontSize: 35, fontWeight: 'bold' }}>위 고객의 입장을</Text>
                        <Text style={{ textAlign: 'center', fontSize: 35, fontWeight: 'bold' }}>확인하시겠습니까?</Text>
                    </View>

                    <TouchableWithoutFeedback onPress={() => {
                        dataDelete()
                    }}>
                        <View style={{
                            marginLeft: 20,
                            borderRadius: 60,
                            borderWidth: 1,
                            width: chwidth - 40,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#6485E6',
                            borderColor: '#6485E6',
                        }}>
                            <Text>확인</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
                        <View style={{
                            marginTop: 5,
                            marginLeft: 20,
                            borderRadius: 60,
                            marginBottom: 10,
                            borderWidth: 1,
                            width: chwidth - 40,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            borderColor: '#6485E6',
                        }}>
                            <Text>취소</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </SafeAreaView>
            </Modal>


        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});

export default qrcodeconfirmPage;