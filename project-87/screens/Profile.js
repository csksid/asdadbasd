import React,{Component} from 'react';
import { Text, View, StyleSheet,SafeAreaView,StatusBar,Platform,Image,Switch } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from "firebase";
export default class Profile extends Component{
  constructor(props) {
    super(props);
    this.state = {
      light_theme : true,
      profile_image : "",
      name : "",
      isEnabled : false
    };
  }
  componentDidMount(){
    this.FetchData()
  }
  async FetchData(){
    var theme , image , name
    await firebase.database.ref("/users/"+firebase.auth().currentUser.uid)
    .on("value",function(data){
      theme = data.val().current_theme
      name = `${data.val().first_name}${data.val().last_name}`
      image = data.val().profile_picture
    })
    this.setState({
      light_theme:theme==="light"?true:false,
      isEnabled:theme==="light"?false:true,
       profile_image:image,
        name:name,
    })
  }
  toggleSwitch(){
    const previousIsEnabled = this.state.isEnabled

    const theme = !this.state.isEnabled ? "dark" : "light"

    var updates = {}

    updates["/users/" + firebase.auth().currentUser.uid + "/current_theme"] = theme
  
    firebase.database().ref().update(updates)

    this.setState({ isEnabled : !previousIsEnabled , light_theme:previousIsEnabled})
  }
    render(){
        return(
            <View style={styles.container}>
            <SafeAreaView style={styles.droidSafeArea}>
               <View style={styles.appTitle}>
          <View style={styles.appIcon}>
            <Image
              style={styles.iconImage}
              source={require('../assets/logo.png')}
            />
          </View>
          <View style={styles.appTitleTextContainer}>
            <Text style={styles.appTitleText}>Spectagram App</Text>
          </View>
        </View>
        <Switch
                    style={{marginTop:RFValue(30)}}
                  
                    trackColor={{ false : "pink" , true : "crimson"}}
                    thumbColor={this.state.isEnabled ? "white":"red"}
                    ios_backgroundColor="yellow"
                    onValueChange={()=>this.toggleSwitch()}
                    value = {this.state.isEnabled}
                  />
        </SafeAreaView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(48),
    fontFamily: 'cursive',
    fontWeight: 'bold',
    marginTop:RFValue(50),
      justifyContent: 'center',
      alignItems:'center'
  },
 
});