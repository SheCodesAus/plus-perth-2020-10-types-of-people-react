import React from 'react'

const PostEventForm = () => {
    return (
        <form className="form">
            <div className="form-item">
                <label htmlFor="">Event Name</label>
                <input type="text"/>
            </div>
            <div className="form-item">
                <label htmlFor="">Description</label>
                <input type="text"/>
            </div>
            <div className="form-item">
                <label htmlFor="">Image</label>
                <input type="text"/>
            </div>
            <div className="form-item">
                <label htmlFor="">Event Date</label>
                <input type="text"/>
            </div>
            <div className="form-item">
                <label htmlFor="">Location</label>
                <input type="text"/>
            </div>
            <div className="form-item">
                <label htmlFor="">Category</label>
                <input type="text"/>
            </div>
            <button className="btn">Post Event</button>

        </form>
    )
}

export default PostEventForm