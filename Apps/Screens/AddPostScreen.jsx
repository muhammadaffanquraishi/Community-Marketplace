import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { app } from "./../../firebaseConfig";
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "@clerk/clerk-expo";

export default function AddPostScreen() {
  const [image, setImage] = useState(null);
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);
  const storage = getStorage();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    getCategoryList();
  }, []);

  /**
   * Used to get Category List
   */

  const getCategoryList = async () => {
    try {
      setCategoryList([]);
      const querySnapsot = await getDocs(collection(db, "Category"));
      querySnapsot.forEach((doc) => {
        // console.log("DocsAddPost:",doc.data());
        setCategoryList((categoryList) => [...categoryList, doc.data()]);
      });
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };
  /**
   * Used to Pick Image from Gallery
   */
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error Picking Image From Gallery", error);
    }
  };

  const onSubmitMethod = async (value) => {
    setLoading(true);
    // try{
    //Convert Uri to Blob file

    const resp = await fetch(image);
    const blob = await resp.blob();
    const storageRef = ref(storage, "communityPost/" + Date.now() + ".jpg");

    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          value.image = downloadUrl;
          value.userName = user.fullName;
          value.userEmail = user.primaryEmailAddress.emailAddress;
          value.userImage = user.imageUrl;

          const docRef = await addDoc(collection(db, "UserPost"), value);
          if (docRef.id) {
            setLoading(false);
            Alert.alert("Success!!!", "Post Added Successfully!!!");
          }
        });
      });
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView className="p-10" nestedScrollEnabled={true}>
        <Text className="text-[30px] font-bold">Add New Post</Text>
        <Text className="text-[18px] text-gray-500 mb-7">
          Create New Post and Start Selling
        </Text>
        <Formik
          initialValues={{
            title: "",
            desc: "",
            category: "",
            address: "",
            price: "",
            image: "",
            userName: "",
            userEmail: "",
            userImage: "",
            createdAt: Date.now(),
          }}
          onSubmit={(value) => onSubmitMethod(value)}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              console.log("Title not Present");
              ToastAndroid.show("Title Must be There", ToastAndroid.SHORT);
              errors.name = "Title Must be There";
            }
            return errors;
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
            errors,
          }) => (
            <View>
              <TouchableOpacity onPress={pickImage}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 100, height: 100, borderRadius: 15 }}
                  />
                ) : (
                  <Image
                    source={require("./../../assets/Images/download.png")}
                    style={{ width: 100, height: 100, borderRadius: 15 }}
                  />
                )}
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Title"
                value={values?.title}
                onChangeText={handleChange("title")}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={values?.desc}
                onChangeText={handleChange("desc")}
                numberOfLines={5}
              />
              <TextInput
                style={styles.input}
                placeholder="Price"
                value={values?.price}
                onChangeText={handleChange("price")}
                keyboardType="number-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={values?.address}
                onChangeText={handleChange("address")}
              />
              <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 15 }}>
                <Picker
                  selectedValue={values?.category}
                  className="border-2"
                  onValueChange={(itemValue) =>
                    setFieldValue("category", itemValue)
                  }
                >
                  {categoryList.length > 0 &&
                    categoryList.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item?.name}
                        value={item?.name}
                      />
                    ))}
                </Picker>
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  backgroundColor: loading ? "#ccc" : "#007BFF",
                }}
                disabled={loading}
                className="p-5 bg-blue-500 rounded-full mt-10"
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white text-center text-[16px] ">
                    Submit
                  </Text>
                )}
              </TouchableOpacity>
              {/* <Button onPress={handleSubmit}
          className='mt-7'
          title='submit'/> */}
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 5,
    padding: 10,
    paddingHorizontal: 17,
    textAlignVertical: "top",
    fontSize: 15,
  },
});
