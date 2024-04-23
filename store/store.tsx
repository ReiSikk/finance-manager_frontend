import { configureStore } from '@reduxjs/toolkit'
import { categorySlice } from './CategorySlice'
import { entrySlice } from './EntrySlice'
import { userSlice } from './UserSlice'

export const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    entry: entrySlice.reducer,
    user: userSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch