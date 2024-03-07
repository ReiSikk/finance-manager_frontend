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
    category: new Category(""),
  });

  const [errors, setErrors] = useState({ amount: '', name: '', currency: '' });


  const [date, setDate] = useState<any>(dayjs());
  const formatDate = (date: dayjs.Dayjs) => {
    return dayjs(date).format('DD/MM/YYYY');
  };

 
  const handleSubmit = () => {
    const newEntry = new CreateEntryDTO(entryData.amount, entryData.date, entryData.currency, entryData.name, entryData.comment, entryData.category);
    // Dispatch an action or make an API call with newEntry here
  };
 // useEffect(() => {
  //  dispatch(fetchEntries());
  //}, [dispatch]);

  const handleValidation = () => {
    const { amount, name, currency } = entryData;
    const newErrors = { amount: '', name: '', currency: '' };

    if (amount <= 0) {
      newErrors.amount = 'Amount needs to be bigger then 0';
    }

    if (name.trim() === '') {
      newErrors.name = 'Name cannot be empty';
    }

    if (currency.trim() === '') {
      newErrors.currency = 'Currency cannot be empty'
    }

    setErrors(newErrors);
  };

   // console.log(route.params.entryId);
   console.log(entryData, "entryData");

  


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
{errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}
     <Text style={styles.label}>Amount</Text>
    <TextInput
      style={[styles.input, styles.amount]}
      value={entryData.amount.toString()}
      onChangeText={text => setEntryData({...entryData, amount: parseFloat(text)})}
      placeholder="Amount"
      keyboardType="numeric"
    />
    {errors.amount ? <Text style={styles.error}>{errors.amount}</Text> : null}
    <Text style={styles.label}>Currency</Text>
      <TextInput
        style={styles.input}
      onChangeText={text => setEntryData({...entryData, currency: text})}
        value={entryData.currency}
        placeholder="Currency"
      />
      {errors.currency ? <Text style={styles.error}>{errors.currency}</Text> : null}
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
 
       <Button title="Add Expense" onPress={handleValidation} />
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