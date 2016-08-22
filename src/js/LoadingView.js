'use strict';

import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';

export var LoadingView = React.createClass({
  render: function() {
    return (
      <ActivityIndicator
        animating={true}
        style={styles.centering}
        color='#415dae'
        size="large" />
    );
  }
});

var styles = StyleSheet.create({
  centering: {
    marginTop: 220,
    height: 80
 }
});
