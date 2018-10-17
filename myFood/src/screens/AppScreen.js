import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import axios from 'axios';

import stylesd from '../styles';
import Food from '../components/Food';
import AddNewFoodModal from '../components/AddNewFoodModal';
import baseURL from '../baseURL';
// const baseURL = 'http://localhost:8080'
const { width } = Dimensions.get('window');

export default class AppScreen extends React.Component {
  static navigationOptions = {headerTitle:'MyFood'};
  constructor(props){
    super(props);
    this.state = {
      search: '',
      loading: false,
      data : {},
      visibleAddModal: false,
      visibleEditModal: false
    }
  }
  showLoading() {
    this.setState({ loading: true });
  }
  hideLoading() {
    this.setState({ loading: false })
  }
  findFood() {
    const { search } = this.state;
    if(!search) return;

    // this.showLoading();
    axios.get(`${baseURL}/food/${search}`).then( res => {
      // this.hideLoading();
      if(res.status === 200) {
        Alert.alert(`Calories of ${search}`, `${res.data}`)
      } else {
        // console.log(res);
        Alert.alert(`${res.data}`)
      }
    }).catch(err => {
      // this.hideLoading();
      console.log(err);
    })
  }
  getAllFoods() {
    axios.get(`${baseURL}/food`).then( res => {
      if(res.status === 200) {
        this.setState({ data: {...res.data} })
      } else {
        console.log(res);
        Alert.alert(res.data)
      }
    }).catch( err => {
      console.log(err);
    })
  }
  closeModal() {
    this.setState({ visibleAddModal: false })
  }
  render() {
    const { search, loading, data, visibleAddModal } = this.state;
    return(
      <SafeAreaView style={styles.container}>
        <View style={{ paddingHorizontal: 10, flex:1 }}>
          <View style={{ flexDirection:'row', marginBottom: 10 }}>
            <TextInput 
              placeholder='Enter a food' 
              style={styles.txtInput} 
              returnKeyType='search'
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.findFood()}
              value={search}
              onChangeText={ search => this.setState({ search }) }
            />
            <TouchableOpacity 
              style={styles.btnSearch}
              activeOpacity={0.6}
              onPress={() => this.findFood()}
            >
              <Text style={{ fontWeight:'bold'}}>Find</Text>
            </TouchableOpacity>
          </View>
        <ScrollView 
          style={styles.scrollContent} 
          contentContainerStyle={styles.scrollContainer}
        >
          {
            Object.getOwnPropertyNames(data).map( (value, index) => 
              <Food key={index} name={value} calories={data[value]}/>)
          }
        </ScrollView>
        <TouchableOpacity style={styles.btnAdd} onPress={() => this.setState({ visibleAddModal: true })}>
          <Text style={styles.txtAdd}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnAllFoods} activeOpacity={0.6} onPress={() => this.getAllFoods()}>
          <Text style={ styles.txtAllFoods}>All myFoods</Text>
        </TouchableOpacity>
        </View>
        <AddNewFoodModal closeModal={this.closeModal.bind(this)} visibleModal={visibleAddModal}/>
        <Modal visible={loading} transparent onRequestClose={() => this.hideLoading()} onDismiss={() => this.hideLoading()}>
          <View style={styles.modal}>
            <ActivityIndicator color='#fff' size='large' />
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    // alignItems:'center',
    backgroundColor: stylesd.primaryColor,
  },
  txtInput: {
    backgroundColor:'#fff',
    paddingVertical: 10,
    borderRadius: 10,
    flex:1,
    textAlign:'center'
  },
  btnSearch : {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: stylesd.otherColor,
    marginLeft: 10
  },
  btnAllFoods: {
    backgroundColor: stylesd.terciaryColor,
    paddingVertical: 20,
    borderRadius: 10
  },
  txtAllFoods: {
    textAlign:'center',
    fontSize:stylesd.fontSize,
    color: '#fff',
    fontWeight:stylesd.fontWeight
  },
  btnAdd: {
    position:'absolute',
    borderRadius: width*0.1,
    backgroundColor: stylesd.secondColor,
    width: width*0.2,
    height:width*0.2,
    bottom: 70,
    right: 20,
    shadowOpacity: 0.3,
    shadowOffset: {height: 5, width: 2},
    alignItems:'center',
    justifyContent:'center',
  },
  txtAdd: {
    fontSize: 40,
    color:'#fff',
    fontWeight:'900',
    textAlign:'center'
  },
  modal: {
    flex: 1,
    backgroundColor:'rgba(0,0,0,0.5)',
    alignItems:'center',
    justifyContent:'center'
  },
  scrollContent: {
    flex:1,
    // flexDirection:'row',
  },
  scrollContainer: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between'
    // alignItems:'center', 
    // justifyContent:'center'
  }
})
