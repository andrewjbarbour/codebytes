import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Switch } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  createDrawerNavigator, 
  DrawerContentScrollView, 
  DrawerItemList,
  DrawerItem  } from '@react-navigation/drawer'
import Ionicons from 'react-native-vector-icons/Ionicons';

const FeedScreen = () => {
  return (
  <View style={styles.layout}>
  </View>)
}

const CatalogScreen = () => {
  return (
  <View style={styles.layout}>
    <CourseCard name="Learn React"></CourseCard>
    <CourseCard name="Learn React Native"></CourseCard>
    <CourseCard name="Learn Swift"></CourseCard>
  </View>)
}

const GoalScreen = () => {
  return (
  <View style={styles.layout}>
  </View>)
}

const ProfileScreen = () => {
  return (
  <View style={styles.layout}>
  </View>)
}

const CourseCard = (props) => {
  return (
    <View style={styles.courseCard}>
      <Text style={styles.courseText}>{props.name}</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <Tab.Navigator
    
    screenOptions={({ route }) => ({
      tabBarShowLabel: false,
      tabBarStyle: {backgroundColor: 'red'},
      tabBarIcon: ({ focused, color, size, backgroundColor }) => {
        let iconName;

        if (route.name === 'Feed') {
          iconName = focused
            ? 'ios-home'
            : 'ios-home';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'ios-person' : 'ios-person';
        } else if (route.name === 'Catalog'){
          iconName = 'ios-apps';
        } else if (route.name === 'Goals'){
          iconName = 'ios-trending-up';
        }

        return <Ionicons name={iconName} size={30} color={focused ? 'orange' : "#000000"}/> 
        },
        tabBarActiveTintColor: '#ff9d9c'
    })}
  >
    <Tab.Screen
      name={'Feed'}
      component={FeedScreen}
    />
    <Tab.Screen
     name={ 'Catalog' }
     component={CatalogScreen}
    />
    <Tab.Screen
     name={ 'Goals' }
     component={GoalScreen}
    />
    <Tab.Screen
     name={ 'Profile' }
     component={ProfileNavigator}
    />
  </Tab.Navigator>
  )
}

const AccountScreen = () => {
  return(
    <View>
    </View>
  )
}

const PreferencesSwitch = (props) => {
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return(
    <View style={styles.switchContainer}>
    <View style={styles.switchView}>
      <Text style={styles.switchText}>{props.label}</Text>
      <Switch styles={styles.switch}
        thumbColor={isEnabled ? 'orange': '#f4f3f4'}
        trackColor={{false: '#f4f3f4', true:'orange'}}
        ios_backgroundColor={isEnabled ? 'orange': '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  </View>
  )
}

const NotificationsScreen = () => {
  return(
    <>
    <PreferencesSwitch label="Enable notifications" />
    <PreferencesSwitch label="Enable notification sounds" />
    </>
  )
}

const HistoryScreen = () => {
  return(
  <View>
  </View>
  )
}

const SettingsScreen = () => {
  return(
    <View>
      <Text>Settings</Text>
    </View>
  )
}


const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem 
        label={() => <><Text style={{fontSize: 20}}>Menu</Text></>}
      />
      <DrawerItemList {...props}/>
    </DrawerContentScrollView>
  )
}

const Drawer = createDrawerNavigator();

export const ProfileNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props}/>}
      screenOptions={{
        drawerPosition:"right",
        drawerType:"front",
        swipeEdgeWidth: 100,
        headerShown: false,
        drawerStyle: {
          backgroundColor: 'red',
          width: "100%"
        },
        drawerActiveTintColor: 'orange'
      }
      }
    >
      <Drawer.Screen
        name={'Account'}
        component={AccountScreen}
      />
      <Drawer.Screen
        name={'Notifications'}
        component={NotificationsScreen}
      />
      <Drawer.Screen
        name={'History'}
        component={HistoryScreen}
      />
      <Drawer.Screen         
        name={'Settings'}
        component={SettingsScreen}
      />
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer styles={styles.layout}>
      <MainNavigator styles={styles.layout} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  courseCard: {
    flex: 1,
    borderColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 15,
    margin: 20,
    width: 200,
    maxHeight: 100 
  },
  courseText: {
    textAlign: 'center',
    fontWeight: '700',
    color: 'orange'
  },
  switchContainer: {
    flex: 0, 
    height: 100,
    marginRight: 20,
    justifyContent: "flex-start"
  },
  switchView: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    paddingLeft: 30
  },
  switch:{
    flex: 2
  },
  switchText:{
    flex: 1,
    fontSize: 16
  }
});
