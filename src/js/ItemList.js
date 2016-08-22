'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card } from 'react-native-material-design';
import { CacheImage } from './CacheImage.js'



export var ItemList = React.createClass( {
  
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

  render: function() {
    return (
      <Card>
        <Card.Media
          image={<Image/>}
          height={72}
          children={
            <View style={styles. containerHeader}>
              <View style={{width: 56}}>
                <CacheImage 
                  uri={'https://graph.facebook.com/'+this.props.post.from.id+'/picture'}
                  typeImage={'avatar'}/>
              </View>
              <View style={styles.containerTitle}>
                <Text style={styles.titleText}>{this.props.post.from.name}</Text>
                <Text style={styles.subTitleText}>
                  {this.getDateTimeString(this.props.post.updated_time)}
                </Text>
              </View>
            </View>          
        }/>
        <Card.Body>
          {this.renderStory()}
          {this.renderImage()}
          {this.renderMessage()}
        </Card.Body>
      </Card>
    );
  }
});

var styles = StyleSheet.create({
  containerHeader: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 16,
    height: 40
  },
  containerTitle: {
    flexDirection: 'column',
    height: 40 
  },
  titleText:{
    color:"#212121", 
    fontSize: 14
  },
  subTitleText:{
    color:"#bdbdbd", 
    fontSize: 14
  },
  storyText:{
    marginBottom: 16
  }
});