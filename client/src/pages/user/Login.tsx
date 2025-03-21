import React from "react";
import { useForm } from "react-hook-form";
import { loginApi } from "../../services/userApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/TypedHooks";
import { userLogin } from "../../store/slices/UserSlice";

export type FormValues = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const navigate = useNavigate()
    const dispatcher = useAppDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await loginApi(data)
            if (response?.status === 200) {
                const { data } = response
                dispatcher(userLogin(data.data))
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Success!",
                    text: "Login successful.",
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true,
                }).then(() => {
                    navigate("/");
                });
            }

        } catch (err) {
            console.log("Login Error:", err);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error!",
                text: (err as Error)?.message || "Something went wrong. Please try again.",
                showConfirmButton: true,
                confirmButtonText: "OK",
                timer: 3000,
                toast: true,
            });
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: "22rem" }}>
                <h2 className="text-center mb-4">Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Email Field */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address",
                                },
                            })}
                            placeholder="you@example.com"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        />
                        {errors.email && (
                            <div className="invalid-feedback">{errors.email.message}</div>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            placeholder="Enter password"
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password.message}</div>
                        )}
                    </div>

                    {/* Login Button */}
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>

                    {/* Signup Button */}
                    <a href="/signup" className="d-block text-center mt-3">
                        <button type="button" className="btn btn-secondary w-100">
                            Signup for a new account
                        </button>
                    </a>
                </form>
            </div>
        </div>
    );
};

export default Login;
