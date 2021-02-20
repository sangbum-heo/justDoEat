import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import LogAppend from './LogAppend';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            food: '',
            kcal: 0,
            logAppendModal: false,
            tempKcalLog: this.props.appKcalLog,
        }
    }
    // 임시 배열을 하나 만들어서 보여주고
    // 확인을 누르면 App.js 배열에 넣고
    // 취소를 누르면 App.js 배열에 넣지 않고 modal 창을 닫는다.

    tempScroll(){
        let text='';
        for(var i=0; i<this.state.tempKcalLog.length; i++){
            text += this.state.tempKcalLog[i].food + ' ' + this.state.tempKcalLog[i].kcal + 'kcal' + '\n';
        }
        return text;
    }

    appendItem(foody,kcaly){
        const modiArr = this.state.tempKcalLog;
        modiArr.splice(this.state.tempKcalLog.length, 1, {food: foody,kcal: kcaly});
        this.setState({
            tempKcalLog: modiArr,
        })
        this.toggleLogAppend();
    }

    toggleLogAppend(){
        this.setState({
            logAppendModal: !this.state.logAppendModal,
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.background}
                activeOpacity={0}
                onPress={this.props.modalHandler}>
                <View style={styles.modal}>
                    <Text style={styles.titleText}>
                        - 섭취 기록 -
                    </Text>
                    <ScrollView>
                        <Text style={styles.scrollText}>
                            {this.tempScroll()}
                        </Text>
                    </ScrollView>
                    {/* <TextInput
                    style={styles.goalInput}
                    onChangeText={(changedText)=>{this.setState({food: changedText})}}
                    placeholder={"음식명을 입력해주세요."}/>
                    
                    <TextInput
                    style={styles.goalInput}
                    keyboardType = 'numeric'
                    onChangeText={(changedText)=>{this.setState({kcal: changedText})}}
                    placeholder={"칼로리를 입력해주세요.(숫자만 입력)"}/> */}
                    <View style={styles.selectTouchable}>
                        <TouchableOpacity onPress={()=>this.props.setAppKcalLog(this.state.tempKcalLog)}>
                            <Text style={styles.doneText}>
                                완료
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.toggleLogAppend()}>
                            <Text style={styles.doneText}>
                                추가
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.modalHandler()}>
                            <Text style={styles.doneText}>
                                취소
                            </Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </TouchableOpacity>
                {this.state.logAppendModal ? <LogAppend
                    modalHandler={()=>this.toggleLogAppend()}
                    appendTempItem={(food,kcal)=>this.appendItem(food,kcal)}/> : <></>}
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
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
        marginHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: '50%',
        backgroundColor: 'white',
    },
    titleText: {
        fontSize: 22,
        margin: 5,
        marginBottom: 8,
        
    },
    scrollText: {
        fontSize: 17
    },
    selectTouchable: {
        flexDirection: 'row',
    },
    doneText: {
        color: 'rgb(1,123,255)',
        fontSize: 15,
        margin: 10,
        marginHorizontal: 20,
    },
});