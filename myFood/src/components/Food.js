import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import stylesd from '../styles';
import EditFoodModal from './EditFoodModal';

const { width, height } = Dimensions.get('window');

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleEditModal : false
    }
  }

  closeModal() {
    this.setState({ visibleEditModal: false });
  }

  render(){
    const { name, calories } = this.props;
    const { visibleEditModal } = this.state;
    const data = {};
    data[name] = calories;
    return(
      <View  style={styles.container} >
        <Text style={styles.txtName}>{name}</Text>
        <Text style={styles.txtCalorie}>{`${calories} calories`}</Text>
        <TouchableOpacity style={styles.btnCancel} onPress={() => this.setState({ visibleEditModal: true })}>
          <Text style={{ color: '#000', flexDirection:'row', fontSize:20 }}>...</Text>
        </TouchableOpacity>
        <EditFoodModal visible={visibleEditModal} closeModal={this.closeModal.bind(this)} data={data}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:stylesd.otherColor2,
    width: width*0.45,
    height: height/4,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal:20,
    flexWrap:'wrap'
  },
  btnCancel: {
    // backgroundColor:'#000',
    width: 30,
    height: 30,
    alignItems:'center',
    justifyContent:'center',
    // borderRadius: 50,
    position:'absolute',
    right: 10,
    top: 5
  },
  txtName: {
    fontSize: stylesd.fontSize,
    fontWeight:stylesd.fontWeight,
    color:'#000',
    // textAlign:'center'
  },
  txtCalorie: {
    color:'#000',
    // textAlign:'center'
  }
})
