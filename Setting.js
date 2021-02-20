import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground, Image, StatusBar } from 'react-native';
export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // mainPage: false,
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <ImageBackground
                    style={{width: '100%', height: '100%'}}
                    source={require('./images/background.png')}>
                    <View style={styles.topview}>
                        <Text style={styles.topTitle}>Just Do Eat!</Text>
                    </View>
                    <View style={styles.middleView}>

                    
                        <View style={styles.mid1}>

                        </View>
                        <View style={styles.mid2}>
                            
                        </View>
                    </View>
                    <View style={{alignItems: 'flex-end', margin: 10}}>
                        <Text>만든이 : 허상범</Text>
                        <Text>heosangbum00@naver.com</Text>
                    </View>
                    <View style={styles.bottomView}>
                        <TouchableOpacity style={styles.bottom1} onPress={()=>this.props.modalHandler()}>
                            <Image source={require('./images/home2.png')}/>
                        </TouchableOpacity>
                        {/* <TouchableOpacity>
                            <Image source={require('./images/home2.png')}/>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={styles.bottom3}>
                            <Image source={require('./images/setting2.png')}/>
                        </TouchableOpacity>
                    </View>
                    <StatusBar style='auto' />
                </ImageBackground>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        //backgroundColor: 'transparent',
    },

    //top
    topview: {
        flex: 2.3,
        justifyContent: 'flex-end',
    },
    topTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
    },

    //middle
    middleView: {
        flex: 25,
        justifyContent: 'center',
        
    },

    mid1: {
        
        width: '93%',
        height: '35%',
        borderRadius: 25,
        borderWidth: 1.5,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: 50,
        marginBottom:12.5,
        // justifyContent: 'center',
        // alignContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 5.10,
        elevation: 10,
        
    },
    mid2: {
        
        width: '93%',
        height: '35%',
        borderRadius: 25,
        borderWidth: 1.5,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginBottom: 30,
        marginTop: 12.5,
        // justifyContent: 'center',
        // alignContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 5.10,
        elevation: 10,
    },
    

    //bottom
    bottomView: {
        flex: 1.98,
        backgroundColor: 'rgba(255,255,255,0.88)',
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'center',
        borderWidth: 0.8,
        justifyContent: 'space-around',
    },
    bottom1: {
        marginLeft: 20,
    },
    bottom3: {
        marginRight: 20,
    },
});