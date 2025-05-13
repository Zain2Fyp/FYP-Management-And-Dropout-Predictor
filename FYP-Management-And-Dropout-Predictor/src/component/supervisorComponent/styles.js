import { StyleSheet } from "react-native";
import { height, width } from "../../utils/Dimension";

export const styles = StyleSheet.create({
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
  sendButton: {
    marginTop: 10,
    backgroundColor: "#4e73df",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
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
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    color: "#374151",
  },
  buttonPrimary: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonDanger: {
    backgroundColor: "#dc2626",
    width: width(20),
    height: height(4),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    // paddingHorizontal: width(2)
  },
  buttonSuccess: {
    marginTop: height(1),
    backgroundColor: "#16a34a",
    width: width(20),
    height: height(4),
    justifyContent: "center",
    borderRadius: 15,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 14,
  },
  listItemContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  groupInfoContainer: {
    flex: 1,
    marginRight: 12,
  },
  projectNameText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 4,
  },
  memberCountContainer: {
    backgroundColor: "#EDF2F7",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  memberCountText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },
  removeButton: {
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "600",
  },

  reqContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  requestItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  studentName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  groupItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 1,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2e3a59",
    marginBottom: 6,
  },
  detail: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  remarkLabel: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#2e3a59",
  },
  remarksInput: {
    marginTop: 6,
    backgroundColor: "#f0f0f5",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: "#333",
    minHeight: 60,
    textAlignVertical: "top",
  },
  noGroups: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
    marginTop: 20,
  },
  uploadedFileText: {
    marginTop: 4,
    color: "green",
  },
});
