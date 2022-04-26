import React, { useState } from "react";
import logo from "../../img/logo.jpg"
import { logInWithEmailAndPassword, signInWithGoogle } from "../../service/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  return (


    <div class="container " style={{ marginTop: "7em" }} >
     
      <div class="row vh-100 justify-content-around ">
        <div class="col-sm-2 ">
          <img src={logo} width="500px" />
        </div>
        <div class="col-sm-4 ">
          <div class="row vh-100 justify-content-around text-center ">
            <div class="col-sm-10 ">
              
                <h1 class="text-center">UVEUPLOAD</h1>
                <div class="input-group p-2">
                  <input type="email" class="form-control" value={email} 
                  onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div class="input-group p-2">
                  <input type="password" class="form-control" value={password}
                    onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña"/>
                </div>
                <div class="input-group p-2">
                  <button onClick={() => logInWithEmailAndPassword(email, password)} 
                  class="w-100 btn btn-lg btn-success">Iniciar sesión</button>

                </div>
                <div class="input-group p-2">
                  <button class="w-100 btn btn-lg btn-primary" 
                  onClick={signInWithGoogle} >Iniciar sesión con GOOGLE</button>

                </div>
                
              
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
export default Login;