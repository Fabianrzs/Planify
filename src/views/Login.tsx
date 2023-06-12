import {TouchableOpacity, View} from 'react-native';
import {FormBase} from 'components/FormBase';
import {FormikProps} from 'formik';
import {InputField} from 'components/InputField';
import React from 'react';
import useAuth from 'hook/useAuth';
import {Text} from 'react-native-paper';
import * as yup from 'yup';
import useYupSchema from 'hook/useYupSchema';

export interface LoginFormValues {
  email: string;
  password: string;
}

export default function () {
  const {Out, Google, EmailAndPassword, Anonimous} = useAuth();
  const {passwordSchema, emailSchema} = useYupSchema();

  //const {saveProyect, updateProyect, deleteProyect, proyects} = useUserStore();

  const validateForm = async (values: LoginFormValues) => {
    const validationErrors: Partial<LoginFormValues> = {};
    const schema = yup.object().shape({
      email: emailSchema,
      password: passwordSchema,
    });
    try {
      await schema.validate(values, {abortEarly: false});
      return validationErrors;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach(err => {
          validationErrors[err.path as keyof LoginFormValues] = err.message;
        });
      }
      return validationErrors;
    }
  };

  const fields = (formikProps: FormikProps<LoginFormValues>) => {
    const {errors, values, handleBlur, handleChange} = formikProps;
    return (
      <>
        <InputField
          label="Correo electrónico"
          value={values.email}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          error={errors.email}
          mode={'outlined'}
        />
        <InputField
          label="Contraseña"
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          secureTextEntry
          error={errors.password}
        />
      </>
    );
  };

  const handleLogin = (values: LoginFormValues) => {
    EmailAndPassword(values).then();
  };

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  return (
    <View>
      <FormBase
        initialValues={initialValues}
        onSubmit={handleLogin}
        validateForm={validateForm}
        fields={fields}
        button
        buttonText={'LOGIN EMAIL AND PASSWORD'}
      />

      <TouchableOpacity onPress={Google}>
        <Text>LOGIN GOOGLE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Anonimous}>
        <Text>Anonimous</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Out}>
        <Text>SALIR</Text>
      </TouchableOpacity>
      {/*
      <TouchableOpacity onPress={saveProyect}>
        <Text>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={updateProyect}>
        <Text>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={deleteProyect}>
        <Text>Delete</Text>
      </TouchableOpacity>

      {proyects.map(({name}, index) => {
        return <Text key={index}>{name}</Text>;
      })}*/}
    </View>
  );
}
