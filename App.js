import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Pressable, Switch } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
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
  const nav = useNavigation()
  return (
  <SafeAreaView style={styles.layout} >
    <FlatList
      
      data={[{id: '1', title: 'React'}, {id: '2', title: 'React Native'}, {id: '3', title:'Swift'}, {id: '4', title:'Android'}, {id: '5', title:'Java'}]}
      renderItem={({item}) => {
        return(
        <View style={styles.courseCard}>
          <Pressable 
            onPress={() => nav.navigate(item.title)}
            style = {({pressed}) => [
              [styles.pressable, {backgroundColor: pressed ? 'white' : 'white'}]
            ]}
            >
          <Text style={styles.courseText}>{item.title}</Text>
          </Pressable>
        </View>)
      }}
    />
  </SafeAreaView>
  )
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
      <Text style={styles.courseText}>{props.title}</Text>
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
      options={{
        headerTitleStyle: {
          fontWeight: '800',
          fontSize: 25
        },
        headerTitleAlign: 'center'
      }}
    />
    <Tab.Screen
     name={ 'Catalog' }
     component={CatalogScreen}
     options={{
      headerTitleStyle: {
        fontWeight: '800',
        fontSize: 25
      },
      headerTitleAlign: 'center'
    }}
    />
    <Tab.Screen
     name={ 'Goals' }
     component={GoalScreen}
     options={{
      headerTitleStyle: {
        fontWeight: '800',
        fontSize: 25
      },
      headerTitleAlign: 'center'
    }}
    />
    <Tab.Screen
     name={ 'Profile' }
     component={ProfileNavigator}
     options={{
      headerTitleStyle: {
        fontWeight: '800',
        fontSize: 25
      },
      headerTitleAlign: 'center'
    }}
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

const ReactScreen = () => {
  return(
    <SafeAreaView>
      <Text style={styles.catalogHeader}>Learn React</Text>
    </SafeAreaView>
  )
}

const ReactNativeScreen = () => {
  return(
    <SafeAreaView>
      <Text style={styles.catalogHeader}>Learn React Native</Text>
    </SafeAreaView>
  )
}

const SwiftScreen = () => {
  return(
    <SafeAreaView>
      <Text style={styles.catalogHeader}>Learn Swift</Text>
    </SafeAreaView>
  )
}

const AndroidScreen = () => {
  return(
    <SafeAreaView>
      <Text style={styles.catalogHeader}>Learn Android</Text>
    </SafeAreaView>
  )
}

const JavaScreen = () => {
  return(
    <SafeAreaView>
      <Text style={styles.catalogHeader}>Learn Java</Text>
    </SafeAreaView>
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

const Stack = createStackNavigator()

export const AppNavigator = () => {
  return(
    <Stack.Navigator screenOptions = {{headerShown: false}}>

    <Stack.Screen
      name="MainNavigator"
      component={MainNavigator}
    />

    <Stack.Screen
      name="React Native"
      component={ReactNativeScreen}
    />

    <Stack.Screen
      name="React"
      component={ReactScreen}
    />

    <Stack.Screen
      name="Swift"
      component={SwiftScreen}
    />

    <Stack.Screen
      name="Android"
      component={AndroidScreen}
    />

<Stack.Screen
      name="Java"
      component={JavaScreen}
    />

    </Stack.Navigator>

  )
}

export default function App() {
  return (
    <NavigationContainer styles={styles.layout}>
      <AppNavigator styles={styles.layout} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#fff'
  },
  courseCard: {
    flex: 1,
    borderColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 20,
    width: 200,
    height: 100 
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
    paddingLeft: 30,
  },
  switch:{
    flex: 2
  },
  switchText:{
    flex: 1,
    fontSize: 16
  },
  pressable:{
    width: 200,
    borderWidth: 1,
    borderRadius: 15,
    height: 100,
    flex: 1,
    justifyContent: 'center'
  },
  catalogHeader:{
    fontWeight: '800', 
    fontSize: 25, 
    textAlign: 'center',
    marginTop: 10
  }
});
