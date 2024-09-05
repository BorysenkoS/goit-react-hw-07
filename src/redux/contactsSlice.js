import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, deleteContact } from "./contactsOps";

// const INITIAL_STATE = {
//   items: [],
//   loading: false,
//   error: null,
// };

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload.id
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { addContact } = contactsSlice.actions;

// export const contactReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case "contact/add": {
//       return {
//         ...state,
//         contacts: [...state.contacts, action.payload],
//       };
//     }
//     case "contact/delete": {
//       return {
//         ...state,
//         contacts: state.contacts.filter(
//           (contact) => contact.id !== action.payload
//         ),
//       };
//     }
//     default:
//       return state;
//   }
// };

// export const addContact = (payload) => {
//   return {
//     type: "contact/add",
//     payload: payload,
//   };
// };

// export const deleteContact = (contactId) => {
//   return {
//     type: "contact/delete",
//     payload: contactId,
//   };
// };
