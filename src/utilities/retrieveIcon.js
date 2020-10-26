import React from 'react'

const retrieveIcon = (category) => {
    let categoryIcon
    if (category === "JavaScript") {
        let icon = <i class="fab fa-js-square fa-2x"></i>
        categoryIcon = icon
    } else if (category === "Python") {
        let icon = <i class="fab fa-python fa-2x"></i>
        categoryIcon = icon
    } else if (category === "HTML") {
        let icon = <i class="fas fa-code fa-2x"></i>
        categoryIcon = icon
    } else {
        let icon = <i class="far fa-file-code fa-2x"></i>
        categoryIcon = icon
    }
    return categoryIcon
}

export default retrieveIcon