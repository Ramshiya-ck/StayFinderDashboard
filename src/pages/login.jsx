import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { axiosinstance } from '../config/axiosinstance'
import { FcGoogle } from "react-icons/fc"
import background from '/images/background.jpeg' // make sure image exists in public/images or src/images
import { AuthContext } from '../components/AuthHook/Authcontext'

export const Login = () => {
    const {login } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await axiosinstance.post('customer/login/', data)
            const token = response.data.data.access
            login(token)
            navigate('/')
            localStorage.setItem("admin_token", token)
            alert("user loggined")
        } catch (error) {
            console.log(error)
        }
    }

    const handleGoogleLogin = () => {
        console.log("Google login clicked")
    }

    return (
        <div
            className="flex justify-center items-center min-h-screen bg-center bg-cover relative overflow-hidden"
            style={{ backgroundImage: `url(${background})` }}
        >
            {/* Overlay for premium dim effect */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Decorative Circles */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>

            {/* Glassmorphism Card */}
            <div className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/30">
                <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow">
                    Welcome Back 👋
                </h2>
                <p className="text-center text-gray-200 mb-6 text-sm">
                    Login to explore and book your dream stay 🏨✨
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-200">Email</label>
                        <input
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email address'
                                }
                            })}
                            className="mt-1 block w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder-gray-300 shadow-sm focus:border-emerald-300 focus:ring-emerald-300 sm:text-sm"
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-300 mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-200">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 4, message: 'Password must be at least 4 characters' }
                            })}
                            className="mt-1 block w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder-gray-300 shadow-sm focus:border-emerald-300 focus:ring-emerald-300 sm:text-sm"
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-300 mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-white font-semibold 
                       shadow-lg hover:bg-emerald-500 hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2"
                    >
                        Login
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-white/30"></div>
                    <span className="px-3 text-gray-200 text-sm">or</span>
                    <div className="flex-grow border-t border-white/30"></div>
                </div>

                {/* Google Login */}
                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center w-full rounded-lg bg-white text-gray-700 font-medium px-4 py-2 shadow-md hover:bg-gray-100 transition duration-200"
                >
                    <FcGoogle className="mr-2 text-xl" />
                    Continue with Google
                </button>

                {/* Extra Links */}
                <p className="mt-6 text-center text-sm text-gray-200">
                    Don’t have an account?{' '}
                    <Link to='/register' className="text-emerald-200 hover:underline font-semibold">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}
