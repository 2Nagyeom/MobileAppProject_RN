import React from 'react';
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
    Dimensions
} from 'react-native';

import { useNavigation } from '@react-navigation/core';

LocaleConfig.locales['fr'] = {
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월.', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['Sat', 'Sun', 'Mon', 'Tuse', 'Wed', 'Thur', 'Fri'],
    dayNamesShort: ['토', '일', '월', '화', '수', '목', '금'],

};
LocaleConfig.defaultLocale = 'fr';

const storeregisterPage = () => {
    var dt = new Date();


    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    color: '#6485E6',
                }}>일정보기</Text>
            </View>

            <View style={{
                paddingBottom: '10%',
                backgroundColor: 'white',
            }}>
                <Calendar
                    current={dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()}
                    minDate={dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()}
                    maxDate={dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + (dt.getDate() + 7)}
                    onDayPress={(day) => { console.log('selected day', day) }}
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
                    onPressArrowLeft={subtractMonth => subtractMonth()}
                    onPressArrowRight={addMonth => addMonth()}
                    disableArrowLeft={true}
                    disableArrowRight={true}
                    disableAllTouchEventsForDisabledDays={true}
                    enableSwipeMonths={true}

                    markingType={'period'}
                    markedDates={{
                        '2021-11-19': { startingDay: true, color: '#50cebb', textColor: 'white' },
                        '2021-11-20': { color: '#70d7c7', textColor: 'white' },
                        '2021-11-21': { color: '#70d7c7', textColor: 'white' },
                        '2021-11-22': { color: '#70d7c7', textColor: 'white' },
                        '2021-11-23': { color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white' },
                        '2021-11-24': { color: '#70d7c7', textColor: 'white' },
                        '2021-11-25': { endingDay: true, color: '#50cebb', textColor: 'white' }
                    }}
                />
            </View>
        </SafeAreaView >
    )
};

export default storeregisterPage;