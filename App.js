import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, ScrollView, Button, useState } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import KcalGoal from './KcalGoal';
import QuickSet from './QuickButtonSetting';
import Setting from './Setting';
import LogUpdate from './LogUpdate';


export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      kcalGoal: 1500,
      kcalLog: [
        {food: '햇반',kcal: 300},
        {food: '김치찌개',kcal: 300},
        {food: '닭가슴살',kcal: 140}
      ],
      count:0,
      goalModal: false,
      quickSetModal: false,
      logModal: false,
      settingPage: false,
      buttonNumber: 0,
      quickButtonDatas: [
        {food: '햇반', kcal: 300, id: 0},
        {food: '닭가슴살', kcal: 140, id: 1},
        {food: '김치찌개', kcal: 300, id: 2},
        {food: '', kcal: 0, id: 3},
        {food: '', kcal: 0, id: 4},
        {food: '', kcal: 0, id: 5}
      ],
    }
  };

  deleteItemTest(k){
    const ppap = this.state.kcalLog;
    ppap.splice(k, 1, );
    this.setState({
      kcalLog: ppap,
    })
  }

  appendItemTest(){
    const ppap = this.state.kcalLog;
    ppap.splice(this.state.kcalLog.length, 1, {food: '국수',kcal: 200});
    this.setState({
      kcalLog: ppap,
    })
  }

  test(){ // 이러면 삭제하고나서 가장 위에 있는 항목의 id를 다시 0으로 설정해야하는데 어떡하지..
    const modi = this.state.kcalLog.filter(id => id.id !== 0);
    this.setState({
      kcalLog: modi,
    })
  }
  
  setLog(arr){ //LogUpdate에 props로 보낼 함수
    this.setState({
      kcalLog: arr,
    })
    this.toggleLogModal();
  }

  addLog(k){
    if(this.state.quickButtonDatas[k].food == '' && this.state.quickButtonDatas[k].kcal == 0){
      this.toggleQuickSetModal(k);
    }
    else{
      this.setState({
        kcalLog: [...this.state.kcalLog,{food: this.state.quickButtonDatas[k].food, kcal: this.state.quickButtonDatas[k].kcal}]
      })
    }
  }

  todayPercentage(){
    return Math.round(this.todayCalc() / this.state.kcalGoal * 100);
  }

  todayScroll(){
    let text='';
    for(var i=0; i<this.state.kcalLog.length; i++){
      text += (this.state.kcalLog[i].food + ' ' + this.state.kcalLog[i].kcal + 'kcal\n');
    }
    return text;
  }

  todayCalc(){
    let sum=0;
    for(var i=0; i<this.state.kcalLog.length; i++){
      sum += this.state.kcalLog[i].kcal;
    }
    return sum;
  }

  middleThirdText(k){
    if(this.state.quickButtonDatas[k].food == '' && this.state.quickButtonDatas[k].kcal == 0){
      return '+';
    }
    else{
      return this.state.quickButtonDatas[k].food + ' ' + this.state.quickButtonDatas[k].kcal + 'kcal';
    }
  }

  toggleGoalModal(){
    this.setState({
      goalModal: !this.state.goalModal
    })
  }

  toggleQuickSetModal(k){
    this.setState({
      quickSetModal: !this.state.quickSetModal,
      buttonNumber: k,
    })
  }

  toggleSettingPage(){
    this.setState({
      settingPage: !this.state.settingPage,
    })
  }

  toggleLogModal(){
    this.setState({
      logModal: !this.state.logModal,
    })
  }

  goalHandler(goal){
    // 확인 버튼을 누르지 않고 나갈 경우 goal에 object type이 들어가서 에러가 발생하기 때문에 if문으로 예외처리
    if(typeof goal != 'object'){
      this.setState({
        kcalGoal : goal
      })
    }
    this.toggleGoalModal();
  }

  quickSetHandler(foody, kcaly){
      if(foody != '' && kcaly != ''){
        // id 가 일치하면 새 객체를 만들고, 기존의 내용을 집어넣고 원하는 값 덮어쓰기
        const modifiedArray = this.state.quickButtonDatas.map(item => item.id === this.state.buttonNumber
          ? ({ ...item, food: foody, kcal: parseInt(kcaly)})
          : item)
        
        this.setState({
          quickButtonDatas: modifiedArray,
        })
      }
    
    this.toggleQuickSetModal();
  }

  quickSetDelete(k){
    const modifiedArray = this.state.quickButtonDatas.map(item => item.id == k
      ? ({...item, food: '', kcal: 0})
      : item)

    this.setState({
      quickButtonDatas: modifiedArray,
    })
    this.toggleQuickSetModal();
  }

  // addCount(){
  //   const modifiedArray = this.state.quickButtonDatas.map(item => item.id === 5
  //     ? ({ ...item, food: '고구마', kcal: 200}) // id 가 일치하면 새 객체를 만들고, 기존의 내용을 집어넣고 원하는 값 덮어쓰기
  //     : item)
  //   this.setState({
  //     count:this.state.count+1,
  //     quickButtonDatas: modifiedArray,
  //   });
  // }
  
  render(){
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={require('./images/background.png')}>

        <View style={styles.topView}>
          {/* <TouchableOpacity>
            <Image source={require('./images/menuIcon4.png')}/>
          </TouchableOpacity> */}
          <Text style={styles.topTitle}>Just Do Eat!</Text>
        </View>

        <View style={styles.middleView}>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={()=>this.toggleGoalModal()}>
            <View style={styles.middleFirst}>
              <Text style={styles.midddleFirstTextGoal}>MAX : {this.state.kcalGoal}kcal</Text>
              <Text style={styles.midddleFirstTextEat}>Today : {this.todayCalc()}kcal</Text>
            </View>
            </TouchableOpacity>
            <View style={{marginRight:15}}>
              
              <ProgressCircle
              percent={this.todayPercentage()}
              radius={40}
              borderWidth={5}
              color="#3399FF"
              shadowColor="#999"
              bgColor="#fff"
              >
                <Text style={{ fontSize: 21 }}>{this.todayPercentage()+'%'}</Text>
              </ProgressCircle>
              
            </View>
          </View>

          <TouchableOpacity onPress={()=>this.toggleLogModal()}>
            <View style={styles.middleSecond}>
              <Text style={styles.middleSecondTitle}>섭취 기록</Text>
              <ScrollView>
                <Text style={styles.middleSecondText}>{this.todayScroll()}</Text>
              </ScrollView>
            </View>
          </TouchableOpacity>

          <View style={styles.middleThird}>
            <TouchableOpacity 
            style={styles.middleThirdBox}
            onPress={()=>this.addLog(0)}
            onLongPress={()=>this.toggleQuickSetModal(0)}
            >
              <Text style={styles.middleSecondText}>
                {this.middleThirdText(0)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.middleThirdBox}
            onPress={()=>this.addLog(1)}
            onLongPress={()=>this.toggleQuickSetModal(1)}
            >
            <Text style={styles.middleSecondText}>
                {this.middleThirdText(1)}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.middleThird}>
            <TouchableOpacity
            style={styles.middleThirdBox}
            onPress={()=>this.addLog(2)}
            onLongPress={()=>this.toggleQuickSetModal(2)}
            >
              <Text style={styles.middleSecondText}>
                {this.middleThirdText(2)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.middleThirdBox}
            onPress={()=>this.addLog(3)}
            onLongPress={()=>this.toggleQuickSetModal(3)}
            >
              <Text style={styles.middleSecondText}>
                {this.middleThirdText(3)}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.middleThird}>
            <TouchableOpacity
            style={styles.middleThirdBox}
            onPress={()=>this.addLog(4)}
            onLongPress={()=>this.toggleQuickSetModal(4)}
            >
              <Text style={styles.middleSecondText}>
                {this.middleThirdText(4)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.middleThirdBox}
            onPress={()=>this.addLog(5)}
            onLongPress={()=>this.toggleQuickSetModal(5)}
            >
              <Text style={styles.middleSecondText}>
                {this.middleThirdText(5)}
              </Text>
            </TouchableOpacity>
          </View>
          {/* <Button title={this.state.count.toString()} onPress={this.addCount.bind(this)}></Button> */}
        </View>

        <View style={styles.bottomView}>
          <TouchableOpacity style={styles.bottom1} onPress={()=>this.appendItemTest()}>
            <Image source={require('./images/home2.png')}/>
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <Image source={require('./images/home2.png')}/>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.bottom3} onPress={()=>this.toggleSettingPage()}>
            <Image source={require('./images/setting2.png')}/>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>TEST</Text>
          </TouchableOpacity>

        </View>
        <StatusBar style='auto' />
        </ImageBackground>
        
        {this.state.goalModal ? <KcalGoal
          modalHandler={()=>this.toggleGoalModal()}
          setGoalHandler={(kcalGoal)=>this.goalHandler(kcalGoal)}/>
        : <></> }

        {this.state.quickSetModal ? <QuickSet
          modalHandler={(bNum)=>this.toggleQuickSetModal(bNum)}
          setButtonHandler={(foody,kcaly)=>this.quickSetHandler(foody,kcaly)}
          deleteButtonHandler={(k)=>this.quickSetDelete(k)}
          num={this.state.buttonNumber}/>
        : <></>}

        {this.state.settingPage ? <Setting modalHandler={()=>this.toggleSettingPage()}/> : <></>}

        {this.state.logModal ? <LogUpdate
          modalHandler={()=>this.toggleLogModal()}
          appKcalLog={this.state.kcalLog}
          setAppKcalLog={(arr)=>this.setLog(arr)}
          />
        : <></>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },

  //top
  topView: {
    flex: 2.3,
    justifyContent: 'flex-end',
    // marginLeft: 3,
    // flexWrap: 'wrap',
  },
  topTitle: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },

  //middle
  middleView: {
    flex: 25,
    
  },

  middleFirst: {
    height: 70,
    width: 275,
    marginTop: 5,
    marginLeft: 15,
    borderColor: '#555',
    borderRadius: 18,
    borderWidth: 1.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    

    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 9.27,
    elevation: 10,
  },
  midddleFirstTextGoal: {
    marginTop: 2,
    marginRight: 8,
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  midddleFirstTextEat: {
    alignSelf: 'center',
    
    fontSize: 30,
    fontWeight: 'bold',
    color: '#33AFFF',
    

    textShadowColor:'#585858',
    textShadowOffset:{width: 1, height: 1},
    textShadowRadius: 1.5,
  },

  middleSecond: {
    marginTop: 15,
    margin: 15,
    borderColor: '#555',
    borderRadius: 18,
    borderWidth: 1.5,
    backgroundColor: 'white',
    height: 300,
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 2,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  middleSecondTitle: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  middleSecondText: {               // 섭취 기록 부분은 dday강의 마지막 chat 부분 참고해보자
    alignSelf: 'center',
    fontSize: 20,
  },

  middleThird: {
    flexDirection: 'row',
    justifyContent: 'center',
    
  },
  middleThirdBox: {
    width: 170,
    height: 70,
    alignSelf: 'flex-end',
    borderRadius: 18,
    borderWidth: 1.5,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',

    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 2,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 7,
  },

  //bottom
  bottomView: {
    flex: 1.8,
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
