

export default function RegisterDetails() {
  // register details
  

  return (
    <div className='login-container'>
      <h1>Register</h1>
      <p>Welcome to Register Page</p>
      <div className='forms-container'>
        <form className='login-form'>
            <input type="text" id='fname' name='username' placeholder='First Name'/><br/>
            <input type="text" id='lname' name='lastname' placeholder='Last Name'/><br/>
            <input type="tel" id='phone' name='phone' placeholder='Mobile Number' pattern="09[0-9]{9}" required/><br/>
            <input type="email" id='email' name='email' placeholder='Email Address'/><br/>
            <input type="text" id='password' name='password' placeholder='Password'/><br/>
            <input type="text" id='confirmpassword' name='confirmpassword' placeholder='Confirm Password'/><br/>
        </form>
            <button>Register</button>
      </div>
    </div>
  )
}