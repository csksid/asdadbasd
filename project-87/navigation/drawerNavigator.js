import React,{Component} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer'
import TabNavigator from './TabNavigator';
import Profile from '../screens/Profile'
import StackNavigator from './StackNavigator'
import LogoutScreen from '../screens/LogoutScreen'
const Drawer = createDrawerNavigator()
const DrawerNavigator = ()=>{
    return(
    <Drawer.Navigator>
        <Drawer.Screen name="Home" component={StackNavigator}/>
        <Drawer.Screen name="Profile" component={Profile}/>
        <Drawer.Screen name="LogOut" component={LogoutScreen} />
    </Drawer.Navigator>
    )
}
export default DrawerNavigator