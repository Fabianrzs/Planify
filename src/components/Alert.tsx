import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Dialog, Portal, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {AlertState, triggerAlert} from 'reducer/AlertReducer';

export const Alert = () => {
  // @ts-ignore
  const stateAlert = useSelector(state => state.alert);
  const {state, title, content, visible} = stateAlert;
  const dispatch = useDispatch();

  const hideDialog = () => {
    dispatch(
      triggerAlert({
        title: '',
        content: '',
        visible: false,
      } as AlertState),
    );
  };
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Icon icon={state} />
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.title} variant="bodyMedium">
            {content}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => hideDialog()}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
});
