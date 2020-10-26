import React from 'react'

const SignupForm = () => {
    return (
        <form className="form">
            <div className="form-item">
                <label htmlFor="">Username</label>
                <input type="text"/>
            </div>
            <div className="form-item">
                <label htmlFor="">Email Address</label>
                <input type="text"/>
            </div>
            <div className="form-item">
                <label htmlFor="">Password</label>
                <input type="text"/>
            </div>
            <div className="form-item">
                <label htmlFor="">Confirm password</label>
                <input type="text"/>
            </div>
            <button className="btn">Sign up</button>

        </form>
    )
}

export default SignupForm