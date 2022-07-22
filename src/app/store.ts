import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import sessionReducer from "../features/session/sessionSlice";
import snackbarReducer from "../features/snackbar/snackbarSlice";
import titlesReducer from "../features/titles/titlesSlice";
import todoReducer from "../features/todo/todoSlice";

export const store = configureStore({
   reducer: {
      counter: counterReducer,
      session: sessionReducer,
      snackbar: snackbarReducer,
      titles: titlesReducer,
      todo: todoReducer,
   },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;
