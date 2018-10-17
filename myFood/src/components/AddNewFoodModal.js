import React from 'react';
import axios from 'axios';
import { View, Modal, StyleSheet, Text, TextInput, Alert, TouchableOpacity } from 'react-native';

const baseURL = 'http://localhost:8080/food';

export default class AddNewFoodModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      calories: ''
    }
  }
  addFood() {
    const { name, calories } = this.state;
    const o = {};
    o[name] = calories;
    axios.post(baseURL, o).then( res => {
      Alert.alert(res.data);
      this.setState({ name: '', calories: '' })
    }).catch( err => {
      console.log(err);
    });
  }
  render() {
    const {name, calories} = this.state;
    const { closeModal, visibleModal } = this.props;
    return(
      <Modal 
        animationType='fade'
        visible={visibleModal} 
        onRequestClose={() => closeModal()} 
        transparent
      >
        <View style={styles.modalContainer}>
          <View style={styles.boxContent}>
            <Text style={styles.txtModal}>New food</Text>
            <TextInput 
              placeholder='Food name' 
              style={styles.txtInput}
              value={name}
              returnKeyType='next'
              underlineColorAndroid='transparent'
              onChangeText={ name => this.setState({ name })}
              />
            <TextInput 
              placeholder='Amount of calories' 
              style={styles.txtInput}
              value={calories}
              returnKeyType='send'
              keyboardType='numeric'
              underlineColorAndroid='transparent'
              onChangeText={ calories => this.setState({ calories })}
            />
            <View style={{ flexDirection:'row' }}>
              <TouchableOpacity 
                onPress={ () => this.addFood()}
                disabled={!(name && calories)}
                style={ styles.btnAdd }
              >
                <Text style={styles.txtButton}>Add</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity 
                onPress={ () => closeModal()}
                style={ styles.btnCancel }
              >
                <Text style={styles.txtButton}>Cancel</Text>
              </TouchableOpacity> */}
            </View>
            <TouchableOpacity style={styles.btnCloseModal} onPress={() => closeModal()}>
              <Text style={{ color: '#fff' }}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex:1,
    backgroundColor:'rgba(0,0,0,0.4)',
    justifyContent:'center',
    alignItems:'center'
  },
  txtInput: {
    alignSelf:'stretch',
    borderWidth: 1,
    borderColor: '#DDD',
    textAlign:'center',
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  txtModal: {
    fontSize: 25,
    fontWeight:'bold',
    marginBottom: 20
  },
  boxContent: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems:'center',
    width: '80%'
  },
  btnAdd: {
    backgroundColor:'green',
    alignItems:'center',
    justifyContent:'center',
    // width: '30%',
    // alignSelf:'stretch',
    flex:1,
    paddingVertical: 10,
    borderRadius: 5,
  },
  btnCancel: {
    paddingVertical: 10,
    backgroundColor:'red',
    alignItems:'center',
    justifyContent:'center',
    // width: '40%',
    flex:1,
    // alignContent:'stretch',
    // alignSelf:'stretch',
    marginLeft: 10,
    borderRadius: 5,
  },
  txtButton: {
    color: '#fff',
    fontWeight:'bold',
    fontSize: 16
  },
  btnCloseModal: {
    position: 'absolute',
    right: -5,
    top:-5,
    backgroundColor:'#000',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems:'center',
    justifyContent:'center'
  }
})