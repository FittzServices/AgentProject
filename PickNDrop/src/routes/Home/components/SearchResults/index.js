import React from 'react'
import { Text, ScrollView, FlatList } from 'react-native'
import {View, List, ListItem, Left, Body,  } from "native-base"

import Icon from "react-native-vector-icons/MaterialIcons"

import styles from './SearchResultStyles'


export const SearchResults= ({predictions, getSelectedAddress})=>{
		function handleGetSelectedAddress(placeID){
			getSelectedAddress(placeID)
		}
        return( 
            < ScrollView style={styles.searchResultsWrapper} >
				<FlatList
					data={predictions}
					renderItem={({ item }) => {
						return <View style={styles.row}>
                        <ListItem onPress={()=>handleGetSelectedAddress(item.placeID)} button avatar>
							<Left style={styles.leftContainer}>
								<Icon style={styles.leftIcon} name="location-on" />
							</Left>
                            <Body>
                                <Text style={styles.primaryText}>{item.primaryText}</Text>
                            </Body>
						</ListItem>	
						</View>
					}}
			/>
		</ScrollView >
           
       
        )
    }


export default SearchResults