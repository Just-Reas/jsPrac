"use strict"

function validateEmail(email) {
    const emailRegex = /^[^\s@<>{}[\]]+@[^\s@<>{}[\]]+\.[^\s@<>{}[\]]+$/
    
    if (!emailRegex.test(email)) {
        return {
            isValid: false,
            message: 'Некорректный формат email. Пример: example@domain.com'
        }
    }
    
    const [localPart, domain] = email.split('@')
    
    if (localPart.length < 1) {
        return {
            isValid: false,
            message: 'Email должен содержать текст перед @'
        }
    }
    
    if (domain.length < 3 || !domain.includes('.')) {
        return {
            isValid: false,
            message: 'Некорректная доменная часть email'
        }
    }
    
    const domainParts = domain.split('.')
    if (domainParts.length < 2 || domainParts[domainParts.length - 1].length < 2) {
        return {
            isValid: false,
            message: 'Некорректный домен в email'
        }
    }
    
    return {
        isValid: true,
        message: 'Email корректен'
    }
}

function setupEmailValidation() {
    const emailInput = document.querySelector('[data-js-email]')
    
    if (!emailInput) {
        console.error('Поле email не найдено на странице')
        return
    }
    
    const emailContainer = document.createElement('div')
    emailContainer.className = 'input-container'

    const containerStyles = {
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
    }

    Object.assign(emailContainer.style, containerStyles)
    
    const emailHelp = document.createElement('div')
    emailHelp.className = 'input-help-tooltip'

    const helpStyles = {
        fontSize: '12px',
        fontFamily: 'Arial, sans-serif',
        marginLeft: '10px',
        padding: '5px 8px',
        backgroundColor: 'var(--black-color)',
        border: '1px solid var(--black-color)',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxWidth: '200px',
        minWidth: '150px',
        wordWrap: 'break-word',
        whiteSpace: 'normal',
        lineHeight: '1.4',
        display: 'none',
        position: 'absolute',
        left: '100%',
        top: '0',
        zIndex: '1000'
    }
    
    Object.assign(emailHelp.style, helpStyles)
    
    emailInput.parentNode.insertBefore(emailContainer, emailInput)
    emailContainer.appendChild(emailInput)
    emailContainer.appendChild(emailHelp)

    // взял из нейронки т.к. не знал вообще как делать адаптив в js
    function updateEmailTooltipPosition() {
        const isMobile = window.innerWidth < 576
        
        if (isMobile) {
            emailHelp.style.left = '0'
            emailHelp.style.top = '-100%'
            emailHelp.style.marginLeft = '0'
            emailHelp.style.marginBottom = '5px'
        } else {
            emailHelp.style.left = '100%'
            emailHelp.style.top = '0'
            emailHelp.style.marginLeft = '10px'
            emailHelp.style.marginBottom = '0'
        }
    }
    // до сюда
    
    updateEmailTooltipPosition()

    // взял из инета 'resize' т.к. не знал как менять размер окна
    window.addEventListener('resize', updateEmailTooltipPosition)
    //
    
    emailInput.addEventListener('input', function() {
        //взял из инета this.value
        const email = this.value.trim()
        
        if (email.length === 0) {
            emailHelp.style.display = 'none'
            this.style.borderColor = ''
            return
        }
        
        const result = validateEmail(email)
        emailHelp.textContent = result.message
        emailHelp.style.display = 'block'
        
        if (result.isValid) {
            emailHelp.style.color = 'var(--green-color)'
            emailHelp.style.borderColor = 'var(--green-color)'
            emailHelp.style.backgroundColor = 'var(--black-color)'
            this.style.borderColor = 'var(--green-color)'
        } else {
            emailHelp.style.color = 'var(--red-color)'
            emailHelp.style.borderColor = 'var(--red-color)'
            emailHelp.style.backgroundColor = 'var(--black-color)'
            this.style.borderColor = 'var(--red-color)'
        }
    })
    
    emailInput.addEventListener('blur', function() {
        setTimeout(() => {emailHelp.style.display = 'none'}, 200)
    })
    
    emailInput.addEventListener('focus', function() {
        if (this.value.trim()) {emailInput.dispatchEvent(new Event('input'))}
    })
}

function isPasswordStrong(password) {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars
}

function validatePasswordRealTime(password, passwordRepeat) {
    const errors = []
    
    if (password.length === 0) {
        return { isValid: null, message: "" }
    }
    
    if (password.length < 8) {
        errors.push("минимум 8 символов")
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("заглавные буквы")
    }
    if (!/[a-z]/.test(password)) {
        errors.push("строчные буквы")
    }
    if (!/\d/.test(password)) {
        errors.push("цифры")
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push("спецсимволы")
    }
    
    if (passwordRepeat && password !== passwordRepeat) {
        errors.push("пароли не совпадают")
    }
    
    return {
        isValid: errors.length === 0,
        message: errors.length > 0 ? "Не хватает: " + errors.join(", ") : "Пароль надежен!"
    }
}

