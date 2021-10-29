import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView, Keyboard } from 'react-native';

import CoustemButton from './components/ButtonComponent';

import { todoItems } from './constants/dummyToDo';

export default function App() {
  const [getText, setText] = useState('');
  const [getList, setList] = useState([todoItems]);
  const [editingItem, setEditingItem] = useState(0);

  const addItem = () => {
    console.log(getText);
    setList([
      ...getList,
      { key: Math.rendom().toString(), data: getText }
    ]);
    setText('');
    Keyboard.dismiss();
  }

  const removeItem = (itemKey) => {
    // var list = getList.filter(item => item.key != itemKey);
    // setList(list);
    setList(list => getList.filter(item => item.key != itemKey));
  }



  const editItem = (item) => {
    setText(item.data);
    setEditingItem(item.key);
  }

  const updateItem = () => {
    setList(list => getList.map(item =>
      item.key === editingItem ?
        { key: item.key, data: getText } :
        item
    ));
    setText('');
    setEditingItem(0);
  }

  const scrollView = (
    <ScrollView style={styles.scrollview}>
      {getList.map((item, index) =>
        <TouchableOpacity
          key={item.key}
          activeOpacity={0.7}
          onPress={() => editItem(item)}
        >
          <View style={styles.scrollviewItem}>
            <Text style={styles.scrollviewText}>{index + 1}# {item.data}</Text>
            <TouchableOpacity
              onPress={() => removeItem(item, key)}
            >
              <View style={styles.crosstextcontainer}>
                <Text style={styles.crosstext}>X</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </ScrollView>
  );

  const emptyScrollView = (
    <View style={{ paddingTop: 30 }}>
      <Text style={{ fontStyle: "italic", fontSize: 20, color: 'grey' }}>No ToDo Items! Hurray!</Text>
    </View>
  );


  return (
    <View style={styles.container}>
      <Text style={styles.title}>TODO</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Item"
          onChangeText={text => setText(text)}
          value={getText}
        />

        <CoustemButton
          text={editingItem === 0 ? "ADD" : "UPDATE"}
          textSize={16}
          textColor="white"
          onPressEvent={editingItem === 0 ? addItem : updateItem}
          disabled={getText.length <= 0}
        />


      </View>
      {getList.length <= 0 ? emptyScrollView : scrollView}
      {/* <View>
        <Text style={{ fontSize: 26 }}>{getText}</Text>
      </View> */}

    </View>
  );
}

const styles = StyleSheet.create({
  crosstextcontainer: {
    backgroundColor: 'grey',
    borderRadius: 50,
    padding: 5,
    widht: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  crosstext: {
    fontSize: 16,
    color: 'red',
    fontWeight: "bold"
  },
  scrollviewText: {
    fontSize: 26,
    color: 'white',
  },
  scrollview: {
    width: '100%'
  },
  scrollviewItem: {
    flexDirection: 'row',
    justifyContent: "space-between",
    backfaceVisibility: 'orange',
    aligenSelf: "center",
    padding: 10,
    margin: 5,
    width: '90%',
    borderRadius: 10

  },
  title: {
    fontSize: 64,
    color: 'lightgrey',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 40
  },
  inputContainer: {
    flexDirection: "row",
    width: '70%',
    justifyContent: 'space-between',
    alignItems: "center"
  },
  textInput: {
    borderColor: 'red',
    // borderWidth: 2,
    borderBottomWidth: 2,
    width: '70%',
    // borderRadius: 50,
    fontStyle: 16,
    padding: 10
  }

});
