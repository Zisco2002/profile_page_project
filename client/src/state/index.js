import {createSlice} from '@reduxjs/toolkit'

const initialState={
    uesr:null,
    token:null,
    activites:[],
    mode:'light'
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin:(state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
        },
        setLogout:(state)=>{
            state.user=null;
            state.token=null;
        },
        setActivies:(state,action)=>{
            state.activites=action.payload.activites;
        },
        setActiviy:(state,action)=>{
            const updateActivies = state.activites.map((activity)=>{
                if (activity.id === action.payload.activity.id) return action.payload.activity
                return activity
            })
            state.activites=updateActivies
        }
    }
})

export const { setMode,setLogin,setLogout,setActivies,setActiviy} =authSlice.actions
export default authSlice.reducer