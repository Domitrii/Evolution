import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./Login.module.scss";
import * as Yup from "yup";
import type { LogInRequest } from "../../types/api";
import { NavLink, useNavigate } from "react-router-dom";
import PageTitle from "../../helper/PageTitle";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { apiLogin } from "../../redux/auth/authThunc";


const UserSignUpSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(8).max(50).required("Password is not success"),
})

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()

    const INITIAL_FORM_DATA = {
        email: "",
        password: ""
    }

    const handleSubmit = async (data:LogInRequest, {resetForm}:{resetForm:() => void}) => {
        const result = await dispatch(apiLogin(data))
        if (apiLogin.fulfilled.match(result)){
            navigate("/account")
        }
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