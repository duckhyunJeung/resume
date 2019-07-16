import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from './src/container/Home';
import ReadPDF from "./src/container/ReadPDF";


export default class Routes extends React.Component {

    render() {
        return(
            <Router>
                <Scene key = "root">
                    <Scene key = "home" component={Home} hideNavBar={true} initial={true}/>
                    <Scene key = "pdfRead" component={ReadPDF} hideNavBar={true}/>
                </Scene>
            </Router>
        )
    }
}

