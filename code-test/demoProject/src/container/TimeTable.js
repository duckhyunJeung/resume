import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TimeCompo from "./timeCompo";

const timeTableData = [{time: 10, used: false},
    {time: 11, used: false},
    {time: 12, used: true},
    {time: 14, used: false},
    {time: 15, used: false},
    {time: 16, used: false},
    {time: 17, used: false},
    {time: 18, used: false}];
const TimeTable = () => {
    const [amData, setAmData] = useState([]);

    return (
      <View>
          <View  style={{flex: 1}}>
             <View >
              <Text style={{marginBottom: 10, marginLeft: 10, marginTop: 10}}>오전</Text>
                 <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
                     {timeTableData.map((data,i) => {
                         if(data.time < 14) {
                             return <Text style={!data.used ? styles.activeText : styles.deActiveText}>{data.time}:00</Text>
                         }
                     })}

                 </View>
              </View>

              <View>
              <Text style={{marginBottom: 10, marginLeft: 10, marginTop: 10}}>오후</Text>
                  <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
              {timeTableData.map((data,i) => {
                  if(data.time >= 14) {
                      return <Text style={!data.used ? styles.activeText : styles.deActiveText}>{data.time}:00</Text>
                  }
              })}
                  </View>
              </View>
          </View>
      </View>
    );
};

const styles = StyleSheet.create({
    activeText: {
        color: '#2979ff',
        borderColor : '#2979ff',
        borderWidth : 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: 10,

    },
    deActiveText: {
        color: '#cbd0e2',
        borderColor : '#cbd0e2',
        borderWidth : 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: 10,
    }

});

export default TimeTable;