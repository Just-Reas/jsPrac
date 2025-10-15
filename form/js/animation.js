document.addEventListener("DOMContentLoaded",function(){

    const windowIn = document.querySelectorAll('input')

    windowIn.forEach(input => {
        input.addEventListener("focusin", () => {
            input.style.border = '2px solid var(--neon-color) !important'
        })
        
        input.addEventListener("focusout", () => {
            input.style.border = '2px solid var(--white-color) !important'
        })
    })

})