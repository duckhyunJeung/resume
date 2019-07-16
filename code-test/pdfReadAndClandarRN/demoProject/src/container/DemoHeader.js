import React, {useState} from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import {Actions} from 'react-native-router-flux';

const DemoHeader = () => {
    const goActions = () => {
        Actions.pdfRead();
    };

    return (
            <Header>
                <Left>
                    <Button transparent >
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                <Title>예약하기</Title>
                </Body>
                <Right>
                    <Button onPress={goActions} >
                        <Icon name='menu' />
                    </Button>
                </Right>
            </Header>
    );
};
export default DemoHeader;