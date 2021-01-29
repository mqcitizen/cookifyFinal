import React, {useContext, useState} from 'react';
import {GlobalContext} from '../context/Provider';
import loginUser from '../context/actions/auth/loginUser';
import LoginComponent from '../components/LoginComponent';

const Login = () => {
  const [form, setForm] = useState({});

  const {authDispatch} = useContext(GlobalContext);

  const onSubmit = () => {
    if (form.email && form.password) {
      loginUser(form)(authDispatch);
    }
  };

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  return <LoginComponent onSubmit={onSubmit} onChange={onChange} form={form} />;
};

export default Login;
