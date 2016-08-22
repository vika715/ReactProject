'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View, BackAndroid } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { Toolbar } from './Toolbar.js'; 
import { ID_AUTHORISATION } from './AppNavigator.js';

export var AuthorisationScreen = React.createClass({

  render: function() {
      
    return (
      <View style={styles.content}>
        <Toolbar id={ID_AUTHORISATION}/>
        <View style={styles.container}>
          <Text style={styles.welcome}>Добро пожаловать</Text>
          <Text style={styles.instructions}>
            Для использования данного приложения необходима авторизация в социальной сети facebook.
          </Text>
          <LoginButton
            publishPermissions={["publish_actions, user_posts, user_photos"]}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  alert("Произошла ошибка при авторизации: " + result.error);
                } else if (!error && !result.isCancelled) {
                   this.props.navigator.pop();
                }
              }
            }
            onLogoutFinished={() => {}}/>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin:10
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center'
  },
  instructions: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333333',
    margin: 10
  },
});