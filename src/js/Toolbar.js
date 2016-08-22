'use strict';

import React, { Component } from 'react';
import { StyleSheet, ToolbarAndroid } from 'react-native';
import { LoginManager } from 'react-native-fbsdk';
import { ID_MAIN, ID_AUTHORISATION, ID_POST } from './AppNavigator.js';

export var Toolbar = React.createClass({
  render: function() {
    switch (this.props.id){
      case ID_POST:
        return (
          <ToolbarAndroid
            title="Posts"
            style={styles.toolbar}
            titleColor='#ffffff'
            navIcon={require('../res/arrow_back.png')}
            onIconClicked={() => this.props.onBack()}/>
        );
      case ID_MAIN:
        return(
          <ToolbarAndroid
            title="Posts"
            style={styles.toolbar}
            titleColor='#ffffff'
            actions={toolbarActions}
            onActionSelected={this._onActionSelected}/>
        );
      case ID_AUTHORISATION:
        return (
          <ToolbarAndroid
            title="Post"
            titleColor='#ffffff'
            style={styles.toolbar}/>
        );
    }    
  },
  _onActionSelected: function(position) {
    if (toolbarActions[position].title === "Выйти"){
      LoginManager.logOut();
      this.props.onForward({
         id: ID_AUTHORISATION
      });     
    }
  }

});

var styles = StyleSheet.create({
  toolbar: {
    height: 56,
    backgroundColor: '#415dae'
  }
});

var toolbarActions = [{title: 'Выйти', show: 'never'}];
