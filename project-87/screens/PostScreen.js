import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
export default class PostScreen extends Component {
   constructor(props){
   super(props)
   this.state={
     light_theme : true
   }
 }
   componentDidMount() {
  
    this.FetchData()
  }

  async FetchData(){
    var theme 

    await firebase.database().ref("/users/" + firebase.auth().currentUser.uid )
    .on("value" , function(data){
      theme = data.val().current_theme //light or dark[by default]
     
    })
     this.setState({
        light_theme : theme === "light" ? true : false,       
      })
  }
  render() {
    if (!this.props.route.params) {
      this.props.navigation.navigate('Home');
    } 
    else {
      return (
        <View style={this.state.light_theme?styles.cardContainerLight:styles.containerLight}>
          <SafeAreaView style={styles.droidSafeArea} />

          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                style={styles.iconImage}
                source={require('../assets/logo.png')}
              />
            </View>

            <View style={styles.appTitleTextContainer}>
              <Text style={this.state.light_theme?styles.appTitleTextLight:styles.appTitleText}>Spectagram App</Text>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <Image
              style={styles.postImage}
              source={require('../assets/image_2.jpg')}
            />

            <View style={styles.titleContainer}>
              <Text style={this.state.light_theme?styles.postTitleTextLight:styles.postTitleText}>
                {this.props.route.params.Caption}
              </Text>

              <Text style={this.state.light_theme?styles.postAuthorTextLight:styles.postAuthorText}>
                {this.props.route.params.author}
              </Text>
            </View>

            <View style={styles.iconContainer}>
              <View style={styles.likeButton}>
                <Ionicons name={'heart'} color={'pink'} size={RFValue(30)} />
                <Text style={styles.likeText}>12K</Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
   containerLight: {
    flex: 1,
    backgroundColor: "white"
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: RFValue(160),
    height: RFValue(40),
    resizeMode: 'contain',
  },
  cardContainer: {
    marginTop: RFValue(20),
    margin: RFValue(13),
    backgroundColor: 'crimson',
    borderRadius: RFValue(20),
  },
  cardContainerLight: {
    margin: RFValue(20),
    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2
  },
  postImage: {
    resizeMode: 'contain',
    width: '95%',
    alignSelf: 'center',
    height: RFValue(250),
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: 'center',
  },
  postTitleText: {
    fontSize: RFValue(25),
    fontWeight: 'bold',
    color: 'snow',
    fontFamily: 'cursive',
  },
  postTitleTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "black"
  },
  postAuthorText: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'cursive',
  },
postAuthorTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "black"
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    borderRadius: RFValue(30),
  },
  likeText: {
    color: 'white',
    fontFamily: 'cursive',
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'cursive',
    fontWeight: 'bold',
  },
    appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
});
