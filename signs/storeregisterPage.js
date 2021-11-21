import React, { useState } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
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
    Button,
    Alert
} from 'react-native';

import database from '@react-native-firebase/database';
import DatePicker from 'react-native-date-picker'
import { noWait, useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/core';
import { atomStorenum, atomUserId, atomUserPhone } from '../atom/atom';

LocaleConfig.locales['fr'] = {
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월.', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],

};
LocaleConfig.defaultLocale = 'fr';

// const [atStoreName, setAtStoreName] = useRecoilState(atomStoreName) //마커 선택한 스토어 이름


const storeregisterPage = () => {
    const navigation = useNavigation()
    // ///////////////////////////////////////////////////
    const databasefunction = () => {
        Alert.alert('예약정보를 확인해주세요!', `날짜 : ${date}\n시간 : ${timeString}\n위의 정보로 예약하시겠습니까?`, [
            {
                text: "취소",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            {
                text: "예약하기", onPress: () => {
                    console.log("OK Pressed")
                    database()
                        .ref(`/reserve/${atStoreNum}/${atId}`)
                        .set({
                            id: atId,
                            day: date,
                            time: timeString,
                            M_num: atStoreNum,
                            phone: atPhone,
                        })
                        .then(() => {
                            console.log('-------------------매장정보---------------------');
                            console.log(time);

                            QrcodeSave()
                        });
                }
            }
        ])
    };

    function QrcodeSave(params) {
        database()
            .ref(`/users/${atId}`)
            .update({
                qrcode: atStoreNum + '/' + atId + '/' + date + '/' + timeString + '/' + atPhone,
            })
            .then(() => {
                console.log('-------------------qrsave 완료---------------------');

                navigation.navigate('큐얼코드페이지')
            });
    }
    ///////////////////////////////////////////////////////////////




    var dt = new Date();

    const chwidth = Dimensions.get('window').width;

    const [atId, setAtId] = useRecoilState(atomUserId) //유저 아이디
    const [atStoreNum, setAtStoreNum] = useRecoilState(atomStorenum) //마커 선택한 스토어 번호
    const [atPhone, setAtPhone] = useRecoilState(atomUserPhone) //유저 번호

    const [date, setDate] = useState('')
    const [time, setTime] = useState(new Date())

    const [timeString, setTimeString] = useState(time.getHours() + ':' + (String(time.getMinutes()).length == 1 ? '0' + time.getMinutes() : time.getMinutes()))



    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20
            }}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    color: '#6485E6',
                }}>일정보기</Text>
            </View>

            <View style={{
                marginTop: 40,
                paddingBottom: '10%',
                backgroundColor: 'white',
            }}>
                <Calendar
                    current={dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()}
                    minDate={dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()}
                    maxDate={dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + (dt.getDate() + 7)}
                    onDayPress={(day) => { setDate(day.dateString) }}
                    onDayLongPress={(day) => { console.log('selected day', day) }}
                    monthFormat={'yyyy MM'}
                    onMonthChange={(month) => { console.log('month changed', month) }}
                    hideArrows={true}
                    renderArrow={(direction) => (<Arrow />)}
                    hideExtraDays={false}
                    disableMonthChange={true}
                    firstDay={1}
                    hideDayNames={false}
                    showWeekNumbers={false}
                    disableArrowLeft={true}
                    disableArrowRight={true}
                    disableAllTouchEventsForDisabledDays={true}
                    enableSwipeMonths={true}
                />
            </View>
            <View style={{
                alignItems: 'center',
                marginBottom: 30,
            }}>
                <DatePicker mode="time" date={time} onDateChange={(time) => {
                    setTime(time)
                    setTimeString(time.getHours() + ':' + (String(time.getMinutes()).length == 1 ? '0' + time.getMinutes() : time.getMinutes()))
                    console.log(time.getHours() + ':' + (String(time.getMinutes()).length == 1 ? '0' + time.getMinutes() : time.getMinutes()))
                }} />
            </View>
            <TouchableWithoutFeedback onPress={() => { databasefunction() }}>
                <View
                    style={{
                        marginLeft: 20,
                        borderRadius: 60,
                        borderWidth: 1,
                        width: chwidth - 40,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#6485E6',
                        borderColor: '#6485E6',
                    }}>
                    <Text style={{ color: 'white' }}>예약하기</Text>
                </View>
            </TouchableWithoutFeedback>

        </SafeAreaView >
    )
};

export default storeregisterPage;