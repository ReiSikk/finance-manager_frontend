import React from 'react'
import { FlatList, Text, View, StyleSheet } from 'react-native'

const CategoryScreen = () => {

  const DATA = [
    {
      id: 'Takeout',
      title: 'First Item',
    },
    {
      id: 'Groceries',
      title: 'Second Item',
    },
    {
      id: 'Transportation',
      title: 'Third Item',
    },

  
  ];


  type CategoryProps = {title: string};
const Category = ({title}: CategoryProps) => (
  <View style={styles.category_item}>
    <Text>
      {title}
      </Text>
  </View>
)


  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Category title={item.title} />}
        keyExtractor={item => item.id}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 24,
    height: '100%',
    width: '100%',
    gap: 24,
  },
  category_item: {
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 75,
    marginTop: 24,
  },
});

export default CategoryScreen