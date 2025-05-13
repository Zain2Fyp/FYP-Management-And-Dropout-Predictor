import { StyleSheet } from "react-native";
import { colors } from "../../utils/database";
import { height, width } from "../../utils/Dimension";

export const styles = StyleSheet.create({
  menuContainer: {
    width: width(90),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "flex-end",
    // backgroundColor: colors.red
    marginVertical: height(1),
  },
  textInput: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    textAlignVertical: "top",
    color: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionText: {
    height: height(4),
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  navContainer: {
    flexDirection: "row",
    gap: 16,
  },
  navText: {
    color: "#2563eb",
  },
  cardContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    color: "#374151",
  },
  uploadButton: {
    flexDirection: "row",

    marginTop: height(1),
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  uploadedFileName: {
    marginTop: 8,
    fontSize: 14,
    color: colors.green,
  },
  buttonPrimary: {
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingVertical: 12,
    paddingHorizontal: width(12),
    borderRadius: 4,
    marginTop: 8,
  },
  buttonActive: {
    backgroundColor: "#DE3163",
    paddingVertical: 12,
    paddingHorizontal: width(12),
    borderRadius: 4,
    marginTop: 8,
    marginRight: 10,
  },
  buttonDanger: {
    backgroundColor: "green",
    width: width(20),
    height: height(4),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    // paddingHorizontal: width(2)
  },

  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 14,
  },
  buttonSuccess: {
    backgroundColor: "#16a34a",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginTop: 8,
  },

  listItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 8,
  },
  listItemText: {
    fontSize: 14,
    color: "#374151",
  },
  resultContainer: {
    marginTop: 16,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  resultBox: {
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputField: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "#007BFF", // Bootstrap primary blue
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3, // For Android shadow
  },
  topheader: {
    backgroundColor: "white", // Bootstrap primary blue
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    width: "91%",
    alignSelf: "center",
    marginBottom: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3, // For Android shadow
  },
  submitButtonDisabled: {
    backgroundColor: "#A0A0A0", // Light gray for disabled state
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
