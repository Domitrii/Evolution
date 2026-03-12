import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./SignUp.module.scss";
import * as Yup from "yup";
import { requestSignUp } from "../../api/client";
import type { RegisterRequest } from "../../types/api";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/useAuth";
import PageTitle from "../../helper/PageTitle";


const UserSignUpSchema = Yup.object().shape({
  name: Yup.string().notRequired(),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(8).max(50).required("Password is not success"),
  repeatPassword: Yup.string().oneOf([Yup.ref("password")], "Password must match").required("It's not like your password")
});

function SignUp() {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    
    const onSignUp = async (formData:RegisterRequest) => {
        const data = await requestSignUp(formData);
        console.log(data)
        if(data){
            setAuth(data);
            navigate("/account");
        }
    }

    const INITIAL_FORM_DATA = {
        name: "",
        email: "",
        password: "",
        repeatPassword: ""
    }

    const handleSubmit = (data:RegisterRequest, {resetForm}:{resetForm:() => void}):void => {
        onSignUp(data)
        resetForm()
    }

  return (
    <div className={s.container}>
        <PageTitle>SignUp</PageTitle>
        <div className={s.signUpSec}>
        <Formik initialValues={INITIAL_FORM_DATA} validationSchema={UserSignUpSchema} onSubmit={handleSubmit}>
            <Form className={s.signUpForm}>
                <h2>Sign Up</h2>
                <label>
                    <h3>Name</h3>
                    <div>
                        <Field type="text" name="name" className={s.field} />
                    </div>
                        <ErrorMessage name="name" component="span" className={s.errorMsg} />
                </label>
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
                <label>
                    <h3>Repeat Password</h3>
                    <div>
                        <Field type="password" name="repeatPassword" className={s.field} />
                    </div>
                        <ErrorMessage name="repeatPassword" component="span" className={s.errorMsg} />
                </label>
                <button className="authButton" type="submit">
                    Sign Up
                </button>
                <div className={s.toSignUp}>
                    <p>Already have an account?</p>
                    <NavLink to="/login">Log In</NavLink>
                </div>
            </Form>
        </Formik>
        </div>
    </div>
  )
}

export default SignUp