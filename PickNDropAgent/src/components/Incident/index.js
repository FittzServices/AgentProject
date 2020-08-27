/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {connect} from 'react-redux';
import {
  Text,
  TouchableHighlight,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { StyleSheet} from 'react-native'
import {View, InputGroup, Input, Button} from 'native-base';
import {sendIncidentEmail} from '../../routes/Home/modules/home';
import {validate} from 'validate.js';


class Incident extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      subject: '',
      body:'',
      showSuccess:false
    };
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.report&& nextProps.report[0].statusCode===202) {
      this.setState({
        showSuccess: true,
      });
      
      setTimeout(() => {
        this.setState({
          showSuccess: false,
          email: '',
          subject: '',
          body:'',
        });
      }, 6000);
      
    }
  }

  handleSubmit() {
    
    const {email,subject,body} = this.state;
    if(email!==''){
        if(body!==''){
    const userData = {
      email: this.state.email,
      subject: this.state.subject,
      body: this.state.body,
    };

    this.props.sendIncidentEmail({userData});
    
}else{
    Alert.alert('Pick N Drop', 'Incident report is empty')
}
    }else{
        Alert.alert('Pick N Drop', 'Email field Required')
    }
  }

  render() {
    const {subject,body, email,showSuccess} = this.state;



    return (
      <View style={styles.container}>
        <View style={styles.content}>
        <View>
            <Text style={styles.title}>Contact Us</Text>
      </View>
      {showSuccess===false &&
       
        <View>
        <KeyboardAvoidingView behavior="padding" enabled>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.info}>
              <Text style={styles.texta}>Email</Text>
              <InputGroup style={styles.inputSearch}>
                <Input
                  placeholder="email"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'email-address'}
                  returnKeyType="done"
                  autoCapitalize="none"
                  onChangeText={email => this.setState({email})}
                  value={email}
                  id="email"
                />
              </InputGroup>

              <Text style={styles.texta}>Subject</Text>
              <InputGroup style={styles.inputSearch}>
                <Input
                  placeholder="subject"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'name-phone-pad'}
                  returnKeyType="done"
                  secureTextEntry={false}
                  onChangeText={subject => this.setState({subject})}
                  value={subject}
                  id="subject"
                />
              </InputGroup>
              <View>
              <Text style={styles.texta}>Incident Report</Text>
              <InputGroup style={styles.textAreaContainer}>
                <Input
                    style={styles.textArea}
                  placeholder="report"
                  placeholderTextColor="#adb4bc"
                  keyboardType={'name-phone-pad'}
                  returnKeyType="done"
                  secureTextEntry={false}
                  numberOfLines={10}
                  multiline={true}
                  onChangeText={body => this.setState({body})}
                  value={body}
                  id="body"
                />
              </InputGroup>

              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

        <View >
          <Button 
          style={styles.btn}
            onPress={() => this.handleSubmit()}>
            <Text style={styles.txt}>Send</Text>
          </Button>
        </View>
        </View>
        ||
        <View>
        <Text style={styles.textp}>Your messsage was successfully sent, we will contact you shortly</Text>
        </View>}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  report: state.home.report||"",
});

const mapActionCreators = {
    sendIncidentEmail
};

export default connect(mapStateToProps, mapActionCreators)(Incident);
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D3D3D3',
        flex:1
        
      },
      btn:{
        backgroundColor:'tomato',
        alignContent:'center',
        justifyContent:"center",
        marginTop:30
      },
      txt:{
        color:'white',
        fontSize:20,
        fontWeight:'bold'
      },
      title: {
        color: 'tomato',
        fontSize: 25,
        textAlign: 'left',
        fontStyle: "italic",
        fontWeight:'bold', 
        marginBottom:15
      },
      texta:{
        marginTop:20,
        marginBottom:20,
        fontSize:20,
        color: 'blue',
    },
    content:{
        marginRight: 25,
        marginLeft:25,
        marginTop:25,
    },
    inputSearch:{
        borderTopColor:'black',
        borderColor:'black',
        backgroundColor:'white'
    },
    textAreaContainer: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        backgroundColor:'white'
      },
      textArea: {
        height: 150,
        borderRadius: 50,
        justifyContent: "flex-start"
      },
      textp:{
        marginTop:100,
        fontSize:20,
        fontStyle:'italic',
        justifyContent:'center',
        alignContent:'center',
        color:'blue'
    }
  })
  