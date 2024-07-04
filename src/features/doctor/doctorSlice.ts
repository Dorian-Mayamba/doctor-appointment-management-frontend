import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DoctorData } from '../../types/types';

interface DoctorState extends DoctorData{
  
}

interface DoctorsState {
  doctors: DoctorState[];
}

// Initial state for a single doctor
const initialDoctorState: DoctorState = {
  doctorName: '',
  doctorEmail: '',
  doctorId: 0,
  doctorSpeciality: '',
  doctorNumber: '',
  doctorProfile: '',
  appointments: [],
  ratings: 0,
  reviews:[],
  averageRating: 0,
};

// Initial state for a list of doctors
const initialDoctorsState: DoctorsState = {
  doctors: [],
};

// Create a slice for managing doctor-related data
const doctorSlice = createSlice({
  name: 'doctor',
  initialState: initialDoctorState,
  reducers: {
    // Reducer for setting a single doctor
    setDoctor: (state, action: PayloadAction<Partial<DoctorState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

// Create a slice for managing multiple doctors
const doctorsSlice = createSlice({
  name: 'doctors',
  initialState: initialDoctorsState,
  reducers: {
    setDoctors: (state, action: PayloadAction<DoctorsState>) => {
      state.doctors = action.payload.doctors;
    },
  },
});

export const { setDoctor } = doctorSlice.actions;
export const { setDoctors } = doctorsSlice.actions;

export default {
  doctorReducer: doctorSlice.reducer,
  doctorsReducer: doctorsSlice.reducer,
};
