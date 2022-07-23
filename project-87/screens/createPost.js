import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from 'firebase';
export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImage: 'Image1',
      dropDownHeight: 40,
      light_theme: true,
    };
  }
  componentDidMount() {
    this.FetchData();
  }

  async FetchData() {
    var theme;

    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', function (data) {
        theme = data.val().current_theme; //light or dark[by default]
      });
    this.setState({
      light_theme: theme === 'light' ? true : false,
    });
  }
  render() {
    let previewImage = {
      Image1: require('../assets/image_1.jpg'),
      Image2: require('../assets/image_2.jpg'),
      Image3: require('../assets/image_3.jpg'),
      Image4: require('../assets/image_4.jpg'),
      Image5: require('../assets/image_5.jpg'),
      Image6: require('../assets/image_6.jpg'),
      Image7: require('../assets/image_7.jpg'),
    };
    return (
      <View
        style={
          this.state.light_theme ? styles.containerLight : styles.container
        }>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <Text
          style={this.state.light_theme ? styles.headingLight : styles.heading}>
          CREATE POST
        </Text>
        <ScrollView>
          <Image
            source={previewImage[this.state.previewImage]}
            style={styles.previewImage}
          />
          <View style={{ height: RFValue(this.state.dropDownHeight) }}>
            <DropDownPicker
              items={[
                { label: 'Image 1', value: 'Image1' },
                { label: 'Image 2', value: 'Image2' },
                { label: 'Image 3', value: 'Image3' },
                { label: 'Image 4', value: 'Image4' },
                { label: 'Image 5', value: 'Image5' },
                { label: 'Image 6', value: 'Image6' },
                { label: 'Image 7', value: 'Image7' },
              ]}
              defaultValue={this.state.previewImage}
              containerStyle={{
                height: 40,
                borderRadius: 20,
                marginBottom: 10,
              }}
              onOpen={() => {
                this.setState({ dropdownHeight: 170 });
              }}
              onClose={() => {
                this.setState({ dropdownHeight: 40 });
              }}
              style={{ backgroundColor: 'transparent' }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{ backgroundColor: 'crimson' }}
              labelStyle={
                this.state.light_theme
                  ? styles.dropdownLabelLight
                  : styles.dropdownLabel
              }
              arrowStyle={
                this.state.light_theme
                  ? styles.dropdownLabelLight
                  : styles.dropdownLabel
              }
              onChangeItem={(item) =>
                this.setState({
                  previewImage: item.value,
                })
              }
            />
          </View>
          <TextInput
            style={
              this.state.light_theme ? styles.textInputLight : styles.textInput
            }
            onChangeText={(caption) => this.setState({ caption })}
            placeholder="Caption"
            placeholderTextColor="pink"
          />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'cursive',
    fontWeight: 'bold',
  },
  headingLight: {
    color: 'black',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
  logo: {
    width: 50,
    height: 50,
  },
  previewImage: {
    width: 220,
    height: 220,
    marginLeft: 40,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'transparent',
    width: 300,
    fontSize: 15,
    marginTop: 5,
    height: 30,
    color: 'white',
  },
  textInputLight: {
    height: RFValue(40),
    borderColor: 'black',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: 'black',
    fontFamily: 'Bubblegum-Sans',
  },
  dropdownLabel: {
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
  },
  dropdownLabelLight: {
    color: 'black',
    fontFamily: 'Bubblegum-Sans',
  },
});
