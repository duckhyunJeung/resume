import React, {useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Dimensions,
    StatusBar,
} from 'react-native';

import {Icon} from 'native-base';

import {Calendar} from "react-native-calendars";
import {Actions} from 'react-native-router-flux';


import {Content, Accordion, Container, Card, CardItem, Body } from "native-base";
import DemoHeader from "./DemoHeader";
import TimeTable from "./TimeTable";

let win = Dimensions.get('window');
const Home = () => {
    const [selected, setDate] = useState('');
    const [changeText, setText] = useState('날짜를');

    const dataArray = [
        {title: "날짜선택", content: "Lorem ipsum dolor sit amet"},
        {title: "시간선택", content: "Lorem ipsum dolor sit amet"}
    ];
    const onDayPress = day => {
        setDate(day.dateString);
    };
    const setContents = item => {

        if (item.title === "날짜선택") {
            setText("날짜를");
            return <Calendar onDayPress={onDayPress} markedDates={{[selected]: {selected: true}}}/>
        } else {
            setText("시간을");
            return <TimeTable/>
        }
    };
    return (
        <View style={styles.container}>
            <DemoHeader/>
            <View style={styles.headerContainer}>
                <View style={styles.headerTitleContainer}><Icon name='clock' style={styles.clockIcon}/><Text
                    style={styles.headerTitle}>{changeText} 선택하여주세요</Text></View>
                <View style={styles.bodyTitleContainer }>
                    <Text style={{fontWeight: 'bold', fontSize: 15 }} >반려한동물병원</Text>
                    <Text  style={{ fontSize: 11}} >2019년 12월 6일 /<Text style={{ fontSize: 11, color: '#cbd0e2' }} >시간</Text></Text>
                    <Text  style={{ fontSize: 11, color: '#cbd0e2' }} >진료대상/진료항목/수의사</Text>
                    <Text  style={{ fontSize: 11, color: '#cbd0e2' }} >기타사항</Text>
                </View>
            </View>

            <View style={styles.bodyContent}>
                <Content style={styles.contentMargin}>
                    <Accordion
                        dataArray={dataArray}
                        headerStyle={styles.accordionHeader}
                        contentStyle={{ backgroundColor: "#ddecf8"}}
                        /*                        headerStyle={{ backgroundColor: "#b7daf8" }}
                                                contentStyle={{ backgroundColor: "#ddecf8"}}*/
                        renderContent={setContents}
                    />
                </Content>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    bodyContent: {
        flex: 4,
        justifyContent: 'flex-start',
    },
    headerContainer: {
      flex: 1.5,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        marginLeft: 0,
        marginRight: 0,
        paddingRight: 0,
        paddingLeft: 0,
    },
    bodyTitleContainer: {
      marginLeft: 10,
      marginTop: 10
    },
    headerTitleContainer: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        borderBottomColor: '#cbd0e2',
        borderBottomWidth: 1,
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    headerTitle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        color: '#2979ff'
    },
    clockIcon: {
        fontSize: 20,
        color: '#2979ff',
        textAlignVertical: 'center',
    },
    accordionHeader : {
        alignItems: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: '#cbd0e2',
    },
    contentMargin: {
        marginLeft: 0,
        marginRight: 0,
        paddingRight: 0,
        paddingLeft: 0,
    }
})
export default Home;