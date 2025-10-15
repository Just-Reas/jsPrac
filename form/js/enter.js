formElement = document.querySelector("form")
formElement.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        document.querySelector('.window__button').click()
    }
})