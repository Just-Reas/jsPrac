"use strict"

function saveFormData() {
    const formData = {
        username: document.querySelector('[data-js-user]')?.value || '',
        email: document.querySelector('[data-js-email]')?.value || '',
        password: document.querySelector('[data-js-password]')?.value || '',
        password_repeat: document.querySelector('[data-js-password-repeat]')?.value || ''
    }
    localStorage.setItem('registrationFormData', JSON.stringify(formData))
}

function loadFormData() {
    const savedData = localStorage.getItem('registrationFormData')
    if (savedData) {
        const formData = JSON.parse(savedData)
        const usernameInput = document.querySelector('[data-js-user]')
        const emailInput = document.querySelector('[data-js-email]')
        const passwordInput = document.querySelector('[data-js-password]')
        const passwordRepeatInput = document.querySelector('[data-js-password-repeat]')
        
        if (usernameInput) usernameInput.value = formData.username || ''
        if (emailInput) emailInput.value = formData.email || ''
        if (passwordInput) passwordInput.value = formData.password || ''
        if (passwordRepeatInput) passwordRepeatInput.value = formData.password_repeat || ''
        
        if (usernameInput && formData.username) usernameInput.dispatchEvent(new Event('input'))
        if (emailInput && formData.email) emailInput.dispatchEvent(new Event('input'))
        if (passwordInput && formData.password) passwordInput.dispatchEvent(new Event('input'))
        if (passwordRepeatInput && formData.password_repeat) passwordRepeatInput.dispatchEvent(new Event('input'))
    }
}

function clearFormData() {
    localStorage.removeItem('registrationFormData')
}

function initFormAutoSave() {
    const usernameInput = document.querySelector('[data-js-user]')
    const emailInput = document.querySelector('[data-js-email]')
    const passwordInput = document.querySelector('[data-js-password]')
    const passwordRepeatInput = document.querySelector('[data-js-password-repeat]')
    
    if (usernameInput) {
        usernameInput.addEventListener('input', saveFormData)
    }
    if (emailInput) {
        emailInput.addEventListener('input', saveFormData)
    }
    if (passwordInput) {
        passwordInput.addEventListener('input', saveFormData)
    }
    if (passwordRepeatInput) {
        passwordRepeatInput.addEventListener('input', saveFormData)
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadFormData()
    initFormAutoSave()
})

function clearOnSuccess() {
    clearFormData()
}

// загуглил
window.formStorage = {
    saveFormData,
    loadFormData,
    clearFormData,
    clearOnSuccess
}