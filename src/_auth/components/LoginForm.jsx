import { useForm, Controller } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { LoginUserService } from '../../api/service';
// components
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { useContext, useState } from 'react';
import { TokenContext } from '../../context/TokenContext';


const LoginForm = () => {
  const [checked, setChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { setToken } = useContext(TokenContext)

  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
      remember: false
    }
  })

  const onSubmit= async data => {
    setIsLoading(true)
    const body = {
      KULLANICIKOD: data.username,
      SIFRE: data.password,
    }
    try {
      const response = await LoginUserService(body);
      console.log(response)
      if (!!response.data.accessToken) {
        setToken(response.data?.accessToken)
        localStorage.setItem('token', response.data?.accessToken)
        const expirationTime = new Date();
        expirationTime.setHours(23, 59, 5, 9);
        localStorage.setItem("tokenExpiration", expirationTime);
        navigate('/')
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='form'>
      <img src="/assets/images/ats_pro_logo.png" alt="ats logo" />
      <Controller
        name='username'
        control={control}
        render={({ field }) => <InputText type='text' placeholder='Username' {...field} />}
      />
      <Controller
        name='password'
        control={control}
        render={({ field }) => <InputText type='password' placeholder='Password' {...field} />}
      />
      <div className='flex justify-content-end w-full'>
        <div>
          <Link to={''}>Forgot Password?</Link>
        </div>
      </div>

      <Button label={isLoading ? "Loading" : "Submit"} className='login-btn' onClick={handleSubmit(onSubmit)} />
    </div>
  )
}

export default LoginForm
