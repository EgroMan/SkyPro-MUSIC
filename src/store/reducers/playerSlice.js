import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getAllTracksRedux = createAsyncThunk(
  'player/getAllTracksRedux',
  async function(_,{rejectWithValue}){

    try {
      const response = await fetch('https://skypro-music-api.skyeng.tech/catalog/track/all/');
      if (!response.ok){
          
          throw new Error('server error getAllTracksRedux ')
      
      }
const newData = await response.json()
newData.forEach((el, index)=> {
el.id =index+8})
let data = newData

return data

} catch (error) {return rejectWithValue(error.message)
  }
  })

export const likeTrackRedux = createAsyncThunk(
  'player/likeTrackRedux',
  async function(id,{rejectWithValue,dispatch}){
    const accessToken = localStorage.getItem('access')
    try {
      const response = await fetch(`https://skypro-music-api.skyeng.tech/catalog/track/${id}/favorite/`,
      {
          
        method: "POST",
        headers: {
        Authorization: `Bearer ${accessToken}`,
},
})
  console.log(response)
      if (!response.ok){
          
          throw new Error('server error Необходима авторизация')
      
      }
  } catch (error) {return rejectWithValue(error.message)
      
  }
  }
)

const playerSlice = createSlice({
  name: "player",

  initialState: {
    activeTrack: [],
    tracks: [],
    tempTracks: [],
    myTracks: [],
    trackProgressTime: [],
    trackTime: [],
    playerOn: false,
    shuffle: false,
    repeat: false,
    status:null,
    error:null,
    searchResults:[],
    searchBase:[]
  },
  extraReducers:{
[likeTrackRedux.pending]:(state,action)=>{state.status='loading'; state.error=null;}, //pending загрузка
[likeTrackRedux.fulfilled]:(state,action)=>{state.status='resolved';}, //fulfilled получены данные
[likeTrackRedux.rejected]:(state,action) =>{state.status='rejected';state.error=action.payload}, //rejected ошибка
[getAllTracksRedux.fulfilled]:(state,action)=>{state.status='resolved';state.tracks=action.payload; console.log(state.tracks)} //fulfilled получены данные
  },
  reducers: {
setSearchResults(state, action){
  state.searchResults = action.payload
  state.tracks = action.payload
  // console.log(state.searchResults);
  // console.log(state.tracks)
},
    setTrackRedux(state, action) {
      state.activeTrack = action.payload.track;
      state.tracks = action.payload.tracks;
      state.tempTracks = action.payload.tracks;
      
      // console.log(state.tracks);
      // console.log(state.myTracks);
    },
    setTracksRedux(state, action) {
      
      state.tracks = action.payload
      state.searchBase = action.payload;
      // console.log(state.searchBase);
    },
    setNextRedux(state, action) {
      let next = state.activeTrack.id - 7;
      if (state.tracks.length > 1) {
        if (next - state.tracks.length === 0) {
          {
            state.activeTrack =
              state.tracks[state.tracks.length - state.tracks.length];
          }
        } else {
          state.activeTrack = state.tracks[next];
        }
      } else {
        state.activeTrack = state.tracks[state.tracks.length - 1];
      }
    },
    setPrevRedux(state) {
      let prev = state.activeTrack.id - 9;
      let prevId = state.tracks.length - 1;
      if (state.tracks.length > 1) {
        if (prev < 0) {
          state.activeTrack = state.tracks[prevId];
        } else {
          state.activeTrack = state.tracks[prev];
        }
      } else {
        state.activeTrack = state.tracks[state.tracks.length - 1];
      }
    },
    setProgressRedux(state, action) {
      let next = state.activeTrack.id - 7;
      state.trackProgressTime = action.payload;
      let deltaTime =
        Math.round((state.trackTime - state.trackProgressTime) * 100) / 100;
      if ((deltaTime <= 1) & (state.repeat === false)) {
        if (next - state.tracks.length === 0) {
          state.activeTrack =
            state.tracks[state.tracks.length - state.tracks.length];
          console.log(state.activeTrack);
        } else {
          if (state.repeat === true) {
            
            state.activeTrack = state.activeTrack;
          } else {
            
            state.activeTrack = state.tracks[next];
          }
        }
      }
    },
    setTimeRedux(state, action) {
      state.trackTime = action.payload;
      // console.log(state.trackTime);
    },
    setShuffleRedux(state) {
      state.shuffle = true;
      state.tracks = state.tracks.sort(() => Math.random() - 0.5);
      // console.log(state.tempTracks);
    },
    setNotShuffleRedux(state) {
      state.shuffle = false;
      state.tracks = state.tempTracks;
      // console.log(state.tracks);
    },
    setOnDotRedux(state) {
      state.playerOn = true;
      // console.log(state.playerOn);
    },
    setOffDotRedux(state) {
      state.playerOn = false;
      // console.log(state.playerOn);
    },
    setCycleRedux(state) {
      if (state.repeat === false) {
        state.repeat = true;
        // console.log(state.repeat);
      } else {
        state.repeat = false;
        // console.log(state.repeat);
      }
    },
    setMyTracksRedux(state, action) {
      state.myTracks = action.payload;
      // console.log(state.myTracks);
    },
    
  },
});

export const {
  setTrackRedux,
  setNextRedux,
  setPrevRedux,
  setProgressRedux,
  setTimeRedux,
  setShuffleRedux,
  setNotShuffleRedux,
  setOnDotRedux,
  setOffDotRedux,
  setCycleRedux,
  setMyTracksRedux,
  setLikedStatusRedux,
  setTrackIsLiked,
  setTracksRedux,
  setSearchResults
} = playerSlice.actions;

export default playerSlice.reducer;