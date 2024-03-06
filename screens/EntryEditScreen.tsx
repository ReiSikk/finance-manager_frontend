import { useState, useEffect } from 'react'
import { getFocusedRouteNameFromRoute, RouteProp, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, SafeAreaView, StyleSheet, Button, FlatList, ScrollView, Modal, Pressable } from 'react-native'
import { RootStackParamList } from '../App';
import { fetchEntries } from '../store/EntrySlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateEntryDTO } from '../entities/CreateEntryDTO';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { Category } from '../entities/category';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

type Props = NativeStackScreenProps<RootStackParamList, "EntryEdit">



const EntryEditScreen = ({route, navigation}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const entries = useSelector((state: RootState) => state.entry.entries);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [entryData, setEntryData] = useState({
    amount: 0,
    date: new Date(),
    currency: "",
    name: "",
    comment: "",
    category: new Category("string"),
  });

  const [error, setError] = useState('');
  const [date, setDate] = useState<any>(dayjs());
  const formatDate = (date: dayjs.Dayjs) => {
    return dayjs(date).format('DD/MM/YYYY');
  };

 
  const handleSubmit = () => {
    const newEntry = new CreateEntryDTO(entryData.amount, entryData.date, entryData.currency, entryData.name, entryData.comment, entryData.category);
    // Dispatch an action or make an API call with newEntry here
  };
  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch]);



   // console.log(route.params.entryId);
   console.log(entryData, "entryData");

   const handleValidation = () => {
    if (entryData.name.trim() === '') {
      setError('Field cannot be empty');
    } if (entryData.amount < 0) {
      setError('The amount needs to be bigger than 0');
    } else {
      setError('');
      //code for submitting the post request
    }
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
    />
     <Text style={styles.label}>Amount</Text>
    <TextInput
      style={[styles.input, styles.amount]}
      value={entryData.amount.toString()}
      onChangeText={text => setEntryData({...entryData, amount: parseFloat(text)})}
      placeholder="Amount"
      keyboardType="numeric"
    />
      <TextInput
        style={styles.input}
      onChangeText={text => setEntryData({...entryData, currency: text})}
        value={entryData.currency}
        placeholder="Currency"
      />
     <Text style={styles.label}>Category</Text>
        <TextInput
      style={styles.input}
      onChangeText={text => setEntryData({...entryData, category: new Category(text)})}
      value={entryData.category.name}
      placeholder="Category"
    />
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
  {error ? <Text style={styles.error}>{error}</Text> : null}
       <Button title="Add Expense" />
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
    width: "66%",
    height: 400,
  },
  hideBtn: {
    color: "white",
    textAlign: "center",
    padding: 10,
    backgroundColor: "blue",
    width: "66%",
    borderRadius: 999,
    alignSelf: "center",
  },
  btnText: {
    color: "white",
    textAlign: "center",
  },
});



export default EntryEditScreen