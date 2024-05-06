
export default function LoginDetails() {
  // login details
  

  return (
    <div className='login-page'>
      <h1>Login Page</h1>
      <p>Welcome to Login Page</p>
      <div className='forms-container'>
        <form className='login-form'>
            <label className='login-label'>Email:</label><br />
            <input type="email" id='login' name='login' placeholder='Email'/><br/>
            <label className='login-label'>Password:</label><br />
            <input type="text" id='password' name='password' placeholder='Password'/>
        </form>
        <button>Login</button>
      </div>
    </div>
  )
}