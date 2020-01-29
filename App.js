/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert, TouchableHighlight, Linking} from 'react-native';
import analytics from '@segment/analytics-react-native'
import CleverTap from '@segment/analytics-react-native-clevertap'

const CleverTap_react = require('clevertap-react-native');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  // componentWillMount() {
  //     console.log('Component WILL MOUNT123!')

  //  }
  componentDidMount() {


      analytics.setup('B4N6NInFlYmpzMWNjnYC7rJJ0iQ0Q2VH', {
  // Add any of your Device-mode destinations.
        using: [CleverTap],
        debug: true,
        recordScreenViews: false,
        trackAppLifecycleEvents: false,
        trackAttributionData: true,

        android: {
            flushInterval: 60,
            collectDeviceId: true
        },
        ios: {
            trackAdvertising: true,
            trackDeepLinks: true
        }
    })
    .then(() =>
        console.log('Analytics is ready'),
        //CleverTap_react.setDebugLevel(3)
    )
    .catch(err =>
        console.error()
    )


        // optional: add listeners for CleverTap Events
        //CleverTap.addListener(CleverTap.CleverTapProfileDidInitialize, (event) => { this._handleCleverTapEvent(CleverTap.CleverTapProfileDidInitialize, event); });
        //CleverTap.addListener(CleverTap.CleverTapProfileSync, (event) => { this._handleCleverTapEvent(CleverTap.CleverTapProfileSync, event); });
        //CleverTap.addListener(CleverTap.CleverTapInAppNotificationDismissed, (event) => { this._handleCleverTapEvent(CleverTap.CleverTapInAppNotificationDismissed, event); });
        //CleverTap.addListener(CleverTap.CleverTapInboxDidInitialize, (event) => { this._handleCleverTapInbox(CleverTap.CleverTapInboxDidInitialize,event); });
        //CleverTap.addListener(CleverTap.CleverTapInboxMessagesDidUpdate, (event) => { this._handleCleverTapInbox(CleverTap.CleverTapInboxMessagesDidUpdate,event); });
        // for iOS only: register for push notifications
        //CleverTap.registerForPush();

        // for iOS only; record a Screen View
        //CleverTap.recordScreenView('HomeView');
        CleverTap_react.setDebugLevel(3);

        //initialize the App Inbox
        CleverTap_react.initializeInbox();


        // Listener to handle incoming deep links
        //Linking.addEventListener('url', this._handleOpenUrl);

        // this handles the case where a deep link launches the application
        // Linking.getInitialURL().then((url) => {
        //     if (url) {
        //         console.log('launch url', url);
        //         this._handleOpenUrl({url});
        //     }
        // }).catch(err => console.error('launch url error', err));

        // check to see if CleverTap has a launch deep link
        // handles the case where the app is launched from a push notification containing a deep link
        // CleverTap.getInitialUrl((err, url) => {
        //     if (url) {
        //         console.log('CleverTap launch url', url);
        //         this._handleOpenUrl({url}, 'CleverTap');
        //     } else if (err) {
        //         console.log('CleverTap launch url', err);
        //     }
        // });
    }

    componentWillUnmount() {
        // clean up listeners
        // Linking.removeEventListener('url', this._handleOpenUrl);
        // CleverTap.removeListeners();
    }

    // _handleOpenUrl(event, from) {
    //     console.log('handleOpenUrl', event.url, from);
    // }

    _handleCleverTapEvent(eventName, event) {
        console.log('handleCleverTapEvent', eventName, event);
    }

    _handleCleverTapInbox(eventName,event){
        console.log('handleCleverTapInbox',eventName,event);
    }

    _recordEvent(event) {

      analytics.track('IPurchased');

        //CleverTap.recordEvent('testEvent');
        //CleverTap.recordEvent('testEventWithProps', {'foo': 'bar'});
        //CleverTap.setPushToken("FCM","abcdfcm");
    }

     _recordChargedEvent(event) {
       // CleverTap.recordChargedEvent({'totalValue': 20, 'category': 'books'}, [{'title': 'book1'}, {'title': 'book2'}, {'title': 'book3'}]);
    }

    _sendUserProfile(event)
    {
      CleverTap_react.onUserLogin({'Name': 'XYZ', 'Identity': 'xyz_identity', 'Email': 'xyz_1@test.com', 'custom1': 123}
            );

      // analytics.identify(
      //         {"xyz_identity",{'Name': 'XYZ','Email': 'xyz_1@test.com', 'custom1': 123}}
      //       );

      analytics.identify("xyz_identity", {
          name: "XYZ",
          email: "xyz_1@test.com",
          plan: "premium",
          logins: 5
          });

      //xyz_identity in analytics is your own unique identity.
    }

    _updateUserProfile(event) {
        CleverTap_react.profileSet({'Name': 'testUserA1', 'Identity': 'abcdefg', 'Email': 'test@test.com', 'custom1': 123});
        CleverTap_react.profileSetMultiValuesForKey(['a', 'b', 'c'], 'letters');
        CleverTap_react.profileAddMultiValueForKey('d', 'letters');
        CleverTap_react.profileAddMultiValuesForKey(['e', 'f'], 'letters');
        CleverTap_react.profileRemoveMultiValueForKey('b', 'letters');
        CleverTap_react.profileRemoveMultiValuesForKey(['a', 'c'], 'letters');
        CleverTap_react.setLocation(34.15, -118.20);
    }

    _getUserProfileProperty(event) {
        CleverTap_react.enablePersonalization();

        CleverTap_react.profileGetProperty('Name', (err, res) => {
            console.log('CleverTap Profile Name: ', res, err);
        });

        CleverTap_react.profileGetCleverTapID((err, res) => {
            console.log('CleverTapID', res, err);
        });

        CleverTap_react.profileGetCleverTapAttributionIdentifier((err, res) => {
            console.log('CleverTapAttributionIdentifier', res, err);
        });
    }
    
    _openInbox(event){
        CleverTap_react.showInbox({'tabs':['Offers','Promotions'],'navBarTitle':'My App Inbox','navBarTitleColor':'#FF0000','navBarColor':'#FFFFFF','inboxBackgroundColor':'#AED6F1','backButtonColor':'#00FF00'
                                ,'unselectedTabColor':'#0000FF','selectedTabColor':'#FF0000','selectedTabIndicatorColor':'#000000'});
    }

    _showCounts(event){
        CleverTap_react.getInboxMessageCount((err, res) => {
            console.log('Total Messages: ', res, err);
        });
        //     console.log('Unread Messages: ', res, err);
        // });
    }
  
  render() {
    return (
      <View style={styles.container}>
            <TouchableHighlight style={styles.button}
              onPress={this._recordEvent}>
              <Text>Record Event</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button}
              onPress={this._recordChargedEvent}>
              <Text>Record Charged Event</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button}
              onPress={this._sendUserProfile}>
              <Text>Send User Profile</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button}
              onPress={this._updateUserProfile}>
              <Text>Update User Profile</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button}
              onPress={this._getUserProfileProperty}>
              <Text>Get User Profile Property</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button}
              onPress={this._openInbox}>
              <Text>Open Inbox</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button}
              onPress={this._showCounts}>
              <Text>Show Counts</Text>
            </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
        marginBottom: 20
  }
});
 