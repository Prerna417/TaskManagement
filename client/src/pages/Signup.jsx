import React from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import Textbox from "../components/Textbox"
import Button from "../components/Button"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { useRegisterMutation } from "../redux/slices/api/authApiSlice"
import Loading from "../components/Loader"

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [signup, { isLoading }] = useRegisterMutation()

    const submitHandler = async (data) => {
        try {
            const result = await signup(data).unwrap()

            toast.success("User created successfully!")
            navigate("/log-in")
        } catch (error) {
            console.log(error)
            toast.error(error?.data?.message || error.message)
        }
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
            <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">

                {/* left side */}
                <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
                    <div className="w-full md:max-w-lg flex flex-col items-center justify-center gap-5">
                        <span className="flex gap-1 py-1 px-3 border rounded-full text-sm border-gray-300 text-gray-600">
                            Create your account now!
                        </span>

                        <p className="flex flex-col gap-0 text-4xl md:text-6xl font-black text-center text-blue-700">
                            <span>Join Task</span>
                            <span>Manager</span>
                        </p>
                    </div>
                </div>

                {/* right side */}
                <div className="w-full md:w-1/3 p-4 flex flex-col justify-center items-center">
                    <form
                        onSubmit={handleSubmit(submitHandler)}
                        className="form-container w-full md:w-[400px] flex flex-col gap-y-6 bg-white px-10 pt-10 pb-10"
                    >
                        <div>
                            <p className="text-blue-600 text-3xl font-bold text-center">
                                Create Account
                            </p>
                            <p className="text-center text-base text-gray-700">
                                Fill details to register
                            </p>
                        </div>

                        <div className="flex flex-col gap-y-4">

                            <Textbox
                                placeholder="Full Name"
                                type="text"
                                name="name"
                                label="Name"
                                className="w-full rounded-full"
                                register={register("name", {
                                    required: "Name is required!",
                                })}
                                error={errors.name?.message}
                            />

                            <Textbox
                                placeholder="email@example.com"
                                type="email"
                                name="email"
                                label="Email"
                                className="w-full rounded-full"
                                register={register("email", {
                                    required: "Email is required!",
                                })}
                                error={errors.email?.message}
                            />

                            <Textbox
                                placeholder="password"
                                type="password"
                                name="password"
                                label="Password"
                                className="w-full rounded-full"
                                register={register("password", {
                                    required: "Password is required!",
                                })}
                                error={errors.password?.message}
                            />

                            <Textbox
                                placeholder="Role"
                                type="text"
                                name="role"
                                label="Role"
                                className="w-full rounded-full"
                                register={register("role")}
                            />

                            <Textbox
                                placeholder="Title"
                                type="text"
                                name="title"
                                label="Title"
                                className="w-full rounded-full"
                                register={register("title")}
                            />

                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    {...register("isAdmin")}
                                />
                                Register as Admin
                            </label>

                            {isLoading ? (
                                <Loading />
                            ) : (
                                <>
                                    <Button
                                        type="submit"
                                        label="Sign Up"
                                        className="w-full h-10 bg-blue-700 text-white rounded-full"
                                    />

                                    <p
                                        onClick={() => navigate("/log-in")}
                                        className="text-sm text-blue-600 hover:underline cursor-pointer text-center"
                                    >
                                        Already have an account? Login
                                    </p>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup