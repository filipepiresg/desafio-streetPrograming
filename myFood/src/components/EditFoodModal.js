import React, { Component } from 'react';
import { View, Modal, TextInput, TouchableOpacity, Alert, StyleSheet, Text } from 'react-native';
import axios from 'axios';

import baseURL from '../baseURL';
import stylesd from '../styles';
// const baseURL = 'http://localhost:8080'
// import styles from './styles';

export default class EditFoodModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      calories: ''
    }
  }
  componentDidMount() {
    const { data } = this.props;
    const name = Object.getOwnPropertyNames(data)[0];
    this.setState({ calories: data[name].toString() })
  }
  updateFood() {
    const { data } = this.props;
    const { calories } = this.state;
    const name = Object.getOwnPropertyNames(data)[0];
    const o = {};
    o[name] = calories;
    axios.patch(`${baseURL}/food`, o)
      .then(res => {
        if(res.status === 200) {
          /* Alert.alert('Item has modified') */
          Alert.alert(res.data);
        }

      })
      .catch( err => {
        console.log(err);
      })

  }
  deleteFood() {
    const { data } = this.props;
    const name = Object.getOwnPropertyNames(data)[0];
    axios.delete(`${baseURL}/food/${name}`)
      .then( res => {
        Alert.alert(res.data);
      })
      .catch( err => {
        console.log(err);
      })
    this.props.closeModal();
  }
  render() {
    const { visible, closeModal, data } = this.props;
    const { calories } = this.state;
    const name = Object.getOwnPropertyNames(data)[0];
    return (
      <Modal
        visible={visible}
        transparent
        animationType='fade'
        onRequestClose={()=>closeModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.boxModal}>
            <Text style={styles.txtTitle}>Edit food</Text>
            <TextInput value={name} style={styles.txtInput} editable={false}/>
            <TextInput 
              value={calories} 
              style={styles.txtInput} 
              onChangeText={ calories => this.setState({ calories })}
            />
            <View style={{ flexDirection:'row' }}>
              <TouchableOpacity 
                style={[styles.btnAction, { backgroundColor:'green' }]}
                onPress={() => this.updateFood()}
              >
                <Text style={ styles.txtBtn }>update</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.btnAction, { backgroundColor:'red', marginLeft: 10 }]}
                onPress={() => this.deleteFood()}
              >
                <Text style={ styles.txtBtn }>delete</Text>
              </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems:'center'
  },
  boxModal: {
    width: '80%',
    alignItems:'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  btnAction: {
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    paddingVertical: 10,
    borderRadius: 5,
  },
  txtBtn: {
    color:'#fff',
    fontSize: stylesd.fontSize,
    fontWeight: stylesd.fontWeight
  },
  txtInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    alignSelf:'stretch',
    textAlign:'center',
    marginBottom: 10,
    paddingVertical: 10
  },
  txtTitle: {
    fontSize: 25,
    fontWeight:'bold',
    marginBottom: 20
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
