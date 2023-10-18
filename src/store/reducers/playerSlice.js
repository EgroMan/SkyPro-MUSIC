import { createSlice, current } from "@reduxjs/toolkit";
import { useState } from "react";

const playerSlice = createSlice({

    name:'player',
   
    initialState:{
        activeTrack:[],
        tracks:[],
        trackTime:0
        

       
    },
    reducers:{

        setTrackRedux(state, action){
            state.activeTrack = action.payload.track
            state.tracks = action.payload.tracks
            setInterval()
         },
       
        setNextRedux(state){
           
            let next = state.activeTrack.id-7
            
            
            if (next-state.tracks.length===0){state.activeTrack = state.tracks[0]}else{
            state.activeTrack = state.tracks[next]}
    
        },
        setPrevRedux(state){
           
            let prev = state.activeTrack.id-9
            let prevId =state.tracks.length-1
             if (prev<=0){
                state.activeTrack = state.tracks[prevId]}
          
            else{state.activeTrack = state.tracks[prev]}
    
        }
       
    }
        
})

        

export const{setTrackRedux,setNextRedux,setPrevRedux}=playerSlice.actions

export default playerSlice.reducer;
