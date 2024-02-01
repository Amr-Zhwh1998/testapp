import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Profile from '../Profile/Profile';
import Feature1_Home from '../Home/Home';
import Feature5_Nav from '../Group5_Feature_Nav/Feature';
import Feature3_Cancel from '../Group3_Feature_Cancel/Feature';
import Feature3_Edit from '../Group3_Feature_Edit/Feature';
import Feature3_Save from '../Group3_Feature_Save/Feature';
import Feature3_remove from '../Group3_Feature_remove/Feature';
import Screen2 from '../Group2/screen2';
import DirectorComponent from '../Group1_Feature_Nav/DirectorComponent';
import Feature4_Profile from '../Group4_New_Feature/Feature4_Profile';


const Drawer = createDrawerNavigator();

export default function UserDrawerNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Feature1_Home} />
        <Drawer.Screen name="Notifications" component={Profile} />
        <Drawer.Screen name="Nav" component={Feature5_Nav} />
        <Drawer.Screen name="Cancel" component={Feature3_Cancel} />
        <Drawer.Screen name="Edit" component={Feature3_Edit} />
        <Drawer.Screen name="Save" component={Feature3_Save} />
        <Drawer.Screen name="Remove" component={Feature3_remove} />
        <Drawer.Screen name="Screen2" component={Screen2} />
        <Drawer.Screen name="DirectorComponent" component={DirectorComponent} />
        <Drawer.Screen name="Profile" component={Feature4_Profile} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
