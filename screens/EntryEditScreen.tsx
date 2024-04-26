import { useState, useEffect } from 'react'
import { getFocusedRouteNameFromRoute, RouteProp, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, SafeAreaView, StyleSheet, Button, FlatList, ScrollView, Modal, Pressable } from 'react-native'
import { RootStackParamList } from '../App';
import { createEntry, fetchEntries } from '../store/EntrySlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateEntryDTO } from '../entities/CreateEntryDTO';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { Category } from '../entities/category';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { fetchCategories } from '../store/CategorySlice';
import Picture from '../components/Picture'
import { Image } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, "EntryEdit">



const EntryEditScreen = ({route, navigation}: Props) => {
  const [camera, setCamera] = useState(false);
  const [photoToDisplay, setPhotoToDisplay] = useState('')
  const dispatch: AppDispatch = useDispatch();
  const entries = useSelector((state: RootState) => state.entry.entries);
  const [modalVisible, setModalVisible] = useState(false);
  const [entryAdded, setEntryAdded] = useState(false);
  
  const [entryData, setEntryData] = useState({
    amount: 0,
    date: new Date(),
    currency: "",
    name: "",
    comment: "",
    photo: "",
    category: new Category(""),
  });
  
  const [errors, setErrors] = useState({ amount: '', name: '', currency: '', category: ''});
  const isButtonDisabled = !(entryData.amount > 0 && entryData.currency && entryData.name && entryData.category && entryData.comment);
  const newEntry = new CreateEntryDTO(entryData.amount, entryData.date, entryData.currency, entryData.name, entryData.comment, entryData.photo, entryData.category);
  const [date, setDate] = useState<any>(dayjs());
  const formatDate = (date: dayjs.Dayjs) => {
    return dayjs(date).format('DD/MM/YYYY');
  };
  
  
  const handleSubmit = () => {
    dispatch(createEntry(newEntry))
    .then(() => {
      // Entry added successfully
      setEntryAdded(true);
    })
    .catch(error => {
      // Handle error if entry addition fails
      console.error('Error adding expense:', error);
    });
    
  };
  
  const handleValidation = (fieldName: string) => {
    const { amount, name, currency, category } = entryData;
    const newErrors = { amount: '', name: '', currency: '', category: ''};
  
    if (fieldName === 'amount') {
      if (amount <= 0) {
        newErrors.amount = 'Amount needs to be bigger than 0';
      }
    } else if (fieldName === 'name') {
      if (name.trim() === '') {
        newErrors.name = 'Name cannot be empty';
      }
    } else if (fieldName === 'currency') {
      if (currency.trim() === '') {
        newErrors.currency = 'Currency cannot be empty';
      }
    } else if (fieldName === 'category') {
      if (category.name.trim() === '') {
        newErrors.category = 'Category cannot be empty';
      }
    }
  
    setErrors(newErrors);
  };

  

  return (
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.heading}>New expense</Text>
       <Text style={styles.label}>Name</Text>
    <TextInput
      style={styles.input}
      placeholder="Name"
      onChangeText={text => setEntryData({...entryData, name: text})}
      value={entryData.name}
      onBlur={() => handleValidation('name')}
    />
{errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}
     <Text style={styles.label}>Amount</Text>
    <TextInput
      style={[styles.input, styles.amount]}
      value={entryData.amount.toString()}
      onChangeText={text => setEntryData({...entryData, amount: parseFloat(text) || 0})}
      placeholder="Amount"
      keyboardType="numeric"
      onBlur={() => handleValidation('amount')}
    />
    {errors.amount ? <Text style={styles.error}>{errors.amount}</Text> : null}
    <Text style={styles.label}>Currency</Text>
      <TextInput
        style={styles.input}
      onChangeText={text => setEntryData({...entryData, currency: text})}
        value={entryData.currency}
        placeholder="Currency"
        onBlur={() => handleValidation('currency')}
      />
      {errors.currency ? <Text style={styles.error}>{errors.currency}</Text> : null}
     <Text style={styles.label}>Category</Text>
        <TextInput
      style={styles.input}
      onChangeText={text => setEntryData({...entryData, category: new Category(text)})}
      value={entryData.category.name}
      placeholder="Category"
      onBlur={() => handleValidation('category')}
    />
    <Text style={styles.label}>Date</Text>
     <Pressable
     style={styles.input}
        onPress={() => setModalVisible(true)}>
              <Text>{date ? formatDate(date) : 'Select date'}</Text>
      </Pressable>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <View style={styles.centered}>
            <View style={styles.modal}>
     <DateTimePicker
        mode="single"
        date={date}
        onChange={(params) => setDate(params.date)}
      />
            <Pressable
            style={styles.hideBtn}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.btnText}>Select</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
     <Text style={styles.label}>Comment</Text>
           <TextInput
      style={styles.input}
      onChangeText={text => setEntryData({...entryData, comment: text})}
      value={entryData.comment}
      placeholder="Comment"
    />

 {camera ? 
 <Picture 
 setCamera={setCamera}
  setPhotoToDisplay={setPhotoToDisplay}
  photoToDto={(photo: string) => setEntryData({...entryData, photo})}
  ></Picture> : <>
 
          


 <Image source={{uri: entries[0]?.photo}} style={{width: 400, height: 400}} />
     <Button title="Open camera" onPress={() => setCamera(true)}/>
       </> }

       

<View style={styles.buttonContainer}>
      { /*<Button color='#FFFFFF' title="Add Expense" onPress={() => dispatch(createEntry(newEntry))} /> */}
           { <Button color='#FFFFFF' title={entryAdded ? "Expense Added ✓" : "Add Expense"} onPress={handleSubmit} disabled={isButtonDisabled || entryAdded} /> }
           </View>
    </View>

  </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
  input: {
    height: 40,
    marginBottom: 18,
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  amount: {
    width: 80,
  },
  label: {
    fontSize: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  error: {
    color: '#ff0000',
    marginBottom: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 20,
    zIndex: 999,
    width: "75%",
    height: "50%",
  },
  hideBtn: {
    color: "white",
    textAlign: "center",
    padding: 18,
    backgroundColor: "blue",
    width: "90%",
    borderRadius: 999,
    alignSelf: "center",
    marginLeft: "auto",
    marginBottom: 24,
    position: "absolute",
    bottom: 0,
  },
  btnText: {
    color: "white",
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: 'blue',
    color: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
  },
});



export default EntryEditScreen