import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import LoginPage from './signs/loginPage';
import RegisterPage from './signs/registerPage';
import M_RegisterPage from './signs/m_registerPage';
import ManagerPage from './signs/managerPage';
import bookerPage from './signs/bookerPage';
import enrollmentPage from './signs/enrollmentPage';
import revisePage from './signs/revisePage';
import deletePage from './signs/deletePage';
import storeregisterPage from './signs/storeregisterPage';
import mainPage from './signs/mainPage';
import M_storedetailPage from './signs/m_storedetailPage';
import test from './signs/test';
import storelookPage from './signs/storelookPage';

import { NavigationContainer } from '@react-navigation/native'; //화면을 쌓아주는 레이어!
import { createNativeStackNavigator } from '@react-navigation/native-stack'; //레이어 위에 올라가는 화면들!


const Stack = createNativeStackNavigator(); //화면 전환을 어떻게 할것인가! 그중에서 스택방식!


//save plz korean 
const App = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="로그인 페이지" component={LoginPage} />
        {/* <Stack.Screen name="회원가입 페이지" component={RegisterPage} /> */}
        {/* <Stack.Screen name="매장사장 회원가입 페이지" component={M_RegisterPage} /> */}
        {/* <Stack.Screen name="매장사장 메인페이지" component={ManagerPage} /> */}
        {/* <Stack.Screen name="예약자확인 페이지" component={bookerPage} /> */}
        {/* <Stack.Screen name="메뉴 등록 페이지" component={enrollmentPage} /> */}
        {/* <Stack.Screen name="메뉴 수정 페이지" component={revisePage} /> */}
        {/* <Stack.Screen name="메뉴 삭제 페이지" component={deletePage} /> */}
        {/* <Stack.Screen name="매장예약 페이지" component={storeregisterPage} /> */}
        {/* <Stack.Screen name="메인페이지" component={mainPage} /> */}
        {/* <Stack.Screen name="매장사장상세페이지" component={M_storedetailPage} /> */}
        {/* <Stack.Screen name="매장둘러보기페이지" component={storelookPage} /> */}
        {/* <Stack.Screen name="테스트 페이지" component={test} /> */}




      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;