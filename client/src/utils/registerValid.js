const registervalid = ({username,email,password,cf_password}) =>{
	const err = {};

	if(!username){
		err.username = "Please add your username."
	}

	if(!email){
		err.email = "Please add your email."
	}else if (!validateEmail(email)) {
		err.email = "Please provide a valid email"
	}

	if(!password){
		err.password = "Please add your password."
	}else if (password.length < 6) {
		err.password = "Password must be atleast 6 characters long"
	}	

	if(password !==cf_password){
		err.cf_password = "Password does not match"
	}

	return {
		errMsg:err,
		errLength:Object.keys(err).length
	}	

}


function validateEmail(email) {
	// eslint-disable-next-line
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default registervalid;