function openModal(errorText) {
    const title = document.getElementById("modal__title__id")
    const modal = document.querySelector('.error__modal')
    const modalText = document.querySelector('.modal__text')

    if (!title || !modal || !modalText) {
        console.error('Не найдены элементы модального окна')
        return
    }

    modal.style.display = 'flex'
    title.textContent = 'Error'
    modalText.textContent = errorText
    modal.style.border = "6px solid var(--red-color)"
    title.style.color = 'var(--red-color)'
    modalText.style.color = 'var(--red-color)'
}

function openModalSuccess(successText) {
    const title = document.getElementById("modal__title__id")
    const modal = document.querySelector('.error__modal')
    const modalText = document.querySelector('.modal__text')

    if (!title || !modal || !modalText) {
        console.error('Не найдены элементы модального окна')
        return
    }

    modal.style.display = 'flex'
    title.textContent = 'Success'
    modalText.textContent = successText
    modal.style.border = "6px solid var(--green-color)"
    title.style.color = 'var(--green-color)'
    modalText.style.color = 'var(--green-color)'
}

function handleButtonClick(event) {
    event.preventDefault()
    
    const formElement = document.querySelector('form')
    if (!formElement) {
        console.error('Форма не найдена')
        return
    }
    
    const loginInputElement = formElement.username
    const emailInputElement = formElement.email
    const passwordInputElement = formElement.password
    const passwordrepInputElement = formElement.password__repeat

    function validatePasswords() {
        const password = passwordInputElement.value
        const passwordRepeat = passwordrepInputElement.value
        
        if (!isPasswordStrong(password)) {
            openModal('The password must contain at least 8 characters and include uppercase and lowercase letters, numbers, and special characters')
            return false
        }
        
        if (password !== passwordRepeat) {
            openModal('passwords dont match')
            return false
        }

        return true
    }
    
    if (!loginInputElement.value || !emailInputElement.value || !passwordInputElement.value || !passwordrepInputElement.value) {
        openModal('All fields must be filled')
        return
    }

    if (loginInputElement.value.length < 4) {
        openModal('Login length should be bigger than 4')
        return
    }
    
    const emailValidation = validateEmail(emailInputElement.value)
    if (!emailValidation.isValid) {
        openModal(emailValidation.message)
        return
    }
    
    if (!validatePasswords()) {
        return 
    }

    console.log({
        username: loginInputElement.value,
        email: emailInputElement.value,
        password: passwordInputElement.value,
        passwordRepeat: passwordrepInputElement.value
    })

    openModalSuccess('Registration done!')

    setTimeout(() => {
        const currentUrl = new URL(window.location.href)
        currentUrl.searchParams.set('success', 'true')
        window.location.href = currentUrl.toString()
    }, 3000)


    if (window.formStorage && window.formStorage.clearOnSuccess) {
        window.formStorage.clearOnSuccess()
    }

}

document.addEventListener('DOMContentLoaded', function() {
    
    const submitButton = document.querySelector('.window__button')
    if (submitButton) {
        submitButton.addEventListener('click', handleButtonClick)
    } else {
        console.error('Кнопки нет')
    }
    
    setupRealTimePasswordValidation()
    setupEmailValidation()
})

document.querySelector('.error__modal').addEventListener('click', function(event) {
    event.preventDefault()
    const modal = document.querySelector('.error__modal')
    modal.style.display = 'none'
})

