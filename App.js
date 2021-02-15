import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, ScrollView, Button } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import KcalGoal from './KcalGoal';
import QuickSet from './QuickButtonSetting';


export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      kcalGoal: 1500,
      kcalLog: [['햇반',300],['닭가슴살',140]],
      count:0,
      goalModal: false,
      quickSetModal: false,
      quickButtonDatas: [
        ['햇반',300],
        ['닭가슴살',140],
        ['김치찌개',300],
        ['food',0],
        ['food',0],
        ['food',0]
        // {food: '햇반', kcal: 300},
        // {food: '닭가슴살', kcal: 140},
        // {food: '김치찌개', kcal: 300},
        // {food: '', kcal: 0},
        // {food: '', kcal: 0},
        // {food: '', kcal: 0}
      ],
    }
  };

  addLog(k){
    this.setState({
      kcalLog: [...this.state.kcalLog,this.state.quickButtonDatas[k]]
    })
  }

  todayPercentage(){
    return Math.round(this.todayCalc() / this.state.kcalGoal * 100);
  }

  todayScroll(){
    let text='';
    for(var i=0; i<this.state.kcalLog.length; i++){
      text += (this.state.kcalLog[i][0] + ' ' + this.state.kcalLog[i][1] + 'kcal\n');
    }
    return text;
  }

  todayCalc(){
    let sum=0;
    for(var i=0; i<this.state.kcalLog.length; i++){
      sum += this.state.kcalLog[i][1];
    }
    return sum;
  }
  
  addCount(){
    this.setState({
      count:this.state.count+1,
      kcalLog: [],
    });
    alert(this.state.quickButtonDatas);
  }

  toggleGoalModal(){
    this.setState({
      goalModal: !this.state.goalModal
    })
  }

  toggleQuickSetModal(){
    this.setState({
      quickSetModal: !this.state.quickSetModal
    })
  }

  goalHandler(goal){
    // 확인 버튼을 누르지 않고 나갈 경우 goal에 object type이 들어가 에러 발생하기 때문에 예외처리
    if(typeof goal != 'object'){
      this.setState({
        kcalGoal : goal,
      });
    }
    this.toggleGoalModal();
  }

  quickSetHandler(food, kcal){
    if(typeof food != 'object' && typeof kcal != 'object'){

      // const modifiedArray = array.map(item => item.id === 1
      //   ? ({ ...item, text: 'Korea' }) // id 가 일치하면 새 객체를 만들고, 기존의 내용을 집어넣고 원하는 값 덮어쓰기
      //   : item,
      this.setState({
        quickButtonDatas: 'aa',
      })
    }
  }
  
  render(){
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={require('./images/background.png')}>

        <View style={styles.topView}>
          <TouchableOpacity>
            <Image source={require('./images/menuIcon4.png')}/>
          </TouchableOpacity>
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

          <TouchableOpacity>
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
              onLongPress={()=>this.toggleQuickSetModal()}
              >
              <Text style={styles.middleSecondText}>
                {this.state.quickButtonDatas[0][0]}{" "}
                {this.state.quickButtonDatas[0][1]}kcal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleThirdBox} onPress={()=>this.addLog(1)}>
              <Text style={styles.middleSecondText}>
                {this.state.quickButtonDatas[1][0]}{" "}
                {this.state.quickButtonDatas[1][1]}kcal
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.middleThird}>
            <TouchableOpacity style={styles.middleThirdBox} onPress={()=>this.addLog(2)}>
              <Text style={styles.middleSecondText}>
                {this.state.quickButtonDatas[2][0]}{" "}
                {this.state.quickButtonDatas[2][1]}kcal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleThirdBox} onPress={()=>this.addLog(3)}>
              <Text style={styles.middleSecondText}>
                {this.state.quickButtonDatas[3][0]}{" "}
                {this.state.quickButtonDatas[3][1]}kcal
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.middleThird}>
            <TouchableOpacity style={styles.middleThirdBox} onPress={()=>this.addLog(4)}>
              <Text style={styles.middleSecondText}>
                {this.state.quickButtonDatas[4][0]}{" "}
                {this.state.quickButtonDatas[4][1]}kcal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleThirdBox} onPress={()=>this.addLog(5)}>
              <Text style={styles.middleSecondText}>
                {this.state.quickButtonDatas[5][0]}{" "}
                {this.state.quickButtonDatas[5][1]}kcal
              </Text>
            </TouchableOpacity>
          </View>
          <Button title={this.state.count.toString()} onPress={this.addCount.bind(this)}></Button>
        </View>

        <View style={styles.bottomView}>
          <TouchableOpacity style={styles.bottom1}>
            <Image source={require('./images/home2.png')}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('./images/home2.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottom3}>
            <Image source={require('./images/home2.png')}/>
          </TouchableOpacity>
        </View>
        <StatusBar style='auto' />
        </ImageBackground>
        
        { this.state.goalModal ?<KcalGoal
          goalHandler={()=>this.toggleGoalModal()}
          goalHandler={(goal)=>this.goalHandler(goal)}/>
        : <></> }

        {this.state.quickSetModal ? <QuickSet/> : <></>}
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
    marginLeft: 3,
    flexWrap: 'wrap',
  },
  topTitle: {
    marginLeft: 70,
    alignContent: 'center',
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
    marginTop: 8,
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
    color: '#4abef0',
    

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
