import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  films: [],
  loading: false,
  errorStatus: false,
  errorMessage: "",
};

export const fetchFilmsData = createAsyncThunk(
  'films/fetchData',
  async (filmUrls) => {
    try {
      const requests = filmUrls.map(url =>
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
      );
      const films = await Promise.all(requests);
      return films;
    } catch (error) {
      throw new Error(`Failed to fetch films: ${error.message}`);
    }
  }
);

const excludeArraysAndObjects = (arr) => {
  const filteredArray = [];
  arr.forEach((obj) => {
    const filteredObject = {};
    for (const key in obj) {
      if (typeof obj[key] !== 'object') {
        filteredObject[key] = obj[key];
      }
    }
    filteredArray.push(filteredObject);
  });
  return filteredArray;
};

const filmSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmsData.pending, (state) => {
        state.loading = true;
        state.errorStatus = false;
        state.errorMessage = "";
      })
      .addCase(fetchFilmsData.fulfilled, (state, action) => {
        state.loading = false;
        state.films = excludeArraysAndObjects(action.payload);
        state.errorStatus = false;
        state.errorMessage = "";
      })
      .addCase(fetchFilmsData.rejected, (state, action) => {
        state.loading = false;
        state.errorStatus = action.errorStatus;
        state.errorMessage = action.errorMessage;
      });
  },
});


// Selectors
export const selectFilms = (state) => state.films.films;
export const selectFilmsLoading = (state) => state.films.loading;
export const selectFilmsError = (state) => state.films.error;

export const { reducer: filmReducer } = filmSlice;
export default filmSlice.reducer;
