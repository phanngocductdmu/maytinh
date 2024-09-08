import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { evaluate } from 'mathjs'; // Import mathjs library

export default function App() {
  const [text, setText] = useState('');

  const handlePress = (value) => {
    if (value === 'AC') {
      setText('');
    } else {
      setText((prevText) => (prevText === 'Error' ? value : prevText + value));
    }
  };

  const calculateResult = () => {
    try {
      if (text) {
        let expression = text;

        // Xử lý các hàm lượng giác và phần trăm
        expression = expression.replace(
          /Sin\((.*?)\)/g,
          (_, num) => `sin(${num} * pi / 180)`,
        );
        expression = expression.replace(
          /Cos\((.*?)\)/g,
          (_, num) => `cos(${num} * pi / 180)`,
        );
        expression = expression.replace(
          /Tan\((.*?)\)/g,
          (_, num) => `tan(${num} * pi / 180)`,
        );
        expression = expression.replace(
          /Cot\((.*?)\)/g,
          (_, num) => `1/tan(${num} * pi / 180)`,
        );
        expression = expression.replace(/(\d+(\.\d+)?)%/g, '($1 / 100)');

        // Tính toán biểu thức
        const result = evaluate(expression);
        setText(String(result));
      } else {
        setText('Error');
      }
    } catch (error) {
      setText('Error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.output}>
        <TextInput
          style={styles.textinput}
          textAlign="right"
          multiline={true}
          value={text}
          onChangeText={setText}
        />
      </View>
      <View style={styles.input}>
        <View style={styles.cot}>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('Sin(')}
          >
            <Text style={styles.customButton}>Sin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('(')}
          >
            <Text style={styles.customButton}>(</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('7')}
          >
            <Text style={styles.customButton}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('4')}
          >
            <Text style={styles.customButton}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('1')}
          >
            <Text style={styles.customButton}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('0')}
          >
            <Text style={styles.customButton}>0</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cot}>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('Cos(')}
          >
            <Text style={styles.customButton}>Cos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress(')')}
          >
            <Text style={styles.customButton}>)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('8')}
          >
            <Text style={styles.customButton}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('5')}
          >
            <Text style={styles.customButton}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('2')}
          >
            <Text style={styles.customButton}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('.')}
          >
            <Text style={styles.customButton}>.</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cot}>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('Tan(')}
          >
            <Text style={styles.customButton}>Tan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('%')}
          >
            <Text style={styles.customButton}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('9')}
          >
            <Text style={styles.customButton}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('6')}
          >
            <Text style={styles.customButton}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('3')}
          >
            <Text style={styles.customButton}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.hang} onPress={calculateResult}>
            <Text style={styles.customButton}>=</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cot}>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('Cot(')}
          >
            <Text style={styles.customButton}>Cot</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('AC')}
          >
            <Text style={styles.customButton}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('/')}
          >
            <Text style={styles.customButton}>/</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('*')}
          >
            <Text style={styles.customButton}>*</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('-')}
          >
            <Text style={styles.customButton}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.hang}
            onPress={() => handlePress('+')}
          >
            <Text style={styles.customButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
  },
  output: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput: {
    width: '90%',
    height: 110,
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlignVertical: 'bottom',
    fontSize: 24,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#dcdce7',
    color: '#fff',
  },
  input: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cot: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  hang: {
    flex: 1,
    backgroundColor: '#5f6267',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 15,
  },
  customButton: {
    fontSize: 24,
    color: '#fff',
  },
});
