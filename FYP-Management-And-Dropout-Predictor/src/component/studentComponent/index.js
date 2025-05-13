import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Modal,
  Button,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { supabase } from "../../../supabase/supabaseClient"; // Adjust path to your supabase.js file
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import LottieView from "lottie-react-native";
import { height, width } from "../../utils/Dimension";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { auth, db } from "../../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
export default function StudentDashboard() {
  const [selectedSupervisor, setSelectedSupervisor] = useState("");
  const [totalGroups, setTotalGroups] = useState("0 Groups");
  const [remarks, setRemarks] = useState({});
  const [fileName, setFileName] = useState(null);
  const [groups, setGroups] = useState([
    { id: "S1", name: "John Doe" },
    { id: "S2", name: "Jane Smith" },
    { id: "S3", name: "Alice Johnson" },
  ]);
  const [selectedBtnActive, setSelectedBtnActive] = useState(true);
  const [supervisors, setSupervisors] = useState(["No Supervisors added"]);
  const [dataToSendReq, setDataToSendReq] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [studentNames, setStudentNames] = useState(["", "", ""]);
  const [weeklyTask, setWeeklyTask] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [supervisorRemarks, setSupervisorRemarks] = useState("No remarks yet");
  const [uploading, setUploading] = useState(false);
  const [remoteUrl, setRemoteUrl] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {
    // Fetch groups from Firestore on component mount
    const fetchGroups = async () => {
      const querySnapshot = await getDocs(collection(db, "groups"));
      const fetchedGroups = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("festch grpup", fetchGroups);
      setGroups(fetchedGroups);
    };
    fetchSupervisorRemarks();

    fetchGroups();
  }, []);

  const saveSelectedSupervoiser = async () => {
    setSelectedBtnActive(false);
    setModalVisible(true);
  };

  const handleFileUpload = async () => {
    try {
      if (!weeklyTask) {
        alert("Please enter Weakly Task First");
        return;
      }
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      console.log("Picker result:", result);

      if (!result.canceled) {
        const file = result.assets[0];
        setFileName(file.name);
        await uploadDocument(file);
      } else {
        alert("File selection was canceled.");
      }
    } catch (error) {
      console.error("Error picking document:", error);
      alert("An error occurred while selecting the file.");
    }
  };
  const uploadDocument = async (file) => {
    try {
      setUploading(true);
      setUploaded(false);

      // Read the file as a blob
      const response = await fetch(file.uri);
      const blob = await response.blob();
      const arrayBuffer = await new Response(blob).arrayBuffer();

      // Generate a unique file path (e.g., user-id/filename or timestamp/filename)
      const filePath = `documents/${Date.now()}_${file.name}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from("weeklyreport") // Your bucket name
        .upload(filePath, arrayBuffer, {
          contentType: file.mimeType || "application/octet-stream",
        });

      if (error) {
        throw error;
      }

      console.log("Uploaded file:", data.path);

      // Optionally, get the public URL to access the file
      const { data: publicUrlData } = supabase.storage
        .from("weeklyreport")
        .getPublicUrl(filePath);
      setRemoteUrl(publicUrlData.publicUrl);
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Error", "Failed to upload document.");
    } finally {
      setUploading(false);
      setUploaded(true);
    }
  };
  const fetchSupervisorRemarks = async () => {
    try {
      const q = query(
        collection(db, "weeklyReports"),
        where("studentId", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const latestRemark = querySnapshot.docs[0].data();
        setSupervisorRemarks(latestRemark.remarks || "No remarks yet");
      } else {
        setSupervisorRemarks("No remarks yet");
      }
    } catch (error) {
      console.error("Error fetching remarks:", error);
      Alert.alert("Error", "Failed to load remarks");
    }
  };
  async function getProjectName() {
    try {
      const q = query(
        collection(db, "StudentSupervisorRequests"),
        where("studentId", "==", auth?.currentUser?.uid)
      );
      const projectName = (await getDocs(q)).docs[0].data().projectName;
      setProjectName(projectName);
      console.log("projectName121,", projectName);
    } catch (e) {
      console.log("Error fetching documents:", error);
    }
  }
  const sendWeeklyReport = async () => {
    await getProjectName();
    if (!projectName) {
    }
    if (!weeklyTask) {
      Alert.alert("Error", "Please enter your weekly task");
      return;
    }
    if (!dataToSendReq?.id) {
      Alert.alert("Error", "No supervisor selected");
      return;
    }

    if (!fileName) {
      Alert.alert("Error", "Please select a file to upload");
      return;
    }
    setIsLoading(true);
    console.log("projectName,", projectName);

    try {
      const reportData = {
        studentId: auth.currentUser.uid,
        studentName: auth.currentUser.displayName,
        supervisorId: dataToSendReq?.id,
        weeklyTask,
        projectName,
        fileName: fileName,
        fileUrl: remoteUrl,
        timestamp: serverTimestamp(),
        status: "submitted",
      };

      await addDoc(collection(db, "weeklyReports"), reportData);

      Alert.alert(
        "Success",
        `Weekly report submitted successfully to ${dataToSendReq?.username}`
      );
      setFileName(null);
      setWeeklyTask("");

      // Refresh remarks
      await fetchSupervisorRemarks();
    } catch (error) {
      console.error("Error submitting weekly report:", error);
      Alert.alert("Error", "Failed to submit weekly report");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getDataFunction();
    getSelectedSupervisor();
  }, []);
  const getDataFunction = async () => {
    try {
      const usersCollectionRef = collection(db, "Supervisor");

      const querySnapshot = await getDocs(usersCollectionRef);

      const supervisorData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.username) {
          supervisorData.push(data);
        }
      });

      setSupervisors(supervisorData);
    } catch (e) {
      console.error("Error getting supervisorData: ", e);
    }
  };

  const sendRequestToSupervisor = async () => {
    try {
      console.log("studentNames", studentNames);

      if (studentNames.length !== 3 || studentNames.includes("")) {
        Alert.alert("Error", "You must provide 3 valid student names.");
        return;
      }
      console.log("dataToSendReq fetched:", dataToSendReq);

      await setDoc(doc(db, "supervisors", "currentSelection"), {
        selectedSupervisor,
      });
      const requestsRef = collection(db, "StudentSupervisorRequests");
      const requestedData = {
        projectName,
        studentNames,
        studentId: auth?.currentUser?.uid,
        studentName: auth?.currentUser?.displayName,
        supervisorId: dataToSendReq?.id,
        status: "pending",
        timestamp: serverTimestamp(),
      };
      console.log("====================================");
      console.log("request data", requestedData, dataToSendReq);
      console.log("====================================");
      await addDoc(requestsRef, requestedData);
      setModalVisible(false);
      console.log(`Request sent to supervisor: ${dataToSendReq?.id}`);
    } catch (e) {
      console.error("Error sending request to supervisor: ", e);
    }
  };

  const getSelectedSupervisor = async () => {
    try {
      const studentId = auth?.currentUser?.uid;

      const docRef = doc(db, "studentSupervisorMapping", studentId);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("datta", data);

        setDataToSendReq({
          id: data.supervisorId,
          username: data.supervisorName,
        });
        setSelectedSupervisor(data.supervisorName || "");
      } else {
        console.log("No supervisor assigned yet.");
      }
    } catch (error) {
      console.error("Error fetching selected supervisor:", error);
    }
  };

  console.log("====================================");
  console.log("erip", dataToSendReq?.username);
  console.log("====================================");

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topheader}>
        <Text style={{ fontWeight: "800", fontSize: 20 }}>
          Selected Supervisor
        </Text>
        <Text>{dataToSendReq?.username}</Text>
      </View>
      <ScrollView style={styles.container}>
        {!selectedSupervisor && selectedSupervisor === "" && (
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>Select Supervisor</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Supervisor</Text>
              <Picker
                selectedValue={selectedSupervisor}
                onValueChange={(itemValue) => {
                  setSelectedBtnActive(true), setDataToSendReq(itemValue);
                }}
                style={styles.picker}
              >
                <Picker.Item label={"Select Supervoiser"} />
                {supervisors &&
                  supervisors.map((supervisor) => (
                    <Picker.Item
                      label={supervisor.username}
                      value={supervisor}
                      key={supervisor}
                    />
                  ))}
              </Picker>
            </View>
            <TouchableOpacity
              style={
                selectedBtnActive ? styles.buttonActive : styles.buttonPrimary
              }
              onPress={() => {
                saveSelectedSupervoiser();
              }}
            >
              <Text style={styles.buttonText}> Press to Select Supervisor</Text>
            </TouchableOpacity>

            {/* <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>Total Groups under Selected Supervisor</Text>
                    <View style={styles.resultBox}>
                        <Text>{totalGroups}</Text>
                    </View>
                </View> */}
          </View>
        )}
        {/* Weekly Progress */}
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Weekly Progress</Text>

          {/* Task Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Enter Weekly Task</Text>
            <TextInput
              style={[styles.textInput, { minHeight: 100 }]}
              placeholder="Enter what you worked on this week..."
              multiline
              numberOfLines={4}
              value={weeklyTask}
              onChangeText={setWeeklyTask}
            />
          </View>

          {/* Upload Options */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Upload Document or Image</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={[styles.uploadButton, { width: "48%" }]}
                onPress={handleFileUpload}
                disabled={uploading}
              >
                <MaterialIcons
                  name="insert-drive-file"
                  size={20}
                  color="white"
                />
                {uploading ? (
                  <Text style={{ fontSize: 20 }}>Uploading...</Text>
                ) : (
                  <Text style={styles.uploadButtonText}> Choose File</Text>
                )}
              </TouchableOpacity>
            </View>

            {fileName && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.fileNameName}>Selected: {fileName}</Text>
                {uploaded && (
                  <LottieView
                    source={require("../../../assets/lottie/uploaded.json")}
                    autoPlay
                    loop={false}
                    style={{ width: 50, height: 50 }}
                  />
                )}
              </View>
            )}
          </View>

          {/* Submit Button - Enabled only when file is selected */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              !fileName && styles.submitButtonDisabled,
            ]}
            onPress={sendWeeklyReport}
            disabled={!fileName || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Submit Weekly Report</Text>
            )}
          </TouchableOpacity>

          {/* Supervisor Remarks */}
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>
              Suggestions/Remarks from Supervisor
            </Text>
            {dataToSendReq?.username && (
              <>
                <View style={styles.resultBox}>
                  <Text>{supervisorRemarks}</Text>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Enter Project and Student Names
            </Text>

            {/* Project Name */}
            <TextInput
              style={styles.inputField}
              placeholder="Project Name"
              value={projectName}
              onChangeText={(text) => setProjectName(text)}
            />

            {/* Student Names */}
            {studentNames.map((name, index) => (
              <TextInput
                key={index}
                style={styles.inputField}
                placeholder={`Student ${index + 1} Name`}
                value={name}
                onChangeText={(text) => {
                  const updatedNames = [...studentNames];
                  updatedNames[index] = text;
                  setStudentNames(updatedNames);
                }}
              />
            ))}
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.buttonActive}
              onPress={sendRequestToSupervisor}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonPrimary}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
