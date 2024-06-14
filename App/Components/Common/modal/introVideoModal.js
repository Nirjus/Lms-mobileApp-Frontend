import { Modal, StyleSheet, Text, View } from "react-native";
import { Video, ResizeMode } from "expo-av";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../../utils/Colors";

const IntroVideoModal = ({ open, onClose, url }) => {
  return (
    <Modal transparent animationType="fade" visible={open}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#0505057a",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: Colors.WHITE,
            padding: 10,
            width: "98%",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Entypo
            name="circle-with-cross"
            size={24}
            color="black"
            onPress={() => onClose()}
          />
          <Text>Intro Video</Text>
        </View>
        <Video
          // ref={video}
          style={styles.video}
          source={{
            uri: url,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View>
    </Modal>
  );
};

export default IntroVideoModal;

const styles = StyleSheet.create({
  video: {
    width: "98%",
    alignSelf: "center",
    height: 200,
    marginBottom: 20,
  },
});
