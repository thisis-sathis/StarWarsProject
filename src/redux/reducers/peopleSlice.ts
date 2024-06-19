import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Person {
  name: string;
  // Add other relevant fields as needed
}

interface PeopleState {
  data: Person[];
  loading: boolean;
  errorStatus: boolean;
  errorMessage: string;
  pagination: any;
  searchQuery: string;
  totalCount: number;
}

const initialState: PeopleState = {
  data: [],
  loading: false,
  errorStatus: false,
  errorMessage: "",
  pagination: {
    previousPage: null,
    nextPage: null,
  },
  searchQuery: "",
  totalCount:0
};


export const fetchPeopleData = createAsyncThunk<Person[], string | undefined>(
  'people/fetchData',
  async (url = 'https://swapi.dev/api/people/?page=1') => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data; // Assuming `results` contains the list of people
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
        state.pagination = {
          previousPage: null,
          nextPage: null,
        }
      })
      .addCase(fetchPeopleData.fulfilled, (state, action: PayloadAction<Person[]>) => {
        state.loading = false;
        state.data = action.payload?.results;
        state.totalCount = action.payload?.count;
        state.pagination = {
          previousPage: action.payload?.previous,
          nextPage: action.payload?.next,
        };
        state.errorStatus = false;
        state.errorMessage = "";
      })
      .addCase(fetchPeopleData.rejected, (state, action) => {
        state.loading = false;
        state.errorStatus = true;
        state.errorMessage = action.error.message || 'Failed to fetch data';
        state.data = [];
        state.pagination =  {
          previousPage: null,
          nextPage: null,
        }
      });
  },
});

export const { reducer: peopleReducer } = peopleSlice; 
export default peopleSlice.reducer;
