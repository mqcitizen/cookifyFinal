import React, {useContext, useState} from 'react';
import {GlobalContext} from '../context/Provider';
import registerUser from '../context/actions/auth/registerUser';
import RegisterComponent from '../components/RegisterComponent';

const Register = () => {
  const [form, setForm] = useState({});
  const [isloading, setIsLoading] = useState(false);
  const {authDispatch} = useContext(GlobalContext);

  const onSubmit = () => {
    if (form.name && form.email && form.password) {
      setIsLoading(true);
      registerUser(form)(authDispatch);
    }
  };

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  return (
    <RegisterComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      isloading={isloading}
      setIsLoading={setIsLoading}
    />
  );
};

export default Register;
