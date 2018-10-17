import React from 'react';
import { createStackNavigator } from 'react-navigation';

import stylesd from '../styles';
import {AppScreen} from '../screens';

export default createStackNavigator(
  {
    App: AppScreen
  }, 
  {
    headerMode:"float",
    // initialRouteName: App,
    navigationOptions: 
    {
      // headerTitle:'MyFood',
      headerBackTitleStyle:{
        color: '#fff'
      },
      headerTitleStyle: {
        color: '#fff'
      },
      headerStyle:
      {
        backgroundColor: stylesd.primaryColor,
        borderBottomColor:'transparent'
      }
    }
  }
)