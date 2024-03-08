import React from 'react'
import { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, Button, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { createCategory, fetchCategories } from '../store/CategorySlice';
import { AppDispatch, RootState } from '../store/store';

const CategoryScreen = () => {

  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  type CategoryProps = {name: string};
const Category = ({name}: CategoryProps) => (
  <View style={styles.category_item}>
    <Text style={styles.category_name}>
      {name}
      </Text>
  </View>
)


  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({item}) => <Category name={item.name} />}
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
    backgroundColor: '#474350',
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 75,
    marginTop: 24,
  },
  category_name: {
    fontSize: 18,
    color: 'white',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
});

export default CategoryScreen