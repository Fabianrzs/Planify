import React from 'react';
import {Button, View} from 'react-native';
import {Formik, FormikProps} from 'formik';
import {InputField} from '../InputField';
import {LoginFormValues} from '../../views/Login';

interface LoginFormProps {
  initialValues: LoginFormValues;
  onSubmit: (values: LoginFormValues) => void;
}

export const EjemploForm = ({initialValues, onSubmit}: LoginFormProps) => {
  const validateFormEjemplo = (values: LoginFormValues) => {
    const errors: Partial<LoginFormValues> = {};

    if (!values.email) {
      errors.email = 'Campo requerido';
    }
    if (!values.password) {
      errors.password = 'Campo requerido';
    }
    return errors;
  };

  const renderFields = (formikProps: FormikProps<LoginFormValues>) => {
    return (
      <>
        <InputField
          label="Correo electrónico"
          value={formikProps.values.email}
          onChangeText={formikProps.handleChange('email')}
          onBlur={formikProps.handleBlur('email')}
          error={formikProps.errors.email}
        />
        <InputField
          label="Contraseña"
          value={formikProps.values.password}
          onChangeText={formikProps.handleChange('password')}
          onBlur={formikProps.handleBlur('password')}
          secureTextEntry
          error={formikProps.errors.password}
        />
      </>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validateFormEjemplo}>
      {formikProps => (
        <View>
          {renderFields(formikProps)}
          <Button onPress={formikProps.handleSubmit} title="Iniciar sesión" />
        </View>
      )}
    </Formik>
  );
};

export default EjemploForm;
