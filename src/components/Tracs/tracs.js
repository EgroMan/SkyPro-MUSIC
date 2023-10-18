import "react-loading-skeleton/dist/skeleton.css";

import React, { useState } from "react";

import * as S from "./TrackStyle.js";


export function Tracks() {
    const [contentVisible, setContentVisible] = useState(false);
    setTimeout(() => {
      setContentVisible(true);
    }, 4000);

    return(
    <S.Centerblock__h2>{contentVisible ? <span>Tracks</span> : <span>Треки</span>}</S.Centerblock__h2>
    )}
