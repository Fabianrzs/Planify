import React from 'react';
import {Button, View} from 'react-native';
import {Formik, FormikProps} from 'formik';

interface FormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validateForm: (values: T) => Promise<Partial<T>>;
  fields: (values: FormikProps<T>) => Element | Element[];
  button?: boolean;
  buttonText?: string;
}

export const FormBase = <T extends Object>({
  initialValues,
  onSubmit,
  validateForm,
  fields,
  button,
  buttonText,
}: FormProps<T>) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validateForm}>
      {formikProps => (
        <View>
          <>
            {fields(formikProps)}
            {button && (
              <Button
                onPress={formikProps.handleSubmit}
                title={buttonText || ''}
              />
            )}
          </>
        </View>
      )}
    </Formik>
  );
};
