import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            food: '',
            kcal: 0,
            tempKcalLog: this.props.tempKcalLog,
        }
    }
    logElementDelete(k){
        var temp = this.state.tempKcalLog;
        temp.splice(k,1);
        this.props.modalHandler();
    }
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.background}
                activeOpacity={0}
                onPress={this.props.modalHandler}>
                <View style={styles.modal}>
                    <Text style={styles.titleText}>
                        - 섭취 기록 삭제-
                    </Text>
                    <Text>
                        {this.props.tempKcalLog[this.props.num].food} {this.props.tempKcalLog[this.props.num].kcal}kcal
                        를 삭제하시겠습니까?
                    </Text>
                    
                    <View style={styles.selectTouchable}>
                        <TouchableOpacity onPress={()=>this.logElementDelete(this.props.num)}>
                            <Text style={styles.doneText}>
                                삭제
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.modalHandler()}>
                            <Text style={styles.resetText}>
                                취소
                            </Text>
                        </TouchableOpacity>
                    </View>
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
        fontSize: 20,
        margin: 5,
    },
    selectTouchable: {
        flexDirection: 'row',
    },
    doneText: {
        color: 'rgb(1,123,255)',
        fontSize: 15,
        margin: 10,
        marginHorizontal: 25,
    },
    resetText: {
        color: 'rgb(1,123,255)',
        fontSize: 15,
        margin: 10,
        marginHorizontal: 25,
    },
});