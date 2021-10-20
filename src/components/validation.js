//import React from 'react'
const validation = (value) => {
    let errors={};
    if(!value.username){
        errors.username="username is required."
    }
	if(!value.username){
		errors.fullname="name is required"
	}
    if(!value.email){
        errors.email="email is required."
    } //else if(!/\S+@\S+\.\S+/.test(value.email)){
      else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.email)){
        errors.email="email is invalid."
    }
    if(!value.phone){
        errors.phone="contact is required."
    }
        else if(value.phone.length < 10){
        errors.phone="contact must contain ten digits."
    }    
    if(!value.password){
        errors.password="password is required."
    }else if(value.password.length < 5){
        errors.password="password must be more than five characters."
    }
    return errors;
   /* return (
        <div>

        </div>
    )*/
}
export default validation;