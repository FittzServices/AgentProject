import React, { Component } from 'react'
import { StyleSheet} from 'react-native'
import { View, Text} from "native-base"

export default class Support extends Component {
    render() {
        return (
            <View style={styles.container}>
            <View>
            <Text style={styles.title}>Support</Text>
            </View>
            <View>
            <Text style={styles.texta}>Location</Text>
            <Text style={styles.textp}>No. 13 ose olorun close, bodijha, Ibadan, Oyo State, Nigeria</Text>
            </View>
            <View>
            <Text style={styles.texta}>Email</Text>
            <Text style={styles.textp}>pickndrop@gmail.com</Text>
            </View>
            <View>
            <Text style={styles.texta}>Telephone</Text> 
            <Text style={styles.textp}>080 1234 5678</Text>
            </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        marginRight: 25,
        marginLeft:25,
        marginTop:25
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
    textp:{
        marginTop:5,
        marginBottom:5,
        fontSize:20,
    }
  })
