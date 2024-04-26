import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Entry } from '../entities/entry'
import { CreateCategoryDTO } from '../entities/CreateCategoryDTO'
import { CreateEntryDTO } from '../entities/CreateEntryDTO'
import { EntryQueries } from '../api/EntryQueries'

export interface EntryState {
  entries: Entry[]
}

const initialState: EntryState = {
  entries: [],
}


// First, create the thunk
export const fetchEntries = createAsyncThunk(
    'fetchEntries',
    async (thunkAPI) => {
      return await EntryQueries.fetchAll();
    },
  )


  export const createEntry = createAsyncThunk(
    'createEntry',
    async (entry: CreateEntryDTO, thunkAPI) => {
      console.log("createEntry in EntrySlice called with:", entry);
      return await EntryQueries.createEntry(entry)
    },
  )
  



export const entrySlice = createSlice({
  name: 'entry',
  initialState,
  reducers: {
  // i need to push the new category to the state
       addEntry: (state, action: PayloadAction<Entry>) => {
        state.entries.push(action.payload)
        }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchEntries.fulfilled, (state, action) => {
      // Add user to the state array
      
      state.entries = action.payload;
    //   state.entities.push(action.payload)
    }),
    builder.addCase(createEntry.fulfilled, (state, action) => {
        // Add user to the state array
        console.log("createEntry.fulfilled in EntrySlice called with:", action.payload);
        
        state.entries.push(action.payload)
      //   state.entities.push(action.payload)
      })
}
})

// Action creators are generated for each case reducer function
// ACTIONS
export const {  } = entrySlice.actions

export default entrySlice.reducer