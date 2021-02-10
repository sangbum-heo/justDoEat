import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, ScrollView, Button } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import KcalGoal from './KcalGoal';

const quickButtons = [
  {food:'', kcal:0},
  {food:'', kcal:0},
  {food:'', kcal:0},
  {food:'', kcal:0},
  {food:'', kcal:0},
  {food:'', kcal:0}
];


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      kcalGoal: 1500,
      kcalToday: [],
      kcalNow: 0,
      count:0,
      goalModal: false,
      }
  };

  addCount(){
    this.setState({count:this.state.count+1})
  };

  toggleGoalModal(){
    this.setState({
      goalModal: !this.state.goalModal
    })
  }

  goalHandler(goal){
    this.setState({
      kcalGoal: goal,
    });
    this.toggleGoalModal();
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
              <Text style={styles.midddleFirstTextEat}>Today : {this.state.kcalNow}kcal</Text>
            </View>
            </TouchableOpacity>
            <View style={{marginRight:15}}>
              
              <ProgressCircle
              percent={20} // 여기 퍼센트(int)랑 아래에 text 부분(string) 같이 바뀌어야함
              radius={40}
              borderWidth={5}
              color="#3399FF"
              shadowColor="#999"
              bgColor="#fff"
              >
                <Text style={{ fontSize: 21 }}>{'20%'}</Text>
              </ProgressCircle>
              
            </View>
          </View>

          <View style={styles.middleSecond}>
            <Text style={styles.middleSecondTitle}>섭취 기록</Text>
            <ScrollView>
              <Text style={styles.middleSecondText}>햇반 300kcal</Text>
            </ScrollView>
          </View>

          <View style={styles.middleThird}>
            <TouchableOpacity style={styles.middleThirdBox}>
              <Text style={styles.middleSecondText}>햇반 300kcal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleThirdBox}>
              <Text style={styles.middleSecondText}>닭찌찌 140kcal</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.middleThird}>
            <TouchableOpacity style={styles.middleThirdBox}>
              <Text style={styles.middleSecondText}>김치찌개 300kcal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleThirdBox}>
              <Text style={styles.middleSecondText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.middleThird}>
            <TouchableOpacity style={styles.middleThirdBox}>
              <Text style={styles.middleSecondText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleThirdBox}>
              <Text style={styles.middleSecondText}>+</Text>
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
    width: 270,
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
