import { useState } from "react";
import useGlobalState from "../../hooks/useGlobalState";
import { observer } from "mobx-react-lite";

function LoginForm() {
  const { store } = useGlobalState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
   {
    !store.isAuth ? <>
         <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="text"
        placeholder="Password"
      />

      <button onClick={() => store.login(email, password)}>Login</button>
      <button onClick={() => store.registration(email, password)}>
        Registration
      </button>
    </> : <button onClick={() => store.logout()}>Logout</button>
   }
    </div>
  );
}

export default observer(LoginForm);
