
import React, { useEffect, useRef, useState } from 'react';
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

import database from '@react-native-firebase/database';
import { useRecoilState } from 'recoil';
import { atomUserId } from '../atom/atom';

import RNQRGenerator from 'rn-qr-generator';
import AutoHeightImage from 'react-native-auto-height-image';
import { color } from 'react-native-reanimated';

const chwidth = Dimensions.get('window').width;


const qrcodePage = () => {

    const navigation = useNavigation();

    const [atId, setAtId] = useRecoilState(atomUserId) //유저 아이디

    const [userQrCode, setUserQrCode] = useState('')

    const [storeName, setStoreName] = useState('')
    const [storeDay, setStoreDay] = useState('')
    const [storeTime, setStoreTime] = useState('')

    function QrLoad(params) {
        database()
            .ref(`/users/${atId}`)
            .once('value').then((res) => {
                if (res.val().qrcode == null) {
                    Alert.alert('예약정보가 없습니다!')
                    navigation.navigate('메인페이지')
                } else {
                    // setUserQrCode(res.val().qrcode)
                    QRGenerate(res.val().qrcode)
                    reservLoad(res.val().qrcode.split('/')[0])
                }
            })
    }

    function reservLoad(storenum) {
        database()
            .ref(`/reserve/${storenum}/${atId}`)
            .once('value').then((res) => {
                setStoreName(res.val().storeName)
                setStoreTime(res.val().time)
                setStoreDay(res.val().day)
            })
    }

    function QRGenerate(param = '') {
        RNQRGenerator.generate({
            value: param,
            height: 200,
            width: 200,
            base64: true
        })
            .then(response => {
                console.log(response)
                const { uri, width, height, base64 } = response;
                setUserQrCode('data:image/png;base64,' + base64);
            })
            .catch(error => console.log('Cannot create QR code', error));
    }




    useEffect(() => {
        QrLoad()
    }, [])



    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View>
                <Text style={{
                    marginBottom: 10,
                    fontSize: 40,
                    fontWeight: 'bold',
                    color: 'black'
                }} >입장 확인</Text>
            </View>
            <View style={{
                marginRight: 15,
                borderRadius: 40,
                borderWidth: 8,
                width: chwidth - 70,
                marginLeft: 20,
                marginBottom: 20,
                height: 140,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                borderColor: '#6485E6',
            }}>
                <Text style={{ fontSize: 25, marginBottom: 5 }}>{storeName}</Text>
                <Text style={{ fontSize: 25, marginBottom: 5, color: 'red' }}>{(storeDay == 'now' ? '오늘' : storeDay)}</Text>
                <Text style={{ fontSize: 25, color: 'red' }}>{(storeTime == 'now' ? '현재 입장 가능' : storeTime)}</Text>
            </View>

            <View style={{ marginBottom: 10, }}>

                {/* <Text>{userQrCode}</Text> */}
            </View>
            <View>
                <View style={{
                    marginRight: 15,
                    borderRadius: 60,
                    borderWidth: 1,
                    width: chwidth - 70,
                    marginLeft: 20,
                    height: 300,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#6485E6',
                    borderColor: '#6485E6',
                }}>
                    <Text style={{
                        marginBottom: 10,
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white'
                    }}>입장 QR코드</Text>
                    <Image source={{ uri: userQrCode }}
                        style={{
                            backgroundColor: 'white',
                            width: 200,
                            height: 200,
                            marginBottom: 10,
                        }} />
                </View>
            </View>

            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('메인페이지');
            }}>
                <View style={{ marginTop: 30, }}>
                    <Text style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: '#6485E6'
                    }}>뒤로가기</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default qrcodePage;
