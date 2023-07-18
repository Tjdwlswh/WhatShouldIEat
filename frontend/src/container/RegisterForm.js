//회원가입 구현, redux와 componets 연결, props로 정보 전달
//로그인, 회원가입후 뒤로가기 했을때 input값 초기화
import React,{ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm } from "../modules/auth";
import AuthForm from "../components/auth/AuthForm";

const RegisterForm = () => {

    const dispatch = useDispatch()
    const {form} = useSelector((state)=>({
        form: state.auth.register
    }))
    const onChange = (e) => {
        const {value, name} = e.target;
        dispatch(
            changeField({
                form : "register",
                key : name,
                value
            })
        )
    }
    
    const onSubmit = e => {
        e.preventDefault()
    }

    useEffect(()=>{
        dispatch(initializeForm('register'))
    }, [dispatch])

    return(
        <AuthForm
        type="register"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        />
    )
}

export default RegisterForm