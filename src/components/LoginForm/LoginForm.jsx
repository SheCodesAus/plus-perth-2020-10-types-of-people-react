import React from 'react'

const LoginForm = () => {
    return (
        <form className="form">
            <div className="form-item">
                <label htmlFor="">Username</label>
                <input type="text"/>
            </div>
            <div className="form-item">
                <label htmlFor="">Password</label>
                <input type="text"/>
            </div>
            <button className="btn">Log in</button>
        </form>
    )
}

export default LoginForm