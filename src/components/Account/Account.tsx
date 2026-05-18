import { useAuth } from "../../components/AuthContext/useAuth";
import s from "./Account.module.scss"
import { requestLogout } from "../../api/client";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { selectToken, selectUser } from "../../redux/auth/selectors";
import { apiLogout } from "../../redux/auth/authThunc";

function Account() {
  const navigate = useNavigate()
  // const { user, logout} = useAuth();
  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector(selectToken)
  const user = useSelector(selectUser)

  if (!token) return null;

  const onLogout = async () => {
    const data = await dispatch(apiLogout())
    localStorage.removeItem("basket")
    navigate("/login")
    return data
  }

  return (
    <div className={s.container}>
        <div className={s.accountBlock}>
            <h2>Account</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <button onClick={onLogout}>Log out</button>
        </div>
    </div>
  );
}

export default Account;