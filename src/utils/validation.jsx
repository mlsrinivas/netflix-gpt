
export const validateInput = (email, password) => {

    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,})$/
    const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

    if(!emailRegex.test(email)) return 'Email not valid';
    if(password.length < 1) return 'Password is manditory'
    // if(!passwordFormat.test(password)) return 'Password not valid';

    return null
}