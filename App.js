import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, Modal, FlatList, Pressable, Switch } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem  } from '@react-navigation/drawer'
import Ionicons from 'react-native-vector-icons/Ionicons';

const FeedScreen = () => {
  return (
  <SafeAreaView style={styles.layout}>
     <Text style={styles.catalogHeader}>Feed</Text>
  </SafeAreaView>)
}

const CatalogScreen = () => {
  const nav = useNavigation()
  return (
  <SafeAreaView style={styles.layout} >
    <Text style={styles.catalogHeader}>Catalog</Text>
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

const QuizButton = (props) => {
  const [buttonColor, setButtonColor] = useState('orange');
  useEffect(() => {
    setButtonColor('orange');
  }, [props.choice]) 
  return(
    <Pressable 
    style={({pressed}) => [[styles.primaryButton, {width: 270, height: 60, padding: 5, backgroundColor: buttonColor}]]}
    onPress={() => {
      if(props.index === props.data[props.id].answer){
        setButtonColor('green');
      } else {
        setButtonColor('red');
      }
    }}
  >
    <Text style={styles.buttonText}>{props.choice}</Text>
  </Pressable>
  )
}

const QuizScreen =({route, navigation}) => {
  const {data} = route.params;
  const [currentQuestion, setcurrentQuestion] = useState(0);
  return(
  <View style={{flex:1}}>
    <ScrollView style={{flex: 3}}>
    <Text style={styles.quizHeader}>{data[currentQuestion].question}</Text>
    {data[currentQuestion].choices.map((choice, index) => (
     <QuizButton data={data} index={index} id={data[currentQuestion].id} choice={choice}/>
    ))}
      </ScrollView>
    <Text style={styles.quizCounter}>{`${currentQuestion+1}/${data.length}`}</Text>
    <View style={styles.quizButtonView}>
      <Pressable 
        style={styles.quizButton}
        onPress={() => {
          if(currentQuestion !== 0){
            setcurrentQuestion(currentQuestion-1);
          }
          }}>
        <Text style={styles.quizButtonText}>Previous</Text>
      </Pressable>
      <Pressable 
        style={styles.quizButton}
        onPress={() => {
          if(currentQuestion < (data.length-1)){
            setcurrentQuestion(currentQuestion+1);
          }
        }}
      >
        <Text style={styles.quizButtonText}>Next</Text>
      </Pressable>
    </View>
  </View>
  )
}

const GoalScreen = () => {
  return (
  <SafeAreaView style={styles.layout}>
    <Text style={styles.catalogHeader}>Goals</Text>
    <Pressable
        style={({pressed}) => [[styles.primaryButton, {marginTop: 100}]]}
      >
        <Text style={[styles.buttonText], {color: 'blue', fontSize: 16}}>Set learning goals</Text>
      </Pressable>
  </SafeAreaView>)
}

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <Tab.Navigator
    
    screenOptions={({ route }) => ({
      headerShown: false,
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
    <View style={[styles.accountScreen, {alignItems: 'center'}]}>
      <Text style={styles.accountScreenHeader}>Username</Text>
      <Image style={styles.profileImage}
        source={require('./assets/profile.png')}
      >
      </Image>
      <Text style={styles.profileText}>dev@codebytes.com</Text>
      <Text style={styles.profileText}>Software Engineer 🚀</Text>
      <Pressable
        style={({pressed}) => [[styles.primaryButton, {marginTop: 100}]]}
      >
        <Text style={[styles.buttonText], {color: 'blue', fontSize: 16}}>Update profile</Text>
      </Pressable>
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
    <View style={styles.accountScreen}>
    <PreferencesSwitch label="Enable notifications" />
    <PreferencesSwitch label="Enable notification sounds" />
    </View>
  )
}

const HistoryScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return(
  <View style={styles.accountScreen}>
   
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        
      >
        <View style={styles.modalView}>
          <Text style={styles.modalHeader}>Reset progress? Your course progress will be permanently deleted.</Text>
          <View style={styles.modalButtonView}>
          <Pressable
            style = {({pressed}) => [[styles.primaryButton, {backgroundColor: pressed ? '#ba1c00' : 'red'}]
          ]}
            onPress = {() => setModalVisible(false)}
          >
          <Text style={styles.buttonText}>Reset progress</Text>
          </Pressable>
          <Pressable
            style = {({pressed}) => [[styles.primaryButton, {backgroundColor: pressed ? '#ba1c00' : 'red'}]
          ]}
            onPress = {() => setModalVisible(false)}
          >
          <Text style={styles.buttonText}>Nevermind</Text>
          </Pressable>
          </View>
        </View>
      </Modal>

    <Pressable   
      style = {({pressed}) => [[styles.primaryButton, {backgroundColor: pressed ? '#ba1c00' : 'red', display: modalVisible ? 'none': 'flex'}]
            ]}
      onPress = {() => setModalVisible(true)}
      >
      <Text style={styles.buttonText}>Reset progress</Text>
    </Pressable>
  </View>
  )
}

const SettingsScreen = () => {
  return(
    <View style={styles.accountScreen}>

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
  const nav = useNavigation()
  return(
    <SafeAreaView>
      <Text style={styles.catalogHeader}>Learn React Native</Text>
      <Pressable 
        style={({pressed}) => [styles.primaryButton, {marginTop: 100, backgroundColor: pressed ? '#ba1c00': 'red'}]}
        onPress={()=> nav.navigate('Quiz', {data: data.reactNative})}
      >
      <Text style={styles.buttonText}>Take Quiz</Text>
      </Pressable>
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

export const ProfileNavigator = (props) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props}/>}
      screenOptions={({navigation}) => ({
        headerLeft: () => <Text/>,
        headerRight: () => 
          <Ionicons name={'ios-menu'} 
          size={40} 
          color="black" 
          onPress={()=> {navigation.toggleDrawer()}}
          />,
        headerTitleStyle: {
          fontWeight: '800',
          fontSize: 25
        },
        drawerPosition:"right",
        drawerType:"front",
        swipeEdgeWidth: 100,
        headerShown: true,
        drawerStyle: {
          backgroundColor: 'red',
          width: "100%",
          height: "100%"
        },
        drawerActiveTintColor: 'orange',
       
      })
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

    <Stack.Screen
      name="Profile Navigator"
      component={ProfileNavigator}
    />

    <Stack.Screen
      name="Quiz"
      component={QuizScreen}
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
  },
  accountScreen:{
    flex: 1,
    backgroundColor: "white"
  },
  primaryButton:{
    width: 130,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 20,
    marginLeft: 10,
    borderRadius: 50
  },
  buttonText:{
    textAlign: "center",
    fontSize: 16,
    color: 'black'
  },
  modalView:{
    margin: 20,
    marginTop: "50%",
    height: 200,
    backgroundColor: '#fff',
    justifyContent: 'center',
    elevation: 5,
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowRadius: 4,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  modalHeader:{
    fontSize: 16,
    marginBottom: 30,
    paddingLeft: 25,
    paddingRight: 25,
    textAlign: 'center'
    
  },
  modalButtonView:{
    justifyContent: 'center',
    flexDirection: 'row'
  },
  accountScreenHeader: {
    textAlign: 'center', 
    fontSize: 24, 
    marginTop: 30,
    fontWeight: '700'  
  },
  profileImage:{
    width: 150,
    height: 150,
    marginTop: 20
  },
  profileText: {
    marginTop: 15,
    fontSize: 16
  },
  quizHeader: {
    fontSize: 22,
    margin: 20,
    marginTop: 50,
    fontWeight: '700'
  },
  quizButtonView: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center'
  },
  quizButton: {
    width: "50%",
    height: 70,
    borderColor: '#000',
    borderWidth: 1, 
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  quizButtonText: {
    fontWeight: '500'
  },
  quizCounter:{
    textAlign: 'center',
    fontWeight: '500'
  }
});

const data = {
  reactNative: [
    {
      id: 0,
      question: 'Which feature does a FlatList not support?',
      choices: ['Scroll loading', 'Pull to refresh', 'Sections', 'extraData and keyExtractor props'],
      answer: 2
    },
    {
      id: 1,
      question: 'What\'s the difference between a NativeStackNavigator and a StackNavigator?',
      choices: ['A StackNavigator is more performant but less customizable', 
                'A NativeStackNavigator is more performant but less customizable'
                ],
      answer: 1
    },
    {
      id: 2,
      question: 'Which features does the Platform API support?',
      choices: ['isTV', 'OS', 'isWatch', 'A and B', 'all of the above'],
      answer: 3
    },
    {
      id: 3,
      question: 'The navigation prop contains all of the following methods except',
      choices: ['pop', 'goBack', 'popToTop', 'push'],
      answer: 0
    },
    {
      id: 4,
      question: 'All of the following are valid values for the style prop except',
      choices: ['a StyleSheet style', 'CSS', 'a JavaScript object containing styles', 'an array of stylesheets and style objects'],
      answer: 1
    },
    {
      id: 5,
      question: 'SafeAreaView is supported on which platforms?',
      choices: ['ioS', 'Android', 'both'],
      answer: 0
    }
  ]
}