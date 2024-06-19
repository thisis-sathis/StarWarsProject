import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  errorStatus: false,
  errorMessage: "",
  pagination: {},
  searchQuery: ""
};


export const fetchPeopleData = createAsyncThunk(
  'people/fetchData',
  async () => {
    try {
      const response = await fetch('https://swapi.dev/api/people/?page=1');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data.results; 
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  }
);


export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeopleData.pending, (state) => {
        state.loading = true;
        state.errorStatus = false;
        state.errorMessage = "";
        state.data = [];
      })
      .addCase(fetchPeopleData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.errorStatus = false;
        state.errorMessage = "";
      })
      .addCase(fetchPeopleData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.data = [];
      });
  },
});

export const { reducer: peopleReducer } = peopleSlice; 

export default peopleSlice.reducer;





