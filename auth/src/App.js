import React, { Component } from 'react';
import { View} from 'react-native';
import firebase from 'firebase';
import {Button, Header, Spinner} from './components/common';
import LoginForm from './components/LoginForm';



class App extends Component {

    state = { loggedIn: null};

    componentWillMount(){
        firebase.initializeApp({
            apiKey: 'AIzaSyD7RgdrrwhuAqq1w8z62GTWvDlGlbnpP-o',
            authDomain: 'authentication-65ad6.firebaseapp.com',
            databaseURL: 'https://authentication-65ad6.firebaseio.com',
            projectId: 'authentication-65ad6',
            storageBucket: 'authentication-65ad6.appspot.com',
            messagingSenderId: '332223834662'
        });

        firebase.auth().onAuthStateChanged((user) =>{
            if(user){
                this.setState({ loggedIn: true});
            } else{
                this.setState({ loggedIn: false});
            }
        });
    }

    renderContent(){
        switch (this.state.loggedIn){
            case true:
                return (
                    <Button onPress={() => firebase.auth().signOut()}>
                        Log Out
                    </Button>
                    );
            case false:
                return <LoginForm/>;
            default:
                return <Spinner size="large" />
        }
    }

  render() {
    return (
      <View >
          <Header headerText="Authentication "/>
          {this.renderContent()}
      </View>
    );
  }
}


export default App;
