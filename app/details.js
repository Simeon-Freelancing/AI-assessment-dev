import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import ModalSelector from "react-native-modal-selector";
import { sampleOrganizations } from "../data/organizations";
import { getOrganizationNames, getOrganization, createOrganization } from "../lib/api";

export default function Details() {
  const router = useRouter();
  const [showOrgList, setShowOrgList] = useState(false);
  const [showNewOrgForm, setShowNewOrgForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    industry: "",
    description: "",
    employeeSize: "",
    goals: ""
  });
  const [orgList, setOrgList] = useState([]);
  const [loadingOrgs, setLoadingOrgs] = useState(false);
  const [selectedOrgDetails, setSelectedOrgDetails] = useState(null);

  const industries = ["Technology", "Healthcare", "Finance", "Manufacturing", "Other"];
  const employeeSizes = ["1-10", "11-50", "51-200", "201-500", "500+"];
  const goals = ["Digital Transformation", "Process Automation", "Data Analytics", "Customer Experience", "Other"];

  // Fetch organization names when modal opens
  const handleShowOrgList = async () => {
    setLoadingOrgs(true);
    const { data, error } = await getOrganizationNames();
    setOrgList(data || []);
    setLoadingOrgs(false);
    setShowOrgList(true);
  };

  // Fetch organization details when selected
  const handleSelectOrg = async (org) => {
    setSelectedOrg(org); // for modal visibility
    const { data, error } = await getOrganization(org.id);
    setSelectedOrgDetails(data || org);
  };

  const handleCreateOrg = async () => {
    try {
      const { data, error } = await createOrganization(formData);
      if (error) {
        throw error;
      }
      // success
      alert("Organization created successfully!");
      setShowNewOrgForm(false);
      setShowOrgList(true);
      // optional: clear form
      setFormData({
        name: "",
        email: "",
        industry: "",
        description: "",
        employeeSize: "",
        goals: "",
      });
    } catch (error) {
      alert("Error creating organization: " + (error.message || String(error)));
      // keep the user on the create form so they can retry or go back
    }
  };

  const handleContinueToDashboard = () => {
    // close UI state first
    setSelectedOrg(null);
    setSelectedOrgDetails(null);
    setShowOrgList(false);
    // navigate to dashboard with orgId as query param so dashboard can load persisted assessment
    const id = selectedOrgDetails?.id ?? selectedOrg?.id;
    if (id) {
      router.push(`/dashboard?orgId=${id}`);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Organization</Text>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={handleShowOrgList}
      >
        <Text style={styles.optionText}>Select Existing Organization</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => setShowNewOrgForm(true)}
      >
        <Text style={styles.optionText}>Create New Organization</Text>
      </TouchableOpacity>

      {/* Organization List Modal */}
      <Modal visible={showOrgList} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search organizations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {loadingOrgs ? (
            <Text>Loading...</Text>
          ) : (
            <ScrollView style={styles.orgList}>
              {orgList
                .filter(org => org.name?.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((org) => (
                  <TouchableOpacity
                    key={org.id}
                    style={styles.orgItem}
                    onPress={() => handleSelectOrg(org)}
                  >
                    <Text style={styles.orgName}>{org.name}</Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowOrgList(false)}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Organization Details Modal */}
      <Modal visible={!!selectedOrg} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Organization Details</Text>
          <Text style={styles.detailText}>Name: {selectedOrgDetails?.name}</Text>
          <Text style={styles.detailText}>Industry: {selectedOrgDetails?.industry}</Text>
          <Text style={styles.detailText}>Email: {selectedOrgDetails?.email}</Text>
          <Text style={styles.detailText}>Employee Size: {selectedOrgDetails?.employeeSize}</Text>
          <Text style={styles.detailText}>Goals: {selectedOrgDetails?.goals}</Text>
          <Text style={styles.detailText}>Description: {selectedOrgDetails?.description}</Text>
          <Text style={styles.detailText}>Onboard Date: {selectedOrgDetails?.onboardDate}</Text>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinueToDashboard}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setSelectedOrg(null);
              setSelectedOrgDetails(null);
            }}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* New Organization Form Modal */}
      <Modal visible={showNewOrgForm} animationType="slide">
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Create New Organization</Text>

          <TextInput
            style={styles.input}
            placeholder="Organization Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />

          <ModalSelector
            data={industries.map((item, index) => ({
              key: index,
              label: item,
            }))}
            initValue="Select Industry"
            onChange={(option) =>
              setFormData({ ...formData, industry: option.label })
            }
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Brief Description"
            multiline
            value={formData.description}
            onChangeText={(text) =>
              setFormData({ ...formData, description: text })
            }
          />

          <ModalSelector
            data={employeeSizes.map((item, index) => ({
              key: index,
              label: item,
            }))}
            initValue="Select Employee Size"
            onChange={(option) =>
              setFormData({ ...formData, employeeSize: option.label })
            }
          />

          <ModalSelector
            data={goals.map((item, index) => ({
              key: index,
              label: item,
            }))}
            initValue="Select Primary Goal"
            onChange={(option) =>
              setFormData({ ...formData, goals: option.label })
            }
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleCreateOrg}
          >
            <Text style={styles.buttonText}>Create Organization</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowNewOrgForm(false)}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a365d',
    marginBottom: 30,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#0891b2',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  orgList: {
    flex: 1,
  },
  orgItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  orgName: {
    fontSize: 16,
    color: '#1e293b',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  picker: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  submitButton: {
    backgroundColor: '#0891b2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  continueButton: {
    backgroundColor: '#0891b2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#64748b',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

