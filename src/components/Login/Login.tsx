import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./Login.module.scss";
import * as Yup from "yup";
import { requestLogin } from "../../api/client";
import type { LogInRequest } from "../../types/api";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/useAuth";
import PageTitle from "../../helper/PageTitle";


const UserSignUpSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(8).max(50).required("Password is not success"),
})

function Login() {

    const navigate = useNavigate();
    const { setAuth } = useAuth();
    
    const onLogin = async (formData:LogInRequest) => {
        const data = await requestLogin(formData);
        console.log(data)
        if(data) {
            setAuth(data);
            navigate("/account")
        }
    }

    const INITIAL_FORM_DATA = {
        email: "",
        password: ""
    }

    const handleSubmit = (data:LogInRequest, {resetForm}:{resetForm:() => void}):void => {
        onLogin(data)
        resetForm()
    }

  return (
    <div className={s.container}>
        <PageTitle>Login</PageTitle>
        <div className={s.loginSec}>
        <Formik initialValues={INITIAL_FORM_DATA} validationSchema={UserSignUpSchema} onSubmit={handleSubmit}>
            <Form className={s.loginForm}>
                <h2>Log In</h2>
                <label>
                    <h3>Email</h3>
                    <div>
                        <Field type="text" name="email" className={s.field} />
                    </div>
                        <ErrorMessage name="email" component="span" className={s.errorMsg} />
                </label>
                <label>
                    <h3>Password</h3>
                    <div>
                        <Field type="password" name="password" className={s.field} />
                    </div>
                        <ErrorMessage name="password" component="span" className={s.errorMsg} />
                </label>
                <button className={`authButton ${s.submitBtn}`} type="submit">
                    Log In
                </button>
                <div className={s.toSignUp}>
                    <p>Don't have an account?</p>
                    <NavLink to="/signup">Sign Up</NavLink>
                </div>
            </Form>
        </Formik>
        </div>
    </div>
  )
}

export default Login