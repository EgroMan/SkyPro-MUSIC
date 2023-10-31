import { Link, useNavigate } from "react-router-dom";
import * as S from "./AuthPage.styles";
import React, { useEffect, useState } from "react";
import { login, registration } from "../../api";

export default function AuthPage({isLoginMode, setIsLoginMode, setUser}) {
  const [error, setError]=useState(null)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [placeholderUser, setPlaceholderUser]  = useState('Почта');
  const [placeholderPass, setPlaceholderPass]  = useState('Пароль');
  const [placeholderRepeat, setPlaceholderRepeat]  = useState('Повторите пароль')
  const navigate=useNavigate()
  const [buttonActive, setButtonActive] = useState(false);
  

  const handleLogin = async ({ email, password }) => {
    setButtonActive(true)

    let responseOk=false;
    
    login(email,password).then((response)=>{
      setButtonActive(false)
      if (response.ok){
      let data = response.json()
      responseOk=true
      return(data)
    }
    else{
      let data = response.json()
      console.log('err')
      return(data)
    }})
    .then((data)=>{       
      if (!responseOk){
        setError(data.detail)
      }else{
      localStorage.setItem('userName',data.username)
      if(responseOk===true){
      setTimeout(
      setUser(true),1000)}
      navigate("/",{replace:true})
      alert(`Выполняется вход: ${email} ${password}`);
    }
    })
  };
  const handleRegister = async () => {
    let responseOk=false;
    setButtonActive(true)
    if (email===""||password===""||repeatPassword===""){
      setPlaceholderPass('заполните поле ввода')
      setPlaceholderUser('заполните поле ввода')
      setPlaceholderRepeat('заполните поле ввода')
      setError('не заполнены поля ввода')
      setButtonActive(false)
      }
    else{
      if(password!==repeatPassword){
        setError('пароли не совпадают')
        setButtonActive(false)
      }else{
    registration(email,password,email)
    
    .then((response)=>{console.log(response.status)
      setButtonActive(false)
      if(!response.ok){
      responseOk=false
      let data = response.json()
      return data
      }
    responseOk= true;
    let data = response.json()
    return data})

    .then((data)=>{
      console.log(data)
      if(!responseOk){
      let errArr=[]
      errArr.push(data.username,data.email,data.password)
      let index = errArr.indexOf(undefined)
      errArr.splice(index,1)
      console.log(errArr)
      let errString = errArr.join(' / ')
      console.log(errString);setError(errString); 
      setError(errString)
      }else{
        setTimeout(
        setUser(true),1000)
        console.log('entering...')
        navigate("/",{replace:true})
        localStorage.setItem('userName',data.username)
      }
    })}
  }
  };
  useEffect(() => {
    setError(null);
  }, [isLoginMode, email, password, repeatPassword]);

  return (
    <S.PageContainer>
      <S.ModalForm>
        <Link to="/login">
          <S.ModalLogo>
            <S.ModalLogoImage src="/logo_modal.png" alt="logo" />
          </S.ModalLogo>
        </Link>
        {isLoginMode ? (
          <>
            <S.Inputs>
              <S.ModalInput
                type="text"
                name="login"
              placeholder={placeholderUser}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <S.ModalInput
                type="password"
                name="password"
                placeholder={placeholderPass}
                value={password}
                onChange={(event) => {
                setPassword(event.target.value);
                }}
              />
            </S.Inputs>
            {error && <S.Error>{error}</S.Error>}
            <S.Buttons>
            
              <S.PrimaryButton  disabled={buttonActive} onClick={() => { handleLogin({ email, password });
              }}>{buttonActive? 'заходим...':'войти' }
              </S.PrimaryButton>
              <Link onClick={()=>setIsLoginMode(false)} to="/login">
                <S.SecondaryButton>Зарегистрироваться</S.SecondaryButton>
              </Link>
            </S.Buttons>
          </>
        ) : (
          <>
            <S.Inputs>
              <S.ModalInput
                type="text"
                name="login"
                placeholder={placeholderUser}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <S.ModalInput
                type="password"
                name="password"
                placeholder={placeholderPass}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <S.ModalInput
                type="password"
                name="repeat-password"
                placeholder={placeholderRepeat}
                value={repeatPassword}
                onChange={(event) => {
                  setRepeatPassword(event.target.value);
                }}
              />
            </S.Inputs>
            {error && <S.Error>{error}</S.Error>}
            <S.Buttons>
              <S.PrimaryButton disabled={buttonActive} onClick={handleRegister}>
              {buttonActive? 'Регистрируемся...':'Зарегистрироваться' }
              </S.PrimaryButton>
            </S.Buttons>
          </>
        )}
      </S.ModalForm>
    </S.PageContainer>
  );
}