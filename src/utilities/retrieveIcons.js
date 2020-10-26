import React from 'react'

const retrieveIcons = (skills) => {
    let skillIcons = []
    skills.map(skill => {
        if (skill === "JavaScript") {
            let icon = <i class="fab fa-js-square fa-2x"></i>
            skillIcons.push(icon)
        } else if (skill === "Python") {
            let icon = <i class="fab fa-python fa-2x"></i>
            skillIcons.push(icon)
        } else if (skill === "HTML") {
            let icon = <i class="fas fa-code fa-2x"></i>
            skillIcons.push(icon)
        } else {
            let icon = <i class="far fa-file-code fa-2x"></i>
            skillIcons.push(icon)
        }
    })
    return skillIcons
}

export default retrieveIcons;