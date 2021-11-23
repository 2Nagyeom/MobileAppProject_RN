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



const ManagerPage = () => {

  const [currentWait, setCurrentWait] = useState(0)
  const [currentTable, setCurrentTable] = useState(0)



  const [atManagernum, setAtManagernum] = useRecoilState(atomManagernum)
  const [atId, setAtId] = useRecoilState(atomUserId) //유저 아이디

  // const databasefunction = () => {
  //   database()
  //     .ref('/users/' + id)
  //     .once('value')
  //     .then((snapshot) => {
  //       console.log('-------------------로그인정보---------------------');
  //       console.log(snapshot.val());
  //       setAtId(id);
  //       setAtManagernum(snapshot.val().M_num);
  //     });
  // };

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
        <TouchableWithoutFeedback onPress={() => navigation.navigate('큐얼코드 확인 페이지')}>
          <View style={{
            height: '5%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}>
            <AutoHeightImage
              width={40}
              source={qrimg}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'right', color: '#6485E6' }}> QR코드 불러오기 </Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center'
        }}>
          <Text style={{
            color: 'black',
            fontSize: 40,
            fontWeight: 'bold',
            marginTop: 10,
          }}>"{atId}" 님</Text>
          <Text style={{
            color: 'black',
            fontSize: 40,
            fontWeight: 'bold',
            marginTop: 5,
          }}>환영합니다!</Text>
        </View>
        <View style={{ alignItems: 'center', flex: 1, marginBottom: 20 }}>
          <View>
            <AutoHeightImage
              width={200}
              source={Logo}
            />
          </View>
        </View>

        <View style={{
          flex: 1,
          backgroundColor: "#F7F7F7",
          borderRadius: 10,
        }}>
          <TouchableWithoutFeedback onPress={() => {
            // navigation.navigate('실시간 예약 페이지')
            Alert.alert(
              `테이블 수 : ${currentTable}개\n대기 팀 수 : ${currentWait}팀\n`, "",
              [
                {
                  text: "수정하기", onPress: () => {
                    console.log("수정하기 누름")
                    navigation.navigate("현재예약자 확인 페이지")
                  }
                }
              ])
          }}>
            <View style={{
              borderRadius: 60,
              borderWidth: 1,
              width: chwidth - 40,
              marginLeft: 20,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#6485E6',
              borderColor: '#6485E6',
            }}>
              <Text style={{ color: 'white' }}>실시간 예약자 확인하기</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("매장사장 상세페이지")}>
            <View style={{
              borderRadius: 60,
              borderWidth: 1,
              width: chwidth - 40,
              marginLeft: 20,
              marginTop: 10,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#6485E6',
              borderColor: '#6485E6',
            }}>
              <Text style={{ color: 'black' }}>예약자 확인하기</Text>
            </View>
          </TouchableWithoutFeedback>
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

export default ManagerPage;