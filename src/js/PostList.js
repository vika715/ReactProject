'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, ListView } from 'react-native';
import { ID_POST } from './AppNavigator.js';
import { ItemList } from './ItemList.js';

export var PostList = React.createClass( {
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return { 
      dataSource: ds.cloneWithRows(this.props.posts)
    };
  },
 
  renderRow: function(rowData) {
    return (
      <View >
        <TouchableHighlight 
          underlayColor='#f5f5f5'
          onPress={() => this.props.onItemClick({
            id: ID_POST, 
            post: rowData
          })}>
          <View>
            <ItemList post={rowData} />
          </View>
        </TouchableHighlight>
      </View>
    );
  },

  render: function() {
    return (
      <ListView 
        style={styles.list}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => this.renderRow(rowData)}/>
    );
  }
});

var styles = StyleSheet.create({
  list: {
    flex:1,
    flexDirection: 'column',
    height: 500
  }
});