import React, { Component } from 'react'

import { View, Text} from "native-base"
import styles from './AboutStyles'

export default class AboutUs extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}> About Us</Text>
                <Text style={styles.texta}>Pick 'N' Drop is a company that deals with waste management in Nigeria,
            providing services that ranges from collection and 
            disposal to recycling.
            </Text>

            <Text style={styles.textp}>Our mission is to keep the society environmentally safe.
            We work so that the waste that is generated is recycled and disposed of in the best possible way.</Text>
            <View >
            <Text style={styles.copyright}>© 2020 Pick 'N' Drop, All rights reserved</Text>
            </View>
            </View>
        )
    }
}
