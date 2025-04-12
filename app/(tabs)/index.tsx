import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from "react-native-bouncy-checkbox";


const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4, 'Should be minimum of 4 characters')
  .max(16, 'Should be a maximum of 36 characters')
  .required('Length is required')
})

const index = () => {

  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)

  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const generatedPasswordString = (passwordLength:number)=> {
    let characterList = ''

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const digitChars = '0123456789'
    const specialChars = '!@#$%^&*()_+=-][,./?><'

    if (upperCase) {
      characterList += upperCaseChars
    }
    if (lowerCase) {
      characterList += lowerCaseChars
    }
    if (numbers) {
      characterList += digitChars
    }
    if (symbols) {
      characterList += specialChars
    }

    const passwordResult = createPassword(characterList, passwordLength)
    setPassword(passwordResult)
    setIsPassGenerated(true)
  }

  const createPassword = (characters: string, passwordLength: number)=>{
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }
    return result
  }

  const resetPasswordState =()=>{
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(false)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scrollContent}>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={(values)=>(
              generatedPasswordString(+values.passwordLength)
            )}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder='Ex. 8'
                    keyboardType='numeric'
                    />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include lowerCase</Text>
                  <BouncyCheckbox
                    isChecked={lowerCase}
                    onPress={()=>setLowerCase(!lowerCase)}
                    fillColor='#29ab87'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include uppercase</Text>
                  <BouncyCheckbox
                    isChecked={upperCase}
                    onPress={()=>setUpperCase(!upperCase)}
                    fillColor='#FED85D'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include numbers</Text>
                  <BouncyCheckbox
                    isChecked={numbers}
                    onPress={()=>setNumbers(!numbers)}
                    fillColor='#C9A0DC'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include symbols</Text>
                  <BouncyCheckbox
                    isChecked={symbols}
                    onPress={()=>setSymbols(!symbols)}
                    fillColor='#FC80A5'
                  />
                </View>
               
                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={()=>{
                      handleSubmit()
                    }}
                  >
                    <Text style={styles.primaryBtnText}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={()=> {
                      handleReset()
                      resetPasswordState()
                    }}
                  >
                    <Text style={styles.secondaryBtnText}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPassGenerated ? 
        (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.generatedPassword} selectable={true}>{password}</Text>
            <Text style={styles.description}>Long press to copy</Text>
          </View>
        )
        :null}
      </SafeAreaView>
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({
  scrollContent:{
    flex:1,
    backgroundColor:'#e3e3e3'
  },
  appContainer:{
    
  },
  formContainer:{
    padding:10,
  },
  title:{
    fontSize: 32,
    fontWeight: 'bold',
    paddingVertical: 30,
    // color: '#e3e3e3'
  },
  heading:{
    fontSize:24,
  },
  inputWrapper:{
    paddingTop:25,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  formActions:{
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap:20,
    paddingVertical:30,
  },
  inputColumn:{
    width:'70%'
  },
  inputStyle:{
    borderStyle:'solid',
    borderColor:'#000',
    borderWidth:1,
    height:50,
    padding:10,
    fontSize:16,
    width:'30%'
  },
  primaryBtn:{},
  errorText:{color:'red'},
  primaryBtnText:{},
  secondaryBtn:{},
  secondaryBtnText:{},
  card:{
    rowGap:10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center',
    width: '80%',
    height: 100,
    borderRadius: 4,
    margin: 8
},
cardElevated: {
    backgroundColor:'#cad5e2',
    elevation: 4,
    shadowOffset:{
        width: 1,
        height: 1
    },
    shadowColor: '#333',
    
},
subTitle:{},
description:{},
generatedPassword:{
  fontSize:24,
  fontWeight:'600',

},
  
})