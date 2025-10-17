import axios from "axios";
import { sampleOrganizations } from './data/organizations';

const API_BASE_URL = "http://localhost:8000"; // or your hosted FastAPI URL

// Provide a simple synthetic in-memory store for development when backend is not available.

const syntheticStore = [...sampleOrganizations]; // initial dataset

// helper to simulate axios-like response
const wrap = (data) => Promise.resolve({ data });

export const createOrganization = async (data) => {
  // If you want to try the real backend uncomment below and handle errors/fallbacks.
  // try { return await axios.post(`${API_BASE_URL}/organization/create`, data); } catch (e) { /* fallback to synthetic */ }

  const created = {
    id: `org-${Date.now()}`,
    name: data.name || 'Unnamed',
    industry: data.industry || 'Other',
    size: data.size || '',
    country: data.country || '',
    description: data.description || '',
    createdAt: new Date().toISOString(),
    assessments: data.assessments || [],
  };
  syntheticStore.unshift(created);
  return wrap(created);
};

export const getOrganization = async (id) => {
  // try { return await axios.get(`${API_BASE_URL}/organization/${id}`); } catch (e) { /* fallback below */ }
  const found = syntheticStore.find((s) => s.id === id);
  if (!found) return Promise.reject(new Error('Not found'));
  return wrap(found);
};

// keep existing named functions for assessments/reports if needed
export const createReport = async (data) => {
  try {
    return await axios.post(`${API_BASE_URL}/assessment/create-report`, data);
  } catch (e) {
    // synthetic fallback: return a stubbed response
    return wrap({ success: true, report: { id: `r-${Date.now()}`, ...data } });
  }
};

export const getReport = async (orgId) => {
  try {
    return await axios.get(`${API_BASE_URL}/assessment/report/${orgId}`);
  } catch (e) {
    // synthetic fallback: no reports
    return wrap({ reports: [] });
  }
};
