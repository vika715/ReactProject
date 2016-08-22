'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export var ErrorView = React.createClass({
  render: function() {
    return (
      <Text style={styles.text}>При загрузке данных произошла ошибка</Text>
    );
  }
});

var styles = StyleSheet.create({
  text:{
    fontSize: 20,
    textAlign:'center',
    paddingTop: 250,
    margin: 20
  }
});