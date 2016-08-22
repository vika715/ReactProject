'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableHighlight, RefreshControl } from 'react-native';
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { PostList } from './PostList.js'; 
import { Toolbar } from './Toolbar.js';
import { ID_AUTHORISATION, ID_MAIN, ID_POST } from './AppNavigator.js';
import { AuthorisationScreen } from './AutorisationScreen.js'
import { LoadingView } from './LoadingView.js'; 
import { ErrorView } from './ErrorView.js'; 

export var MainScreen = React.createClass({
  
  getInitialState: function () {
    return {
      isLoading: true,
      isError: false,
      posts: null,
      token: null,
      isRefreshing: false
    };
  },

  authorized: function(){
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        if (data === null){
          this.props.onForward({
            id: ID_AUTHORISATION
          });
        }
        else {
          var _token = data.accessToken.toString();
          if (_token === null){
            this.props.onForward({
              id: ID_AUTHORISATION
            });
          } else {
            this.setState({
              token: _token
            });
          }
        }
      }
    )
  },

  requestPostList: function(token){
    
    const responseCallback = (error, result) => {
      if (error) {
        this.setState({
          isError: true,
          isRefreshing: false
        });
      } else {
        let feed = result.data;
        if (feed != undefined && feed.length > 0){
          this.setState({
            posts: feed,
            isLoading: false,
            isError:false,
            isRefreshing: false
          });
        } else {
          alert("У пользователя нет постов");
          this.setState({
            isLoading: false,
            isRefreshing: false
          });
        }
      }
    }

    const profileRequest = new GraphRequest(
      '/Disturbed/feed',
      {
        httpMethod: 'GET',
        version: 'v2.7',
        parameters: {
          fields: {
              string: 'from,message,full_picture,updated_time,story'
          }
        },
        accessToken: token
      },
      responseCallback
    );

    new GraphRequestManager().addRequest(profileRequest).start();
  },

  renderBody: function(){
    if(this.state.isError && this.state.posts == null){
      return(
        <RefreshControl
          refreshing={this.state.isRefreshing}
          onRefresh={this._onRefresh}>
          <ErrorView/>
        </RefreshControl>  
      );
    }
    if (this.state.isLoading){
      return(
        <LoadingView/>
      );
    } 
    return( 
      <RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={this._onRefresh}>
        <PostList 
          posts={this.state.posts}
          onItemClick={(route) => {this.props.onForward(route)}}/>   
      </RefreshControl>   
    );
  },

  _onRefresh: function(){
    this.setState({
      isRefreshing: true
    });
  },

  render: function() {
    if ((this.state.token != null && this.state.posts == null && !this.state.isError) || this.state.isRefreshing){
      this.requestPostList(this.state.token);
    }
    if (this.state.token == null){
      this.authorized();
    }    
    return(
      <View>
        <Toolbar 
          id={ID_MAIN} 
          onForward={(route) => this.props.onForward(route)}/>
        {this.renderBody()}
      </View>
    );
  }  
});