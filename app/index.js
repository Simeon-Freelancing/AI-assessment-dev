import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput, TouchableOpacity, Animated, Dimensions, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import OrganizationCard from './components/OrganizationCard';
import { sampleOrganizations } from '../data/organizations';
import { createOrganization, getOrganization } from '../api';

const SCREEN_W = Dimensions.get('window').width;
const MENU_W = Math.min(300, SCREEN_W * 0.8);

const INDUSTRY_OPTIONS = [
  "Technology",
  "Healthcare",
  "Finance",
  "Manufacturing",
  "Retail",
  "Education",
  "Government",
  "Other",
];

export default function Dashboard() {
  const router = useRouter();
  const [organizations, setOrganizations] = useState(sampleOrganizations);
  const [creating, setCreating] = useState(false);
  // form fields
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState(INDUSTRY_OPTIONS[0]);
  const [size, setSize] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  // rest of existing state
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuAnim = useRef(new Animated.Value(-MENU_W)).current;

  useEffect(() => {
    Animated.timing(menuAnim, {
      toValue: menuOpen ? 0 : -MENU_W,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [menuOpen]);

  function startAssessmentForOrg(org) {
    const assessment = {
      id: `a-${Date.now()}`,
      domainId: `d-${Date.now()}`,
      takenAt: new Date().toISOString(),
      status: 'in-progress',
      score: null,
      reportSummary: null,
    };
    const updated = organizations.map((o) =>
      o.id === org.id ? { ...o, assessments: [assessment, ...(o.assessments || [])] } : o
    );
    setOrganizations(updated);
    setMenuOpen(false);
    router.push(`/assessment/${assessment.domainId}?orgId=${encodeURIComponent(org.id)}`);
  }

  function viewReports(org) {
    setMenuOpen(false);
    router.push(`/results?orgId=${encodeURIComponent(org.id)}`);
  }

  function beginEdit(org) {
    setEditingId(org.id);
    setEditingName(org.name);
  }

  function saveEdit() {
    setOrganizations(
      organizations.map((o) => (o.id === editingId ? { ...o, name: editingName } : o))
    );
    setEditingId(null);
    setEditingName('');
  }

  // New: submit full create form
  async function submitCreate() {
    if (!name.trim()) return; // require name
    const payload = {
      name: name.trim(),
      industry,
      size,
      country,
      description,
      assessments: [],
    };

    try {
      const createResp = await createOrganization(payload); // synthetic or real
      // createOrganization returns { data: created } for synthetic wrap; support both shapes
      const created = createResp && createResp.data ? createResp.data : createResp;
      // fetch authoritative data
      const fetched = await getOrganization(created.id);
      const org = fetched && fetched.data ? fetched.data : fetched;
      setOrganizations((prev) => [org, ...prev]);
      // reset form / close
      setName('');
      setIndustry(INDUSTRY_OPTIONS[0]);
      setSize('');
      setCountry('');
      setDescription('');
      setCreating(false);
      setMenuOpen(false);
    } catch (e) {
      console.warn('Create org failed', e);
      // fallback: add what we have locally
      const fallback = {
        id: `org-${Date.now()}`,
        name: payload.name,
        industry: payload.industry,
        size: payload.size,
        country: payload.country,
        description: payload.description,
        createdAt: new Date().toISOString(),
        assessments: [],
      };
      setOrganizations((prev) => [fallback, ...prev]);
      setCreating(false);
    }
  }

  function renderOrg({ item }) {
    return (
      <View>
        {editingId === item.id ? (
          <View style={styles.editRow}>
            <TextInput
              style={styles.input}
              value={editingName}
              onChangeText={setEditingName}
            />
            <Button title="Save" onPress={saveEdit} />
            <Button title="Cancel" onPress={() => setEditingId(null)} />
          </View>
        ) : (
          <OrganizationCard
            org={item}
            onEdit={beginEdit}
            onStartAssessment={startAssessmentForOrg}
            onViewReport={viewReports}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Admin header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuOpen(true)} style={styles.hamburger}>
          <View style={styles.hamLine} />
          <View style={[styles.hamLine, { width: 18 }]} />
          <View style={[styles.hamLine, { width: 14 }]} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Organizations</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerBtn} onPress={() => setCreating(true)}>
            <Text style={styles.headerBtnText}>+ New</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Organizations list */}
      <FlatList
        data={organizations}
        keyExtractor={(item) => item.id}
        renderItem={renderOrg}
        contentContainerStyle={{ paddingBottom: 60, paddingTop: 12 }}
      />

      {/* Slide-in side menu */}
      {menuOpen && (
        <TouchableWithoutFeedback onPress={() => setMenuOpen(false)}>
          <View style={styles.menuOverlay} />
        </TouchableWithoutFeedback>
      )}
      <Animated.View style={[styles.sideMenu, { transform: [{ translateX: menuAnim }] }]}>
        <Text style={styles.menuTitle}>Admin</Text>

        <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuOpen(false); }}>
          <Text style={styles.menuText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuOpen(false); router.push('/ai-assistant'); }}>
          <Text style={styles.menuText}>AI Assistant</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuOpen(false); router.push('/results'); }}>
          <Text style={styles.menuText}>Results & Insights</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20, borderTopWidth: 1, borderTopColor: '#e6eef8', paddingTop: 12 }}>
          <Text style={styles.sectionLabel}>Quick actions</Text>
          <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuOpen(false); setCreating(true); }}>
            <Text style={styles.menuText}>Create organization</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Create form overlay */}
      {creating && (
        <View style={styles.formOverlay}>
          <View style={styles.formPanel}>
            <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
              <View style={styles.formHeader}>
                <Text style={styles.formTitle}>Create organization</Text>
                <TouchableOpacity onPress={() => setCreating(false)}>
                  <Text style={styles.formClose}>Close</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Organization Name</Text>
              <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Acme Corp" />

              <Text style={styles.label}>Industry</Text>
              {/* simple select: render options as buttons */}
              <View style={styles.pillsRow}>
                {INDUSTRY_OPTIONS.map((opt) => {
                  const active = opt === industry;
                  return (
                    <TouchableOpacity
                      key={opt}
                      onPress={() => setIndustry(opt)}
                      style={[styles.pill, active && styles.pillActive]}
                    >
                      <Text style={[styles.pillText, active && styles.pillTextActive]}>{opt}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text style={styles.label}>Organization Size</Text>
              <TextInput style={styles.input} value={size} onChangeText={setSize} placeholder="e.g. 50-200" />

              <Text style={styles.label}>Country</Text>
              <TextInput style={styles.input} value={country} onChangeText={setCountry} placeholder="e.g. United States" />

              <Text style={styles.label}>Brief Description</Text>
              <TextInput
                style={[styles.input, { minHeight: 80 }]}
                value={description}
                onChangeText={setDescription}
                placeholder="Short description..."
                multiline
              />

              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 }}>
                <Button title="Cancel" onPress={() => setCreating(false)} />
                <View style={{ width: 12 }} />
                <Button title="Create" onPress={submitCreate} />
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    backgroundColor: '#f1f5f9',
    flex: 1,
  },
  header: {
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e6eef8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  hamburger: {
    padding: 8,
    marginRight: 8,
  },
  hamLine: {
    height: 2,
    backgroundColor: '#1a365d',
    width: 22,
    marginVertical: 2,
    borderRadius: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    flex: 1,
    textAlign: 'left',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerBtn: {
    backgroundColor: '#1a365d',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  headerBtnText: {
    color: '#fff',
    fontWeight: '700',
  },

  // side menu
  sideMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: MENU_W,
    height: '100%',
    backgroundColor: '#ffffff',
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 40,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5,10,20,0.35)',
    zIndex: 30,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 12,
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 15,
    color: '#1a365d',
    fontWeight: '600',
  },
  sectionLabel: {
    color: '#6b7280',
    fontSize: 12,
    marginBottom: 8,
  },

  // form overlay
  formOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(6,8,20,0.4)',
    justifyContent: 'flex-end',
    zIndex: 50,
  },
  formPanel: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: '85%',
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  formClose: {
    color: '#1a365d',
    fontWeight: '700',
  },
  label: {
    color: '#374151',
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 6,
  },
  input: {
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 6,
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e6eef8',
    borderRadius: 18,
    marginRight: 8,
    marginBottom: 8,
  },
  pillActive: {
    backgroundColor: '#1a365d',
    borderColor: '#1a365d',
  },
  pillText: {
    color: '#0f172a',
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#fff',
  },

  editRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
});
