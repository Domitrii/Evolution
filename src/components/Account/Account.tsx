import { useAuth } from "../../components/AuthContext/useAuth";
import s from "./Account.module.scss"

function Account() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className={s.container}>
        <div className={s.accountBlock}>
            <h2>Account</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <button onClick={logout}>Log out</button>
        </div>
    </div>
  );
}

export default Account;