'use strict';

import React, { Component } from 'react';
import { StyleSheet, Image, Text } from 'react-native';
import RNFS, { ExternalStorageDirectoryPath } from 'react-native-fs';

export var CacheImage = React.createClass({
 
  getInitialState: function() {
  	return{
    	uri : this.props.uri,
    	cachedFilePath : null,
    	jobId: null,
      error: null
 	  };
  },
  
  componentWillUnmount: function() {
    if (this.state.jobId != null) {
    	RNFS.stopDownload(this.state.jobId);
    }
  },

  async downloadBeginCallbackResult (info) {
	    this.setState({ jobId: info.jobId });
  },

  setStateLoad: function(state){
    this.setState(state);
  },

  async loadImage(){
  	var fileName = hashCode(this.state.uri+'_')+'.png';
  	var dirPath = RNFS.ExternalStorageDirectoryPath + '/.postImages';
  	var filePath = dirPath + '/' + fileName;
  	RNFS.stat(filePath)
  	.then((res) => {
      if (res.isFile()) {
	 		  this.setState({ cachedFilePath: filePath });
    	}
    })
    .catch((err) => {
    	RNFS.mkdir(dirPath)
      .then(() => {
        return ({
          fromUrl: this.state.uri,
          toFile: filePath,
          background: false
        });
      })
      .then((downloadOptions) =>{
        RNFS.downloadFile(downloadOptions)
      })
      .then((joid, res) => {
        this.setState({cachedFilePath: filePath});
      })
    	.catch((err) => {setState({error: err})})
    })
  },

  render: function() {
    if (this.state.cachedFilePath == null && this.state.error == null){
      {this.loadImage()}
      return null;
    } else {
  		if (this.props.typeImage == 'post'){
  		  return(
          <Image 
  			    source={{uri: 'file://'+this.state.cachedFilePath}}
  		      resizeMode={Image.resizeMode.content}
            style={styles.post}/>
        );
      }
      if (this.props.typeImage == 'avatar'){
        return(
          <Image 
            source={{uri: 'file://'+this.state.cachedFilePath}}
            style={styles.avatar}/>
        );
      }
    }
  }

});

var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return Math.abs(hash);
};

var styles = StyleSheet.create({
  avatar: {
    width: 40, 
    height: 40,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,.1)',
    borderWidth: 1
  },
  post:{
    height: 200
  }
});