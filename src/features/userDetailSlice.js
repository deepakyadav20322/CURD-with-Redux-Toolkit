import { createSlice,createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { json } from "react-router-dom";



//create action
export const createUser = createAsyncThunk('createUser',async (data,{rejectWithValue})=>{
   const response  = await fetch('https://64ce2a780c01d81da3ee912a.mockapi.io/curd',
   {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }
   );
try {
    const result = await response.json();
    return result;
    
} catch (error) {
    return rejectWithValue(error)
}
});

//read action 
export const showUser = createAsyncThunk('showUser',async(args,{rejectWithValue})=>{
const  responce = await fetch('https://64ce2a780c01d81da3ee912a.mockapi.io/curd',{
    method:"GET",
});
try {
    const result = await responce.json();
    return result;
} catch (error) {
    return rejectWithValue(error);
}
});

//delete action

export const deleteUser = createAsyncThunk(
    "deleteUser",
    async (id, { rejectWithValue }) => {
      const response = await fetch(
        `https://64ce2a780c01d81da3ee912a.mockapi.io/curd/${id}`,
        { method: "DELETE" }
      );
  
      try {
        const result = await response.json();
        console.log('gfggfgfgf:',result);
        return result;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

//   update action...

export const updateUser = createAsyncThunk('updateUser',async (data,{rejectWithValue})=>{

console.log("updated data", data);
    const response = await fetch(
      `https://64ce2a780c01d81da3ee912a.mockapi.io/curd/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
        const result = await response.json();
        return result;
      } catch (error) {
        return rejectWithValue(error);
      }
})



export const userDetail = createSlice({
    name:"userDetail",
    initialState:{
        users:[],
        loading:false,
        error:null,
        searchData:[]
    },
    reducers:{
        searchUser:(state,action)=>{
            console.log(action.payload);
            state.searchData = action.payload;

        }
    },
    extraReducers:{
       [createUser.pending]:(state) =>{
        state.loading = true;
       },
       [createUser.fulfilled]: (state,action)=>{
         state.loading = false;
         state.users.push(action.payload);
       },
       [createUser.rejected]:(state,action)=>{
        state.loading = false;
        state.users = action.payload;
       },
       [showUser.pending]:(state)=>{
        state.loading = true;
    },
    [showUser.fulfilled]: (state,action)=>{
        state.loading = false;
        state.users = (action.payload);
      },
      [showUser.rejected]:(state,action)=>{
       state.loading = false;
       state.users = action.payload;
      },
       
      [deleteUser.pending]: (state) => {
        state.loading = true;
      },
      [deleteUser.fulfilled]: (state, action) => {
        state.loading = false;

        const { id } = action.payload;
        
        if (id) {
          state.users = state.users.filter((ele) => ele.id !== id);
        }
        // console.log('Action-',action.payload)
      },
      [deleteUser.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },

      [updateUser.pending]: (state) => {
        state.loading = true;
      },
      [updateUser.fulfilled]: (state, action) => {
        state.loading = false;
        console.log('sdfsdfdfs',action.payload);
        state.users = state.users.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
      },
      [updateUser.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
    }
});

export default userDetail.reducer; 
export const { searchUser } = userDetail.actions;