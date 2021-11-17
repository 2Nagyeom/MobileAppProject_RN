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
  const [id, setID] = useState('');
  const [pwd, setPWD] = useState('');

  const navigation = useNavigation();

  return (

    <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: '#F7F7F7' }}>
      <View
        style={{
          width: chwidth - 40,
          marginLeft: 20,
          marginTop: 40,
          justifyContent: 'center',
        }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{
            color: 'black',
            fontSize: 40,
            fontWeight: 'bold',
            marginTop: 30,
          }}>"사장님"</Text>
          <Text style={{
            color: 'black',
            fontSize: 40,
            fontWeight: 'bold',
            marginTop: 5,
          }}>환영합니다!</Text>
          <View style={{ marginTop: 100 }}>
            <View>
              <AutoHeightImage
                width={200}
                source={Logo}
              />
            </View>
          </View>

        </View>
      </View>

      <View style={{ marginLeft: 20, marginBottom: 40 }}>
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
          <Text style={{
            color: 'black',
            fontWeight: 'bold',
          }}>매장인원 업데이트</Text>
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
            backgroundColor: 'white',
            borderColor: '#6485E6',
          }}>
          <Text style={{
            color: 'black',
            fontWeight: 'bold',
          }}>로그인하기</Text>
        </View>

        <View style={{ marginTop: 60 }}
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
          <Text style={{
            color: 'black',
            fontWeight: 'bold',
          }}>메뉴관리</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ManagerPage;