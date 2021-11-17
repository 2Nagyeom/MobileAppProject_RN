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
    today: '11월\'11일',
};
LocaleConfig.defaultLocale = 'fr';

const storeregisterPage = () => {
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{
                paddingBottom: '5%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{
                    paddingTop: '10%',
                    fontSize: 40,
                    fontWeight: "bold",
                    color: '#6485E6',
                }}>일정보기</Text>
            </View>

            <View style={{
                paddingBottom: '10%',
                backgroundColor: 'white',
            }}>
                <Calendar
                    // Initially visible month. Default = Date()
                    current={'2021-01-01'}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={'2021-11-01'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maxDate={'2021-12-31'}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => { console.log('selected day', day) }}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => { console.log('selected day', day) }}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'yyyy MM'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => { console.log('month changed', month) }}
                    // Hide month navigation arrows. Default = false
                    hideArrows={true}
                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                    renderArrow={(direction) => (<Arrow />)}
                    // Do not show days of other months in month page. Default = false
                    hideExtraDays={false}
                    // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
                    // day from another month that is visible in calendar page. Default = false
                    disableMonthChange={true}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                    firstDay={1}
                    // Hide day names. Default = false
                    hideDayNames={false}
                    // Show week numbers to the left. Default = false
                    showWeekNumbers={false}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                    onPressArrowLeft={subtractMonth => subtractMonth()}
                    // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                    onPressArrowRight={addMonth => addMonth()}
                    // Disable left arrow. Default = false
                    disableArrowLeft={true}
                    // Disable right arrow. Default = false
                    disableArrowRight={true}
                    // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                    disableAllTouchEventsForDisabledDays={true}
                    // Replace default month and year title with custom one. the function receive a date as parameter
                    // renderHeader={(date) => {/*Return JSX*/ }}
                    // Enable the option to swipe between months. Default = false
                    enableSwipeMonths={true}

                    markingType={'period'}
                    markedDates={{
                        '2021-11-11': { startingDay: true, color: '#50cebb', textColor: 'white' },
                        '2021-11-12': { color: '#70d7c7', textColor: 'white' },
                        '2021-11-13': { color: '#70d7c7', textColor: 'white' },
                        '2021-11-14': { color: '#70d7c7', textColor: 'white' },
                        '2021-11-15': { color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white' },
                        '2021-11-16': { color: '#70d7c7', textColor: 'white' },
                        '2021-11-17': { endingDay: true, color: '#50cebb', textColor: 'white' }
                    }}
                />
            </View>
        </SafeAreaView >
    )
};

export default storeregisterPage;