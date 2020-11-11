import React from 'react'

const retrieveIcons = (skills) => {
    let skillIcons = []
    skills.map(skill => {
        if (skill === "JavaScript") {
            let icon = <i className="fab fa-js-square fa-2x"></i>
            skillIcons.push(icon)
        } else if (skill === "Python") {
            let icon = <i className="fab fa-python fa-2x"></i>
            skillIcons.push(icon)
        } else if (skill === "HTML") {
            let icon = <i className="fas fa-code fa-2x"></i>
            skillIcons.push(icon)
        } else if (skill === "CSS") {
            let icon = <i className="fas fa-code fa-2x"></i>
            skillIcons.push(icon)
        } else if (skill === "React") {
            let icon = <i className="fas fa-code fa-2x"></i>
            skillIcons.push(icon)
        } else {
            let icon = <i className="far fa-file-code fa-2x"></i>
            skillIcons.push(icon)
        }
    })
    return skillIcons
}

export default retrieveIcons;