import React from 'react'
import {Footer, FooterTab, Button} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Text} from 'react-native'

import styles from './FooterComponentStyles'


export const  FooterComponent=()=> {
    //Bar Item
    const tabs =[
        {
            title:"PickUp Truck",
            subTitle:'',
            icon:"truck"
        },
    
]

    return (
        <Footer>
        <FooterTab style={styles.footerContainer} iosBarStyle="light-content">

        {
            tabs.map((obj, index)=>{
                return(
                    <Button key={index}>
                    <Icon size={30} name={obj.icon} color={ 'aqua'}/>
                    <Text style={{fontSize:17, color:(index===0)? 'red': 'aqua'}}>
                        {obj.title}
                    </Text>

                    <Text style={styles.subText}>
                        {obj.subTitle}
                    </Text>
                    </Button>
                )
            })
        }
        
        </FooterTab>
        </Footer>
    )
}

export default FooterComponent