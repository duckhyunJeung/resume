import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, Text, TextInput, Button } from 'react-native';
import Pdf from 'react-native-pdf';

const source = {uri:'http://www.africau.edu/images/default/sample.pdf',cache:true};

const ReadPDF = () => {
    const [values, setValues] = useState(null);
    const [isPdf, setPdf] = useState(false);

    const readPdf = value => {
        let data = {uri: value, cache:true};
        setValues(data);
    }
    const isReadPdf = () => {
        setPdf(true);
    }

    return (
        <View style={styles.container}>
            <Text>url입력.</Text>
             <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={readPdf}

                    value={values}
                  />
                  <Button onPress={isReadPdf} title="PDF읽기">
                  </Button>
            {isPdf &&
            <Pdf
                source={values}
                onLoadComplete={(numberOfPages, filePath)=>{
                    console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages)=>{
                    console.log(`current page: ${page}`);
                }}
                onError={(error)=>{
                    console.log(error);
                }}
                style={styles.pdf}/>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
    }
});
export default ReadPDF;