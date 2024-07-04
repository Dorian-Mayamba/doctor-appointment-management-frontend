import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PatientData } from '../../types/types';

// Define the structure for individual patient data
interface PatientState extends PatientData {
 
}

// Define the structure for managing a list of patients
interface PatientsState {
  patients: PatientState[];
}

// Initial state for a single patient
const initialPatientState: PatientState = {
  patientName: '',
  patientEmail: '',
  patientId: 0,
  patientNumber: '',
  patientProfile: '',
  appointments: [],
  reviews:[],
  ratings:0
};

// Initial state for a list of patients
const initialPatientsState: PatientsState = {
  patients: [],
};

// Create a slice for managing individual patient data
const patientSlice = createSlice({
  name: 'patient',
  initialState: initialPatientState,
  reducers: {
    setPatient: (state, action: PayloadAction<Partial<PatientState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

// Create a slice for managing multiple patients
const patientsSlice = createSlice({
  name: 'patients',
  initialState: initialPatientsState,
  reducers: {
    setPatients: (state, action: PayloadAction<PatientsState>) => {
      state.patients = action.payload.patients;
    },
  },
});

// Export the reducers and actions for use in the Redux store
export const { setPatient } = patientSlice.actions;
export const { setPatients } = patientsSlice.actions;

export default {
  patientReducer: patientSlice.reducer,
  patientsReducer: patientsSlice.reducer,
};
