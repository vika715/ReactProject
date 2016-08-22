'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View, BackAndroid, Image, ScrollView, InteractionManager  } from 'react-native';
import { CacheImage } from './CacheImage.js'
import { ID_POST } from './AppNavigator.js';
import { Toolbar } from './Toolbar.js'; 

export var PostScreen = React.createClass({
  getDateTimeString: function(dateString){
    var moment = require('moment');
    require('moment/locale/ru');
    moment.locale('ru');
    return(moment(dateString,moment.ISO_8601).format('D MMM, HH:mm:ss'));
  },

  renderStory: function(){
    if (this.props.post.story !== undefined){
      return(
        <Text style={styles.storyText}>{this.props.post.story}</Text>
      );
    }
  },

  renderImage: function(){
    if (this.props.post.full_picture !== undefined){
      return(
        <CacheImage uri={this.props.post.full_picture} typeImage={'post'}/>
      );
    }
  },

  renderMessage: function(){
    if (this.props.post.message !== undefined){
      return(
        <Text style={{marginTop: (this.props.post.full_picture !== undefined) ? 16 : 0}}>
          {this.props.post.message}
        </Text>
      );
    }  
  },

  renderBody: function(){
    return(
      <ScrollView
        style={styles.body}
        ref={(ref) => this.myScroll = ref}>
        <Text style={styles.titleText}>{this.props.post.from.name}</Text>
        <Text style={styles.subTitleText}>
          {this.getDateTimeString(this.props.post.updated_time)}
        </Text>
        {this.renderStory()}
        {this.renderImage()}
        {this.renderMessage()}
      </ScrollView>
    );
  },

  render: function() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      this.props.navigator.pop();
      return true;
    }); 
    return (
      <View>
        <Toolbar 
          id={ID_POST}
          onBack={() => this.props.navigator.pop()}/>
          {this.renderBody()}     
      </View>
    );
  }
});

var styles = StyleSheet.create({
  titleText:{
    color:"#212121", 
    fontSize: 14
  },
  subTitleText:{
    color:"#bdbdbd", 
    fontSize: 14,
    marginBottom: 16
  },
  storyText:{
    marginBottom: 16
  },
  body:{
    flex:1,
    margin:16,
    height:900
  }
});