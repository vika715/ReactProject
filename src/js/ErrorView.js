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
		fontSize: 18,
		textAlign: 'center',
    marginTop: 240,
    margin: 20	
	}
});