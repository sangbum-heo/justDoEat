import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import LogAppend from './LogAppend';
import LogDelete from './LogDelete';


export default class App extends React.Component {
    
    constructor(props){

        super(props);
        this.state = {
            food1: '',
            kcal1: -1,
            delNum: 0,
            // scrollLines: '',
            logAppendModal: false,
            logDeleteModal: false,
            tempKcalLog: this.props.appKcalLog.slice(), // tempKcalLog와 this.props.appKcalLog가 가리키고 있는 것이 똑같다?
                                // 그렇다면 새로운 곳에 내용을 복사하고 그 곳을 가리키게 ㄱ? (얕은 복사, 깊은 복사)
        }
    }
    // 임시 배열을 하나 만들어서 보여주고
    // 확인을 누르면 App.js 배열에 넣고
    // 취소를 누르면 App.js 배열에 넣지 않고 modal 창을 닫는다.
    
    
    

    // tempScroll(){
    //     var text=[];
    //     var tempLines=[]; 
    //     for(var i=0; i<this.state.tempKcalLog.length; i++){
    //         text[i] = {line : this.state.tempKcalLog[i].food + ' ' + this.state.tempKcalLog[i].kcal + 'kcal'};
    //     }
    //     for(var i=0; i<text.length; i++){
    //         tempLines[i] = { id: i,line :
    //             <TouchableOpacity
    //             onPress={()=>this.openDeleteModal(id)}
    //             >
    //                 <Text style={styles.scrollText}>
    //                     {text[i].line}
    //                 </Text>
    //             </TouchableOpacity>};
                
    //     }
    //     this.setState({
    //         scrollLines: tempLines[0],
    //     })
    //     // return ;
    //       //      scrollLines.li -> 출력 X   //     scrollLines[0] -> 출력 O 
    // }

    appendItem(foody,kcaly){
        var modiArr = this.state.tempKcalLog.slice();
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

    openDeleteModal(k){
        
        this.setState({
            delNum: k,    
        });
        this.toggleLogDelete();
    }

    toggleLogDelete(){
        this.setState({
            logDeleteModal: !this.state.logDeleteModal,
        })
    }

    textLines(){
        // return (
        //     this.state.tempKcalLog.map(line => (
        //         this.test2(line)
        //     ))
        // );
        var tempLines = this.state.tempKcalLog.slice()

        var tempLines2 = [];
        for(var i=0; i<tempLines.length; i++){
            tempLines2.push({food: tempLines[i].food,kcal: tempLines[i].kcal, id: i});
        }
        // var tempLines2 = [
        //     {food: tempLines[0].food,kcal: tempLines[0].kcal, id: 0}
        // ]

        
        // this.test3(tempLines[0]);
        
        // for(var i=0; i<tempLines.length; i++){
        //     tempLines.push({id: i});
        // }
        return(
            tempLines2.map(line =>(
                this.renderTextLine(line)
            ))
        );
    }
    
    renderTextLine(arr){
        
        return (
            <TouchableOpacity onPress={()=>this.openDeleteModal(arr.id)} key={arr.id}>
                <Text>
                    {arr.food} {arr.kcal}kcal
                </Text>
            </TouchableOpacity>
        );
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
                        {this.textLines()}
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
                        onPress={()=>this.props.modalHandler()}
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
                    // deleteTempItem={(k)=>this.deleteItem(k)}
                    num={this.state.delNum}
                    tempKcalLog={this.state.tempKcalLog}
                    // element={this.state.tempKcalLog[this.state.delNum]}
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

