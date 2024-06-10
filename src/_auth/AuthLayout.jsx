import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUserService } from '../api/service'
import { setItemWithExpiration } from '../utils/expireToken'
import { Button, Input, Spin } from 'antd'
import ErrorAlert from '../_root/components/alert/ErrorAlert'
import SuccessAlert from '../_root/components/alert/SuccessAlert'


const AuthLayout = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)

    const navigate = useNavigate()

    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const onSubmit = async (data) => {
        setIsLoading(true)
        const body = {
            KULLANICIKOD: data.username,
            SIFRE: data.password,
        }

        try {
            const response = await LoginUserService(body)
            if (response?.data.accessToken) {
                setIsSuccess(true)
                setItemWithExpiration("token", response?.data.accessToken, 24, response?.data.siraNo)
                navigate("/")
            }
        } catch (error) {
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="login">
            {/* alert messages */}
            {isSuccess && <SuccessAlert />}
            {isError && <ErrorAlert />}

            <div className="grid h-full">
                <div className="col-span-6 p-10 login-card">
                    <img src="/images/ats_pro_logo.png" alt="ats logo" className='login-logo-img self-center' />
                    <div>
                        <div className='mt-20'>
                            <Controller
                                name='username'
                                control={control}
                                rules={{ required: 'Kullanıcı adı girilmemişdir.' }}
                                render={({ field }) => <Input {...field} placeholder='Kullanıcı adı' className={errors.username ? 'border-red-500' : null} />}
                            />
                            {errors.username && <span className='error-message'>{errors.username.message}</span>}
                        </div>
                        <div className='mt-20 mb-10'>
                            <Controller
                                name='password'
                                control={control}
                                rules={{ required: 'Şifre girilmemişdir.' }}
                                render={({ field }) => <Input {...field} placeholder='Şifre' type='password' className={errors.username ? 'border-red-500' : null} />}
                            />
                            {errors.password && <span className='error-message'>{errors.password.message}</span>}
                        </div>
                        <div className='flex justify-end mb-10'>
                            <Link to={''} className='login-forget-link'>Forgot Password?</Link>
                        </div>
                        <Button type="submit" onClick={handleSubmit(onSubmit)} className='login-btn btn mt-6'>{isLoading ? <Spin className='text-white' /> : "Giriş"}</Button>
                    </div>
                </div>
                <div className='login-bg-image col-span-6' />
            </div>
        </div>
    );
};

export default AuthLayout;


// password pattern --> pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
// username pattern --> pattern: /^[a-zA-Z0-9_]+$/