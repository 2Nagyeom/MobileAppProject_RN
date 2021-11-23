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
    Alert
} from 'react-native';

import database from '@react-native-firebase/database';

import { useNavigation } from '@react-navigation/core';
import AutoHeightImage from 'react-native-auto-height-image';
import { atomManagernum, atomUserId } from '../atom/atom';
import { useRecoilState } from 'recoil';

const Logo = require('../img/logo.png');
const qrimg = require('../img/qrcode.png');
const chwidth = Dimensions.get('window').width;



const qrcodeconfirmPage = () => {

    const [currentWait, setCurrentWait] = useState(0)
    const [currentTable, setCurrentTable] = useState(0)



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
                <View style={{
                    flex: 1,
                    marginTop: 10,
                    justifyContent: 'center',
                    backgroundColor: "#F7F7F7"
                }} />


                <View style={{ alignItems: 'center', flex: 1, marginBottom: 20 }}>
                    <View style={{

                        width: '70%',
                        height: '70%',
                        borderWidth: 10,
                        borderRadius: 10,
                        borderColor: '#6485E6',
                        borderStyle: 'dashed'
                    }}>

                    </View>
                </View>

                <View style={{
                    flex: 1,
                    backgroundColor: "#F7F7F7",
                    borderRadius: 10,
                }}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("메뉴 삭제 페이지")}>
                        <View style={{
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
                            <Text style={{ color: 'black' }}>메뉴 불러오기</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>


            </View>


        </SafeAreaView >
    );
};

export default qrcodeconfirmPage;