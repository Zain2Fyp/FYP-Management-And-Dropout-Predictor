import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Platform,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { sendDataToBackend } from "../../api";

const BatchAdvisorDashboard = () => {
  const [formData, setFormData] = useState({
    tuitionFeesPaid: "",
    scholarshipHolder: "",
    firstSemGPA: "",
    secondSemGPA: "",
    age: "",
    attendance: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (
      !formData.tuitionFeesPaid ||
      !formData.scholarshipHolder ||
      !formData.firstSemGPA ||
      !formData.secondSemGPA ||
      !formData.age ||
      !formData.attendance
    ) {
      showToast("Please fill all fields");
      return;
    }

    // Convert to numerical values where needed
    const submissionData = {
      tuition: formData.tuitionFeesPaid.toLocaleLowerCase() === "yes" ? 1 : 0,
      scholarship:
        formData.scholarshipHolder.toLocaleLowerCase() === "yes" ? 1 : 0,
      gpa1: parseFloat(formData.firstSemGPA),
      gpa2: parseFloat(formData.secondSemGPA),
      age: parseInt(formData.age),
      attendance: parseInt(formData.attendance),
    };

    // Here you would typically send the data to your backend
    console.log("Submitting:", submissionData);
    const res = await sendDataToBackend(submissionData);
    console.log("Res", res);

    Alert.alert(
      res?.dropout_risk ? "You are in Danger" : "You are safe",
      res?.dropout_risk ? `Reason: \n${res?.reasons.join("\n")}` : res?.message
    );

    setTimeout(() => {
      showToast("Student data submitted successfully!");
      setFormData({
        tuitionFeesPaid: "",
        scholarshipHolder: "",
        firstSemGPA: "",
        secondSemGPA: "",
        age: "",
        attendance: "",
      });
    }, 1000);
  };

  const showToast = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Student Data Entry</Text>

      <View style={styles.formContainer}>
        {/* Tuition Fees Paid */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tuition Fees Paid (Yes, No)</Text>
          <TextInput
            style={styles.input}
            value={formData.tuitionFeesPaid}
            onChangeText={(text) => handleInputChange("tuitionFeesPaid", text)}
            placeholder="Enter yes or no"
            maxLength={3}
          />
        </View>

        {/* Scholarship Holder */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Scholarship Holder (Yes, No)</Text>
          <TextInput
            style={styles.input}
            value={formData.scholarshipHolder}
            onChangeText={(text) =>
              handleInputChange("scholarshipHolder", text)
            }
            placeholder="Enter yes or no"
            maxLength={3}
          />
        </View>

        {/* First Sem GPA */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Sem GPA (1.0 to 4.0)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formData.firstSemGPA}
            onChangeText={(text) => handleInputChange("firstSemGPA", text)}
            placeholder="Enter GPA"
          />
        </View>

        {/* Second Sem GPA */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Second Sem GPA (1.0 to 4.0)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formData.secondSemGPA}
            onChangeText={(text) => handleInputChange("secondSemGPA", text)}
            placeholder="Enter GPA"
          />
        </View>

        {/* Age */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formData.age}
            onChangeText={(text) => handleInputChange("age", text)}
            placeholder="Enter age"
          />
        </View>

        {/* Attendance */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Attendance (1 to 100)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formData.attendance}
            onChangeText={(text) => handleInputChange("attendance", text)}
            placeholder="Enter attendance percentage"
            maxLength={3}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Student Data</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BatchAdvisorDashboard;
