import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

//middle Third (QuickButtonDatas) 변경 modal

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            buttonNumber: this.props.num+1,
            food: '',
            kcal: 0,
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.background}
                    activeOpacity={0}
                    onPress={this.props.modalHandler}>
                    <View style={styles.modal}>
                        <Text style={styles.titleText}>
                            - 퀵버튼 {this.state.buttonNumber} 설정 -
                        </Text>
                        <TextInput
                        style={styles.goalInput}
                        onChangeText={(changedText)=>{this.setState({food: changedText})}}
                        placeholder={"음식명을 입력해주세요."}/>
                        
                        <TextInput
                        style={styles.goalInput}
                        keyboardType = 'numeric'
                        onChangeText={(changedText)=>{this.setState({kcal: changedText})}}
                        placeholder={"칼로리를 입력해주세요.(숫자만 입력)"}/>
                        <TouchableOpacity onPress={()=>this.props.setButtonHandler(this.state.food,this.state.kcal)}>
                            <Text style={styles.doneText}>
                                완료
                            </Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
        )
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
