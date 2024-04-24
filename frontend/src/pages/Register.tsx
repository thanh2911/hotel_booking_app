import { useForm } from "react-hook-form";

export type RegisterFormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

const Register = () => {

    const { register, watch, handleSubmit, formState: {errors}} = useForm<RegisterFormData>();

    const onSubmit = handleSubmit((data) => {
        console.log({data});
        
    })

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Create an Account</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <label htmlFor=""   
                    className="text-gray-700 text-sm font-bold flex-1"
                >
                    First Name
                    <input 
                        className="border rounded w-full py-1 px-2 font-normal" 
                        {...register("firstName", {required: "This field is requied"})}
                    />

                    {errors.firstName && (
                        <span className="text-red-500">{errors.firstName.message}</span>
                    )}
                </label>

                <label htmlFor="" 
                    className="text-gray-700 text-sm font-bold flex-1"
                >
                    Last Name
                    <input 
                        className="border rounded w-full py-1 px-2 font-normal" 
                        {...register("lastName", {required: "This field is requied"})}
                    />
                    {errors.lastName && (
                        <span className="text-red-500">{errors.lastName.message}</span>
                    )}
                </label>
            </div>
                <label htmlFor="" 
                    className="text-gray-700 text-sm font-bold flex-1 flex-col"
                >
                    Email
                    <input 
                        type="email"
                        className="border rounded w-full py-1 px-2 font-normal" 
                        {...register("email", {required: "This field is requied"})}
                    />
                    {errors.email && (
                        <span className="text-red-500">{errors.email.message}</span>
                    )}
                </label>

                <label htmlFor="" 
                    className="text-gray-700 text-sm font-bold flex-1"
                >
                    Password
                    <input 
                        type="password"
                        className="border rounded w-full py-1 px-2 font-normal" 
                        {...register("password", {
                            required: "This field is requied",
                            minLength:{
                                value: 6,
                                message: "Password must be at least 6 characters"
                            
                            }
                        })}
                    />

                    {errors.password && (
                        <span className="text-red-500">{errors.password.message}</span>
                    )}
                </label>

                <label htmlFor="" 
                    className="text-gray-700 text-sm font-bold flex-1"
                >
                    Confirm Password
                    <input 
                        type="password"
                        className="border rounded w-full py-1 px-2 font-normal" 
                        {...register("confirmPassword", {
                            validate: (val) => {
                                if(!val){
                                    return "This field is requied"
                                } else if(watch("password") !== val) {
                                    return "Your password do no match"
                                }
                            }
                        })}
                    />

                    {errors.confirmPassword && (
                        <span className="text-red-500">{errors.confirmPassword.message}</span>
                    )}
                </label>

            <span>
                <button 
                    type="submit"
                    className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
                    Create Account
                </button>
            </span>

           

        </form>
    )
};

export default Register ;