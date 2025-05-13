import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Platform,
  Button,
  Alert,
} from "react-native";
import { height, width } from "../../utils/Dimension";
import LottieView from "lottie-react-native";
import { styles } from "./styles";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../../../firebase";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { get } from "firebase/database";

const groupsDataList = [
  {
    id: "G001",
    name: "Alpha Team",
    members: "John, Jane, Alice",
    progress: "70%",
  },
  {
    id: "G002",
    name: "Beta Team",
    members: "Bob, Charlie, Eve",
    progress: "50%",
  },
  {
    id: "G003",
    name: "Gamma Team",
    members: "Dave, Frank, Grace",
    progress: "80%",
  },
];

export default function SupervisorDashboard() {
  const [remarks, setRemarks] = useState({});
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [groups, setGroups] = useState([]);
  const [tasks, setTasks] = useState([]);
  console.log("====================================");
  console.log("Task", tasks);
  console.log("====================================");
  useEffect(() => {
    fetchGroups();
    fetchRequests();
    getWeeklyReport();
  }, []);

  const fetchGroups = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "PickedSupervisorGroups")
      );
      const groupList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const displayOnlySuperVoiserGroup = groupList.filter(
        (e) => e.supervisorId === auth.currentUser?.uid
      );
      console.log("====================================");
      console.log("groupList", displayOnlySuperVoiserGroup);
      console.log("====================================");
      setGroups(displayOnlySuperVoiserGroup);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const fetchRequests = async () => {
    const supervisorId = auth?.currentUser?.uid;
    if (supervisorId) {
      try {
        const requestsRef = collection(db, "StudentSupervisorRequests");
        const q = query(
          requestsRef,
          where("supervisorId", "==", supervisorId),
          where("status", "==", "pending")
        );
        const querySnapshot = await getDocs(q);
        const requests = [];
        querySnapshot.forEach((doc) => {
          requests.push({ id: doc.id, ...doc.data() });
        });
        setRequests(requests);
      } catch (e) {
        console.error("Error fetching supervisor requests: ", e);
      }
    }
  };

  const handleSave = (groupId) => {
    console.log(`Saved remarks for ${groupId}:`, remarks[groupId] || "");
  };

  const updateRequestStatus = async (requestId, newStatus) => {
    try {
      const requestRef = doc(db, "StudentSupervisorRequests", requestId);
      const requestSnap = await getDoc(requestRef);

      if (!requestSnap.exists()) {
        console.error("Request not found!");
        return;
      }

      const requestData = requestSnap.data();

      // Update the request status
      await updateDoc(requestRef, {
        status: newStatus,
      });

      // Remove the request from local state if it's not pending anymore
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );

      console.log(`Request ${requestId} status updated to ${newStatus}`);

      if (newStatus === "accepted") {
        const groupRef = doc(db, "PickedSupervisorGroups", requestId);
        await setDoc(groupRef, {
          projectName: requestData.projectName,
          studentNames: requestData.studentNames,
          studentId: requestData.studentId,
          supervisorId: requestData.supervisorId,
          status: newStatus,
          timestamp: new Date(),
        });
        saveSelectedSupervisor(requestData.studentId, requestData.supervisorId);
        console.log("Group added to PickedSupervisorGroups");
        fetchGroups();
      }
    } catch (error) {
      console.error("Error updating request status: ", error);
    }
  };
  const saveSelectedSupervisor = async (studentId, supervisorID) => {
    try {
      if (!studentId) {
        Alert.alert("Error", "Please select a studentId");
        return;
      }

      const docRef = doc(db, "studentSupervisorMapping", studentId);
      await setDoc(docRef, {
        studentId,
        supervisorId: supervisorID,
        supervisorName: auth.currentUser?.displayName,
        timestamp: serverTimestamp(),
      });
      Alert.alert("Success", "Successfully save selected supervisor");
    } catch (error) {
      console.error("Error saving selected supervisor:", error);
      Alert.alert("Error", "Failed to save selected supervisor");
    }
  };
  const sendRemarksToStudent = async (studentId, groupId, remarks) => {
    try {
      // Add the remarks to Firestore
      await addDoc(collection(db, "weeklyReports"), {
        studentId,
        groupId,
        remarks,
        supervisorId: auth.currentUser.uid,
        supervisorName: auth.currentUser.displayName,
        timestamp: serverTimestamp(),
        status: "submitted",
      });

      Alert.alert("Success", "Remarks sent successfully!");

      // Optional: Send push notification to student
      // You'll need to implement this based on your notification system
    } catch (error) {
      console.error("Error sending remarks:", error);
      Alert.alert("Error", "Failed to send remarks");
    }
  };
  const handleRequestAction = (requestId, action) => {
    const newStatus = action === "accept" ? "accepted" : "rejected";
    Alert.alert(
      "Confirm Action",
      `Are you sure you want to ${action} this request?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => updateRequestStatus(requestId, newStatus),
        },
      ]
    );
  };

  const deleteDocumentsByField = async (fieldName, value) => {
    try {
      const q = query(
        collection(db, "weeklyReports"),
        where(fieldName, "==", value)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No matching documents found.");
        return;
      }

      for (const document of querySnapshot.docs) {
        await deleteDoc(doc(db, "weeklyReports", document.id));
        console.log(`Deleted document with ID: ${document.id}`);
      }

      console.log("Deletion completed.");
    } catch (error) {
      console.error("Error deleting documents:", error);
    }
  };

  const handleRemoveGroup = async (groupId, projectName) => {
    console.log("projectName", projectName);
    Alert.alert(
      "Confirm Removal",
      "Are you sure you want to remove this group?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: async () => {
            try {
              // Delete from Firebase
              await deleteDoc(doc(db, "PickedSupervisorGroups", groupId));
              await deleteDocumentsByField("projectName", projectName);
              await getWeeklyReport();
              // Update local state
              setGroups((prevGroups) =>
                prevGroups.filter((group) => group.id !== groupId)
              );

              Alert.alert("Success", "Group removed successfully");
            } catch (error) {
              console.error("Error removing group: ", error);
              Alert.alert("Error", "Failed to remove group");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderRequestItem = ({ item }) => (
    <View style={styles.requestItem}>
      <Text style={styles.projectTitle}>Project: {item.projectName}</Text>
      <Text style={styles.studentName}>Submitted by: {item.studentName}</Text>
      <Text>Status: {item.status}</Text>

      <Text style={styles.sectionTitle}>Team Members:</Text>
      <View style={styles.namesList}>
        {item.studentNames?.map((name, index) => (
          <Text key={index}>• {name}</Text>
        ))}
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          title="Accept"
          onPress={() => handleRequestAction(item.id, "accept")}
          disabled={item.status !== "pending"}
        />
        <Button
          title="Reject"
          onPress={() => handleRequestAction(item.id, "reject")}
          disabled={item.status !== "pending"}
        />
      </View>
    </View>
  );

  const handleRemarkChange = (text, groupId) => {
    setRemarks((prev) => ({ ...prev, [groupId]: text }));
  };
  async function handleDownload(uri, fileName) {
    const fileUri = FileSystem.documentDirectory + fileName;

    try {
      const { uri: localUri } = await FileSystem.downloadAsync(uri, fileUri);
      console.log("File downloaded to:", localUri);

      if (Platform.OS === "ios" || Platform.OS === "android") {
        await Sharing.shareAsync(localUri);
      } else {
        alert("File downloaded successfully.");
      }
    } catch (error) {
      console.error("Download failed:", error);
    }
  }

  const getWeeklyReport = async () => {
    try {
      const supervisorId = auth.currentUser?.uid;
      if (!supervisorId) throw new Error("No authenticated user");

      const q = query(
        collection(db, "weeklyReports"),
        where("supervisorId", "==", supervisorId)
      );

      const querySnapshot = await getDocs(q);

      const tasksData = [];

      querySnapshot.forEach((doc) => {
        console.log("Found doc ID:", doc.id, "=>", doc.data());
        tasksData.push({
          id: doc.id,
          ...doc.data(), // spread data directly into the object
        });
      });

      setTasks(tasksData); // set state with the collected tasks
      return tasksData;
    } catch (err) {
      console.error("Error fetching weekly reports:", err);
      throw err;
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          source={require("../../../assets/lottie/supDashboardLoading.json")}
          autoPlay
          loop={true}
          style={{ width: 400, height: 400 }}
        />
      </View>
    );
  }
  const handleSendRemarks = async (studentId, groupId, remarksToSend) => {
    if (!remarksToSend.trim()) {
      Alert.alert("Error", "Please enter remarks before sending");
      return;
    }

    await sendRemarksToStudent(studentId, groupId, remarksToSend);
    setRemarks("");
  };

  // useEffect(() => {
  // if (!auth.currentUser?.uid) return;

  return (
    <ScrollView style={styles.container}>
      {/*    <View style={styles.cardContainer}>
              <Text style={styles.cardTitle}>Update Profile</Text>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.input} placeholder="Enter your name" />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Experties</Text>
                    <TextInput style={styles.input} placeholder="Enter your Experties" />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} placeholder="Enter your email" />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity style={styles.buttonPrimary}>
                    <Text style={styles.buttonText}>Update Profile</Text>
                </TouchableOpacity>
            </View>
                */}

      {requests.length > 0 && (
        <View style={styles.reqContainer}>
          <Text style={styles.header}>Supervisor Requests</Text>
          <FlatList
            data={requests}
            renderItem={renderRequestItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}

      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>👥 Manage Groups</Text>
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.listItemContainer}>
              <View style={styles.groupInfoContainer}>
                <Text style={styles.projectNameText}>
                  Project: {item.projectName}
                </Text>
                <View style={styles.memberCountContainer}>
                  {item.studentNames?.map((name, idx) => (
                    <Text key={idx} style={styles.memberCountText}>
                      Member {idx + 1}: {name}
                    </Text>
                  ))}
                </View>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveGroup(item.id, item.projectName)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Weekly Progress */}
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>📘 Weekly Progress</Text>
        {tasks.filter(
          (item) =>
            item !== null &&
            item.studentName?.trim() !== "" &&
            item.weeklyTask?.trim() !== "" &&
            item.fileName?.trim() !== ""
        ).length > 0 ? (
          <FlatList
            data={tasks.filter(
              (item) =>
                item !== null &&
                item.studentName?.trim() !== "" &&
                item.weeklyTask?.trim() !== "" &&
                item.fileName?.trim() !== ""
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 12 }}
            renderItem={({ item }) =>
              item.studentName &&
              //   item.projectName &&
              item.weeklyTask &&
              item.fileName && (
                <View style={styles.groupItem}>
                  {item.studentName && (
                    <Text style={styles.projectTitle}>
                      Student Name: {item.studentName}
                    </Text>
                  )}
                  {item.projectName && (
                    <Text style={styles.projectTitle}>
                      Project Name: {item.projectName}
                    </Text>
                  )}
                  {item.weeklyTask && (
                    <>
                      <Text style={styles.detail}>📝 Task</Text>
                      <Text>{item.weeklyTask}</Text>
                    </>
                  )}
                  {item.fileUrl && (
                    <>
                      <Text style={styles.detail}>📄 Report:</Text>
                      <TouchableOpacity
                        onPress={() => {
                          handleDownload(item.fileUrl, item.fileName);
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: "600",
                            textDecorationLine: "underline",
                            color: "#81BFDA",
                          }}
                        >
                          {item.fileName}
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}

                  <Text style={styles.remarkLabel}>Supervisor's Remarks:</Text>
                  <TextInput
                    style={styles.remarksInput}
                    placeholder="Write remarks here..."
                    value={remarks[item.id] || ""}
                    onChangeText={(text) => handleRemarkChange(text, item.id)}
                    multiline
                  />
                  {remarks[item.id] && (
                    <TouchableOpacity
                      style={styles.sendButton}
                      onPress={() =>
                        handleSendRemarks(
                          item.studentId,
                          item.id,
                          remarks[item.id]
                        )
                      }
                    >
                      <Text style={styles.sendButtonText}>Send Remarks</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )
            }
          />
        ) : (
          <Text style={styles.noGroups}>No groups to show progress.</Text>
        )}
      </View>
    </ScrollView>
  );
}
