
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
                }
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
            <View style={{ marginBottom: 20, }}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: '#6485E6'
                }}>입장 QR코드 입니다!</Text>
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
                    <Image source={{ uri: userQrCode }} style={{ backgroundColor: 'white', width: 200, height: 200 }} />
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
