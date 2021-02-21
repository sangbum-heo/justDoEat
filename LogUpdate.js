import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import LogAppend from './LogAppend';
import LogDelete from './LogDelete';

export default class App extends React.Component {
    
    constructor(props){

        super(props);
        this.state = {
            food1: '',
            kcal1: 0,
            delNum: -1,
            logAppendModal: false,
            logDeleteModal: false,
            tempKcalLog: this.props.appKcalLog.slice(), // tempKcalLog와 this.props.appKcalLog가 가리키고 있는 것이 똑같다?
                                // 그렇다면 새로운 곳에 내용을 복사하고 그 곳을 가리키게 ㄱ?
        }
    }
    // 임시 배열을 하나 만들어서 보여주고
    // 확인을 누르면 App.js 배열에 넣고
    // 취소를 누르면 App.js 배열에 넣지 않고 modal 창을 닫는다.
    
    test(){
        alert(this.state.delNum);
    }

    tempScroll(){
        var text=[];
        var scrollLines=[]; 
        for(var i=0; i<this.state.tempKcalLog.length; i++){
            text[i] = {line : this.state.tempKcalLog[i].food + ' ' + this.state.tempKcalLog[i].kcal + 'kcal'};
        }
        for(var i=0; i<text.length; i++){
            scrollLines[i] =
                <TouchableOpacity
                onPress={()=>this.openDeleteModal(i)}
                >
                    <Text style={styles.scrollText}>
                        {text[i].line}   i : {i}
                    </Text>
                </TouchableOpacity>;
                
        }
        
        return scrollLines;
    }

    appendItem(foody,kcaly){
        var modiArr = this.state.tempKcalLog.slice();
        modiArr.splice(this.state.tempKcalLog.length, 1, {food: foody,kcal: kcaly});
        this.setState({
            tempKcalLog: modiArr,
        })
        this.toggleLogAppend();   
    }
    deleteItem(k){
        var modiArr = this.state.tempKcalLog.slice();
    }

    toggleLogAppend(){
        this.setState({
            logAppendModal: !this.state.logAppendModal,
        })
    }

    openDeleteModal(k){
        
        this.setState({
            delNum: k,
        })
        
        this.toggleLogDelete();
    }

    toggleLogDelete(){
        this.setState({
            logDeleteModal: !this.state.logDeleteModal,
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.background}
                activeOpacity={0}
                onPress={()=>this.props.modalHandler()}>
                <View style={styles.modal}>
                    <Text style={styles.titleText}>
                        - 섭취 기록 -
                    </Text>

                    <ScrollView>
                        {this.tempScroll()}
                    </ScrollView>
                    
                    <View style={styles.selectTouchable}>

                        <TouchableOpacity 
                        onPress={()=>this.props.setAppKcalLog(this.state.tempKcalLog)}
                        >
                            <Text style={styles.doneText}>
                                완료
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.toggleLogAppend()}>
                            <Text style={styles.doneText}>
                                추가
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        // onPress={()=>this.props.modalHandler()}
                        onPress={()=>this.test()}
                        >
                            <Text style={styles.doneText}>
                                취소
                            </Text>
                        </TouchableOpacity>

                    </View>

                    </View>
                </TouchableOpacity>

                {this.state.logAppendModal ? <LogAppend
                    modalHandler={()=>this.toggleLogAppend()}
                    appendTempItem={(food1,kcal1)=>this.appendItem(food1,kcal1)}/>
                    : <></>}

                {this.state.logDeleteModal ? <LogDelete
                    modalHandler={()=>this.toggleLogDelete()}
                    deleteTempItem={(k)=>this.deleteItem(k)}
                    num={this.state.delNum}
                    element={this.state.tempKcalLog[this.state.delNum]}
                    />
                    
                    : <></>}

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
        fontSize: 18,
        margin: 1,
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