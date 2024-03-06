import React from 'react'
import { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, Button, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { createCategory, fetchCategories } from '../store/CategorySlice';
import { AppDispatch, RootState } from '../store/store';
import { CreateCategoryDTO } from '../entities/CreateCategoryDTO';

const CategoryScreen = () => {

  const [inputValue, setInputValue] = useState('');

  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.categories);
  const newCategory = new CreateCategoryDTO(inputValue);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);





/*   const handleDeleteCategory = (categoryId) => {
    dispatch(deleteCategory(categoryId));
  }; */

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
  <TextInput
        style={styles.input}
        placeholder="Category"
        value={inputValue}
        onChangeText={text => setInputValue(text)}
      />
      <Button title="add category" onPress={() => dispatch(createCategory(newCategory)) }/>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    // Add other styles as needed
  },
});

export default CategoryScreen