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
  Dimensions
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import AutoHeightImage from 'react-native-auto-height-image';

const Logo = require('../img/logo.png');
const chwidth = Dimensions.get('window').width;



const ManagerPage = () => {

  const databasefunction = () => {
    database()
      .ref('/users/' + id)
      .once('value')
      .then((snapshot) => {
        console.log('-------------------로그인정보---------------------');
        console.log(snapshot.val());
      });
  };

  const [id, setID] = useState('');
  const [pwd, setPWD] = useState('');

  const navigation = useNavigation();

  return (

    <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: '#F7F7F7', flex: 1 }}>
      <View
        style={{
          flex: 1,
          marginTop: 10,
          justifyContent: 'center',
          backgroundColor: "#F7F7F7"
        }}>
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
          }}>"사장님"</Text>
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
          <TouchableWithoutFeedback>
            <View
              style={{
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
          <TouchableWithoutFeedback onPress={() => navigation.navigate("매장사장상세페이지")}>
            <View
              style={{
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
            <View style={{ marginTop: 60 }}
              style={{
                marginTop: 15,
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