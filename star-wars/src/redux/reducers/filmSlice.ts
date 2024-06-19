import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from '../store';

interface Film {
  title: string;
  director: string;
  producer: string;
  release_date: string;
  [key: string]: any; 
}

interface FilmState {
  films: Partial<Film>[];
  loading: boolean;
  errorStatus: boolean;
  errorMessage: string;
}


const initialState: FilmState = {
  films: [],
  loading: false,
  errorStatus: false,
  errorMessage: "",
};

export const fetchFilmsData = createAsyncThunk<Film[], string[]>(
  'films/fetchData',
  async (filmUrls: string[]) => {
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
  }
);



const excludeArraysAndObjects = (arr: Film[]): Partial<Film>[] => {
  return arr.map(obj => {
    const filteredObject: Partial<Film> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && typeof obj[key] !== 'object') {
        filteredObject[key] = obj[key];
      }
    }
    return filteredObject;
  });
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
      .addCase(fetchFilmsData.fulfilled, (state, action: PayloadAction<Film[]>) => {
        state.loading = false;
        state.films = excludeArraysAndObjects(action.payload);
        state.errorStatus = false;
        state.errorMessage = "";
      })
      .addCase(fetchFilmsData.rejected, (state, action) => {
        state.loading = false;
        state.errorStatus = true;
        state.errorMessage = action.error.message || 'Failed to fetch films';
      });
  },
});

// Selectors
export const selectFilms = (state: RootState) => state.filmReducer?.films;
export const selectFilmsLoading = (state: RootState) => state.filmReducer?.loading;
export const selectFilmsError = (state: RootState) => state.filmReducer?.errorStatus;

export const { reducer: filmReducer } = filmSlice;
export default filmSlice.reducer;


