import styled from "styled-components";



export const displayYes = styled.ul`
display:flex;
flex-direction: column;
gap: 20px;
  top: 50px;
  border-radius: 12px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 24px;
  padding-top:24px;
  min-width: 248px;
  min-height:305px;
  background: #313131;
  position: absolute;
  bottom: -90px;
  left: -5px;
  z-index: 100;
`;


export const displayYesScroll = styled.div`
&::-webkit-scrollbar-track{
  background:wite};

overflow-y:scroll;
overflow-x:hidden;
scrollbar-color:wite;
display:flex;
flex-direction: column;
gap: 20px;
`
export const displayYesYar = styled.ul`
overflow-y:auto;
overflow-x:hidden;
display:flex;
flex-direction: column;
gap: 10px;
  top: 50px;
  border-radius: 10px;
  padding-left: 20px;
  min-width: 220px;
  height:fit-content;
  background: #313131;
  position: absolute;
  bottom: -90px;
  left: -5px;
  z-index: 100;
`;
export const centralBlockFilter = styled.div`
  gap: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 51px;
  box-sizing: border-box;
  align-items: baseline;
  min-width: 400px;
  height: 40px;
`;
export const centralBlockFilterTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-right: 15px;
`;
export const centralBlockFilterButton = styled.button`


background:${(props) =>(props.stylepropsauthor==='author'? "rgb(58, 17, 58)" : "black") } ;

  color: white;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #ffffff;
  border-radius: 60px;
  padding: 6px 20px;
  &:focus {
    background-color: rgb(58, 17, 58);
  }
 
  &:not(:last-child) {
    margin-right: 10px;
  }
`;


export const centralBlockFilterButtonYear = styled.button`



background:${(props) =>(props.stylepropsyear==='year'? "rgb(58, 17, 58)" : "black") } ;

  color: white;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #ffffff;
  border-radius: 60px;
  padding: 6px 20px;
  &:focus {
    background-color: rgb(58, 17, 58);
  }
 
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

export const centralBlockFilterButtonGenre = styled.button`
background:${(props) =>(props.stylepropsgenre==='genre'? "rgb(58, 17, 58)" : "black") } ;
  color: white;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #ffffff;
  border-radius: 60px;
  padding: 6px 20px;
  &:focus {
    background-color: rgb(58, 17, 58);
  }
  &:not(:last-child) {
    margin-right: 10px;
  }
`;




export const filterBlockPerformer = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
export const filterBlockYear = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  
`;
export const filterBlockStyle = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
export const filterBlockLink = styled.a`
color: aliceblue;
&:hover{
  text-decoration: underline;
&:focus{
  color:rgb(223, 20, 223)
}  
`;
export const styleFilterUl = styled.ul`

&::-webkit-scrollbar-track{
background:wite};
overflow-y:scroll;
overflow-x:hidden;
scrollbar-color:wite;
display:${(props) =>(props.isactive === "style" ? "block" : "none") };
overflow-y:scroll;
top: 50px;
border-radius: 10px;
padding-top: 10px;
padding-left: 20px;
min-width: 248px;
min-height: 180px;
max-height: 305px;
background: #313131;
position: absolute;
bottom: -90px;
left:-5px;
z-index: 100;
}  
`;

export const styleFilterH2Dot = styled.h2`
color: wite;
background-color: #AD61FF;
width:25px;
height:25px;
top:231px;
left:512px;
border-radius:25px;
font-size:18px;
font-weight:normal;
text-align:center; 
`;
export const styleDotDiv = styled.div`

`;