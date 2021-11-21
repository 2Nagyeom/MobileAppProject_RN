
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


const qrcodePage = () => {

    const navigation = useNavigation();

    const [atId, setAtId] = useRecoilState(atomUserId) //유저 아이디

    const [storeName, setStoreName] = useState('')
    const [storeDay, setStoreDay] = useState('')
    const [storeTime, setStoreTime] = useState('')

    const [userQrCode, setUserQrCode] = useState('')

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
                <Text>입장 확인</Text>
                <Text>{storeName}</Text>
                <Text>{storeDay}</Text>
                <Text>{storeTime}</Text>
            </View>

            <View style={{ marginBottom: 10, }}>
                <Text style={{ fontSize: 20, }}>입장 QR코드 입니다!</Text>
                {/* <Text>{userQrCode}</Text> */}
            </View>
            <Image source={{ uri: userQrCode }} style={{ backgroundColor: 'white', width: 200, height: 200 }} />
            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('메인페이지');
            }}>
                <View style={{ marginTop: 40, }}>
                    <Text style={{ fontSize: 15 }}>뒤로가기</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default qrcodePage;
