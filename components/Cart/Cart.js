import React from "react";
import { StyleSheet, Text } from "react-native";
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";

export default function Cart() {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: "white", padding: 20 };

    return (
        <Provider>
            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={hideModal}
                    contentContainerStyle={containerStyle}
                >
                    <Text>
                        Example Modal. Click outside this area to dismiss.
                    </Text>
                </Modal>
            </Portal>
            <Button style={{ marginTop: 30 }} onPress={showModal}>
                Show
            </Button>
        </Provider>
    );
}

const styles = StyleSheet.create({});
