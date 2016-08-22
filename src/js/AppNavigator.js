'use strict';

import React, { Component } from 'react';
import { Navigator } from 'react-native';
import { AuthorisationScreen } from './AutorisationScreen.js'; 
import { PostScreen } from './PostScreen.js'; 
import { MainScreen } from './MainScreen.js'; 
import { LoadingView } from './LoadingView.js'; 

export const ID_MAIN = 0;
export const ID_POST = 1;
export const ID_AUTHORISATION = 2;

export var AppNavigator = React.createClass({
  
   _renderScene: function(route, navigator) {
    let routeId = route.id;
    if (routeId === ID_MAIN) {
      return (
        <MainScreen
          onForward={(route) => {this._navigate(route, navigator)}}/>
      );
    }
    if (routeId === ID_POST) {
      return (
        <PostScreen 
          post={route.post}
          navigator={navigator}/>
      );  
    }
    if (routeId === ID_AUTHORISATION) {
      return (
        <AuthorisationScreen
          navigator={navigator}/>
      );  
    }
  },

  _navigate: function(route, navigator){
    var routeStack = navigator.getCurrentRoutes();
    if (routeStack.length > 0 && routeStack.pop().id != route.id){
      navigator.push(route);
    }
  },

  render: function() {
    return (
      <Navigator
        initialRoute={{ id: ID_MAIN }}
        renderScene={ (route, navigator) => this._renderScene(route, navigator)}
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}/>
    );
  }
});