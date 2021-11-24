import React, { useState } from 'react';
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

    const [currentWait, setCurrentWait] = useState(0)
    const [currentTable, setCurrentTable] = useState(0)

    const [isQrDetect, setIsQrDetect] = useState(false)

    const [atManagernum, setAtManagernum] = useRecoilState(atomManagernum)
    const [atId, setAtId] = useRecoilState(atomUserId) //유저 아이디

    const databasefunction = () => {
        database()
            .ref('/users/' + id)
            .once('value')
            .then((snapshot) => {
                console.log('-------------------로그인정보---------------------');
                console.log(snapshot.val());
                setAtId(id);
                setAtManagernum(snapshot.val().M_num);
            });
    };

    const [id, setID] = useState('');
    const [pwd, setPWD] = useState('');

    const navigation = useNavigation();

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
                        if (barcodes) {
                            console.log(barcodes[0].data);
                            setIsQrDetect(true)
                        } else {

                        }
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
                    <View style={{ flex: 1 }}>
                        <Text>가계이름</Text>
                        <Text>아이디</Text>
                        <Text>전화번호</Text>

                        <Text>위 고객의 입장을 확인하시겠습니까?</Text>
                    </View>

                    <View style={{
                        width: chwidth - 40,
                        marginLeft: 20,
                        padding: 10,
                        marginBottom: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'yellow'
                    }}>
                        <Text>확인</Text>
                    </View>

                    <TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
                        <View style={{
                            width: chwidth - 40,
                            marginLeft: 20,
                            padding: 10,
                            marginBottom: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'yellow'
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