function setupRealTimePasswordValidation() {
    const passwordInput = document.querySelector('[data-js-password]')
    const passwordRepeatInput = document.querySelector('[data-js-password-repeat]')

    if (!passwordInput || !passwordRepeatInput) {
        console.error('Поля пароля не найдены на странице')
        return
    }

    const passwordContainer = document.createElement('div')
    const passwordRepeatContainer = document.createElement('div')
    passwordContainer.className = 'input-container'
    passwordRepeatContainer.className = 'input-container'
    
    const containerStyles = {
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
    }
    
    Object.assign(passwordContainer.style, containerStyles)
    Object.assign(passwordRepeatContainer.style, containerStyles)

    const passwordHelp = document.createElement('div')
    const passwordRepeatHelp = document.createElement('div')
    passwordHelp.className = 'input-help-tooltip'
    passwordRepeatHelp.className = 'input-help-tooltip'
    
    const helpStyles = {
        fontSize: '12px',
        fontFamily: 'Arial, sans-serif',
        marginLeft: '10px',
        padding: '5px 8px',
        backgroundColor: 'var(--black-color)',
        border: '1px solid var(--black-color)',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxWidth: '200px',
        minWidth: '150px',
        wordWrap: 'break-word',
        whiteSpace: 'normal',
        lineHeight: '1.4',
        display: 'none',
        position: 'absolute',
        left: '100%',
        top: '0',
        zIndex: '1000'
    }
    
    Object.assign(passwordHelp.style, helpStyles)
    Object.assign(passwordRepeatHelp.style, helpStyles)

    passwordInput.parentNode.insertBefore(passwordContainer, passwordInput)
    passwordRepeatInput.parentNode.insertBefore(passwordRepeatContainer, passwordRepeatInput)
    
    passwordContainer.appendChild(passwordInput)
    passwordRepeatContainer.appendChild(passwordRepeatInput)
    
    passwordContainer.appendChild(passwordHelp)
    passwordRepeatContainer.appendChild(passwordRepeatHelp)

    function updateTooltipPosition() {
        const isMobile = window.innerWidth < 576
        
        if (isMobile) {
            passwordHelp.style.left = '0'
            passwordHelp.style.top = '-100%'
            passwordHelp.style.marginLeft = '0'
            passwordHelp.style.marginBottom = '5px'
            
            passwordRepeatHelp.style.left = '0'
            passwordRepeatHelp.style.top = '-100%'
            passwordRepeatHelp.style.marginLeft = '0'
            passwordRepeatHelp.style.marginBottom = '5px'
        } else {
            passwordHelp.style.left = '100%'
            passwordHelp.style.top = '0'
            passwordHelp.style.marginLeft = '10px'
            passwordHelp.style.marginBottom = '0'
            
            passwordRepeatHelp.style.left = '100%'
            passwordRepeatHelp.style.top = '0'
            passwordRepeatHelp.style.marginLeft = '10px'
            passwordRepeatHelp.style.marginBottom = '0'
        }
    }

    updateTooltipPosition()
    window.addEventListener('resize', updateTooltipPosition)

    passwordInput.addEventListener('input', function() {
        const result = validatePasswordRealTime(this.value, '')
        
        if (result.isValid === null) {
            passwordHelp.style.display = 'none'
            this.style.borderColor = ''
        } else {
            passwordHelp.textContent = result.message
            passwordHelp.style.display = 'block'
            
            if (result.isValid) {
                passwordHelp.style.color = 'var(--green-color)'
                passwordHelp.style.borderColor = 'var(--green-color)'
                passwordHelp.style.backgroundColor = 'var(--black-color)'
                this.style.borderColor = 'var(--green-color)'
            } else {
                passwordHelp.style.color = 'var(--red-color)'
                passwordHelp.style.borderColor = 'var(--red-color)'
                passwordHelp.style.backgroundColor = 'var(--black-color)'
                this.style.borderColor = 'var(--red-color)'
            }
        }
        
        if (passwordRepeatInput.value) {
            passwordRepeatInput.dispatchEvent(new Event('input'))
        }
    })
    
    passwordRepeatInput.addEventListener('input', function() {
        const password = passwordInput.value
        const result = validatePasswordRealTime(password, this.value)
        
        if (this.value.length === 0) {
            passwordRepeatHelp.style.display = 'none'
            this.style.borderColor = ''
        } else {
            passwordRepeatHelp.style.display = 'block'
            
            if (result.isValid) {
                passwordRepeatHelp.textContent = "Пароли совпадают"
                passwordRepeatHelp.style.color = 'var(--green-color)'
                passwordRepeatHelp.style.borderColor = 'var(--green-color)'
                passwordRepeatHelp.style.backgroundColor = 'var(--black-color)'
                this.style.borderColor = 'var(--green-color)'
            } else {
                passwordRepeatHelp.textContent = result.message.includes("не совпадают") ? 
                    "Пароли не совпадают" : "Сначала введите надежный пароль"
                passwordRepeatHelp.style.color = 'var(--red-color)'
                passwordRepeatHelp.style.borderColor = 'var(--red-color)'
                passwordRepeatHelp.style.backgroundColor = 'var(--black-color)'
                this.style.borderColor = 'var(--red-color)'
            }
        }
    })

    passwordInput.addEventListener('blur', function() {
        setTimeout(() => {
            passwordHelp.style.display = 'none'
        }, 200)
    })
    
    passwordRepeatInput.addEventListener('blur', function() {
        setTimeout(() => {
            passwordRepeatHelp.style.display = 'none'
        }, 200)
    })

    passwordInput.addEventListener('focus', function() {
        if (this.value) {
            passwordInput.dispatchEvent(new Event('input'))
        }
    })
    
    passwordRepeatInput.addEventListener('focus', function() {
        if (this.value) {
            passwordRepeatInput.dispatchEvent(new Event('input'))
        }
    })

    if (passwordInput.value) {
        passwordInput.dispatchEvent(new Event('input'))
    }
    if (passwordRepeatInput.value) {
        passwordRepeatInput.dispatchEvent(new Event('input'))
    }
}