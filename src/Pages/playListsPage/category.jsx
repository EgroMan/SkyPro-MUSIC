import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";


export const Text__h1 = styled.h1`

color: black;
font-style: normal;
font-weight: 400;
font-size: 64px;
line-height: 72px;
letter-spacing: -0.8px;
position: absolute;
margin-left: auto;
margin-right: auto;
left: 0;
right: 0;
text-align: center;
top: 50%;
}
`
export const Text__decor = styled.h2`
margin-top:50px;
color: red;
font-style: normal;
font-weight: 400;
font-size: 64px;
line-height: 72px;
letter-spacing: -0.8px;
position: absolute;
margin-left: auto;
margin-right: auto;
left: 0;
right: 0;
text-align: center;
top: 50%;
&:hover{
    color: green;
}
}
`
const arr =[
{id:1,
listName: `Лист дня` },
{id:2,
listName: `100 лучших песен`},
{id:3,
listName: `Инди`  },
]

export function PlayListPage (){
const param = useParams()
console.log(param.id)
let list = arr.find((el)=> el.id === Number(param.id))
console.log(list)

    return(
    <div>
    <Text__h1>Страница плейлистов: <Text__decor>{list.listName}</Text__decor> </Text__h1>
    </div>
    
    )
}