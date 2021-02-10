import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, TextInput } from 'react-native';

// middleFirst의 MAX : ~ kcal 설정 파트

export default class App extends React.Component { // 현재 오류 : 완료 버튼을 누르지 않고 그냥 나가면 오류 발생!
    constructor(props){
        super(props);
        this.state = {
            goal: 0,
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.background}
                    activeOpacity={0}
                    onPress={this.props.goalHandler}/>
                <View style={styles.modal}>
                    <Text style={styles.titleText}>
                        - 일일 목표 칼로리 설정 -
                    </Text>
                    <TextInput
                    style={styles.goalInput}
                    value={this.state.goal}
                    onChangeText={(changedText)=>{this.setState({goal: changedText})}}
                    placeholder={"칼로리를 입력해주세요.(숫자만 입력)"}/>
                    <TouchableOpacity onPress={()=>this.props.goalHandler(this.state.goal)}>
                        <Text style={styles.doneText}>
                            완료
                            
                        </Text>
                        
                    </TouchableOpacity>


                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
    },
    background: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modal: {
        marginHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: '50%',
        backgroundColor: 'white',
    },
    titleText: {
        fontSize: 20,
        margin: 12
    },
    goalInput: {
        backgroundColor: 'white',
        marginBottom: 20,
        width: '75%',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#a5a5a5'
    },
    doneText: {
        color: 'rgb(1,123,255)',
        fontSize: 15,
        margin: 10
    },
});