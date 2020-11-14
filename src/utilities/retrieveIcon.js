import React from 'react'

const retrieveIcon = (category) => {
    let categoryIcon
    if (category === "JavaScript") {
        let icon = <i className="fab fa-js-square fa-2x"></i>
        categoryIcon = icon
    } else if (category === "Python") {
        let icon = <i className="fab fa-python fa-2x"></i>
        categoryIcon = icon
    } else if (category === "HTML") {
        let icon = <i className="fab fa-html5"></i>
        categoryIcon = icon
    } else if (category === "CSS") {
        let icon = <i className="fab fa-css3-alt"></i>
        categoryIcon = icon
    } else if (category === "React") {
        let icon = <i className="fab fa-react"></i>
        categoryIcon = icon
    } else {
        let icon = <i className="fas fa-code"></i>
        categoryIcon = icon
    }
    return categoryIcon
}

export default retrieveIcon