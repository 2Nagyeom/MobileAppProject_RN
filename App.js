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
import ManagerPage from './manager/managerPage';
import menuenrollmentPage from './manager/menuenrollmentPage';
import menurevisePage from './manager/menurevisePage';
import menudeletePage from './manager/menudeletePage';
import storeregisterPage from './reservation/storeregisterPage';
import mainPage from './signs/mainPage';
import M_storedetailPage from './manager/m_storedetailPage';
import test from './signs/test';
import storelookPage from './signs/storelookPage';
import imformationrevisePage from './signs/imformationrevisePage';
import CurrentReservation from './reservation/currentReservation';
import qrcodePage from './reservation/qrCodePage';
import qrcodeconfirmPage from './manager/qrcodeconfirmPage';



import { NavigationContainer } from '@react-navigation/native'; //화면을 쌓아주는 레이어!
import { createNativeStackNavigator } from '@react-navigation/native-stack'; //레이어 위에 올라가는 화면들!
import { RecoilRoot } from 'recoil';
import m_storedetailPage from './manager/m_storedetailPage';
import SplashScreen from 'react-native-splash-screen';
import QrCodeCheck from './manager/qrcodeCheck';


const Stack = createNativeStackNavigator(); //화면 전환을 어떻게 할것인가! 그중에서 스택방식!


//save plz korean 
const App = () => {


  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          {/* 이거 로그인 페이지 위로 올려서 확인하면되! 지금 연결되어있는 곳이 없어서! */}
          <Stack.Screen name="큐얼코드 체크" component={QrCodeCheck} />

          <Stack.Screen name="로그인 페이지" component={LoginPage} />
          <Stack.Screen name="회원가입 페이지" component={RegisterPage} />

          <Stack.Screen name="정보수정 페이지" component={imformationrevisePage} />

          <Stack.Screen name="메인페이지" component={mainPage} />
          <Stack.Screen name="예약페이지" component={storeregisterPage} />
          <Stack.Screen name="큐얼코드페이지" component={qrcodePage} />


          <Stack.Screen name="매장사장 메인페이지" component={ManagerPage} />
          <Stack.Screen name="매장사장 상세페이지" component={M_storedetailPage} />
          <Stack.Screen name="메뉴 등록 페이지" component={menuenrollmentPage} />
          <Stack.Screen name="메뉴 수정 페이지" component={menurevisePage} />
          <Stack.Screen name="메뉴 삭제 페이지" component={menudeletePage} />
          <Stack.Screen name="예약자 확인 페이지" component={m_storedetailPage} />
          <Stack.Screen name="현재예약자 확인 페이지" component={CurrentReservation} />
          <Stack.Screen name="큐얼코드 확인페이지" component={qrcodeconfirmPage} />




          {/* <Stack.Screen name="매장둘러보기페이지" component={storelookPage} />
          {/* <Stack.Screen name="테스트 페이지" component={test} /> */}





        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;