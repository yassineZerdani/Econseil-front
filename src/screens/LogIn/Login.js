import React, { useState } from 'react';
import { logIn } from '../../auth/logIn';
import { getUserId } from '../../auth/getUserId';
import './Login.css';


export default function Login() {
  
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await logIn({
      username,
      password
    });
    const token = data.data.csrf_token;
    localStorage.setItem('token', token);
    localStorage.setItem('user', await getUserId(data.data.current_user.name));
    window.location.reload();
  }

  return(
		<div class="container h-100">
			<div class="row justify-content-md-center h-100" style={{marginTop: '15%'}}>
				<div class="card-wrapper" style={{width: '33%'}}>
					<div class="card fat" >
						<div class="card-body">
							<h4 class="card-title" style={{textAlign: 'center'}}>Login</h4>
							<form onSubmit={handleSubmit}>
								<div class="form-group">
									<label for="username">Nom d'utilisateur</label>
									<input id="username" type="username" class="form-control" onChange={e => setUserName(e.target.value)} required autofocus />
									<div class="invalid-feedback">
										Invalide
									</div>
								</div>

								<div class="form-group">
									<label for="password">Mot de passe
									</label>
									<input id="password" type="password" class="form-control" onChange={e => setPassword(e.target.value)} required data-eye />
								    <div class="invalid-feedback">
								    	Entrer le mot de passe
							    	</div>
								</div>

								<div class="form-group">
									<div class="custom-checkbox custom-control">
										<input type="checkbox" name="remember" id="remember" class="custom-control-input" />
										<label for="remember" class="custom-control-label">Rester Connecter</label>
									</div>
								</div>

								<div class="form-group m-0">
									<button type="submit" class="btn btn-primary btn-block" style={{background: 'rgb(226, 64, 15)', borderColor: 'transparent'}}>
										Login
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}