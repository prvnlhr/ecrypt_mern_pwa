var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const formValidation = (formData) => {
    const { firstName, lastName, email, password, confirmPassword } = formData;
    let res = {
        message: undefined,
        error: false,
    };
    if (!firstName) {
        res.message = 'Enter first name';
        res.error = true;
    }
    else if (!lastName) {
        res.message = 'Enter last name';
        res.error = true;


    } else if (!email.match(validRegex)) {
        res.message = 'Not a valid email id';
        res.error = true;
    }
    else if (!password) {
        res.message = 'Enter password';
        res.error = true;

    }
    else if (!confirmPassword) {
        res.message = 'Confirm your password';
        res.error = true;


    }
    else if ((password !== confirmPassword)) {
        res.message = 'Passwords does not match';
        res.error = true;
    }
    else if (password.length < 6) {
        res.message = 'Password nust be atleast 6 characters long';
        res.error = true;
    }
    console.log(res);
    return res;
}



export const validateSignUpForm = ({ firstName, lastName, email, password, confirmPassword }) => {

    let errors = [];

    let res = {
        message: undefined,
        error: false,
    };

    if (!firstName) {
        errors.push("First name is required.");
        res.message = 'First name is required.';
        res.error = true;
    }
    else if (!lastName) {
        errors.push("Last name is required.");
        res.message = 'Last name is required.';
        res.error = true;
    }
    else if (!email) {
        errors.push("Email is required.");
        res.message = 'Email is required.';
        res.error = true;
    } else if (!email.match(validRegex)) {
        errors.push("Email must be a valid address.");
        res.message = 'Email must be a valid address.';
        res.error = true;
    }
    else if (!password) {
        errors.push("Password is required.");
        res.message = 'Password is required.';
        res.error = true;
    } else if (password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
        res.message = 'Password must be at least 8 characters long.';
        res.error = true;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)) {
        errors.push("Password must contain at least one uppercase letter, one lowercase letter, one number and one special character");
        res.message = 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character';
        res.error = true;
    }
    else if (!confirmPassword) {
        errors.push("Confirm password is required.");
        res.message = 'Confirm password is required.';
        res.error = true;
    } else if (password !== confirmPassword) {
        errors.push("Passwords do not match.");
        res.message = 'Passwords do not match.';
        res.error = true;
    }


    return res;
}

export const validateSignInForm = ({ email, password }) => {

    let errors = [];

    let res = {
        message: undefined,
        error: false,
    };
    // console.log(email, password);

    if (!email) {
        errors.push("Email is required.");
        res.message = 'Email is required.';
        res.error = true;
    } else if (!email.match(validRegex)) {
        errors.push("Email must be a valid address.");
        res.message = 'Email must be a valid address.';
        res.error = true;
    }
    else if (!password) {
        errors.push("Password is required.");
        res.message = 'Password is required.';
        res.error = true;
    } else if (password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
        res.message = 'Password must be at least 8 characters long.';
        res.error = true;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)) {
        errors.push("Password must contain at least one uppercase letter, one lowercase letter, one number and one special character");
        res.message = 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character';
        res.error = true;
    }

    return res;
}


export const validateResetPassForm = ({ password, confirmPassword }) => {

    let errors = [];

    let res = {
        message: undefined,
        error: false,
    };

    if (!password) {
        errors.push("Password is required.");
        res.message = 'Password is required.';
        res.error = true;
    } else if (password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
        res.message = 'Password must be at least 8 characters long.';
        res.error = true;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)) {
        errors.push("Password must contain at least one uppercase letter, one lowercase letter, one number and one special character");
        res.message = 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character';
        res.error = true;
    }
    else if (!confirmPassword) {
        errors.push("Confirm password is required.");
        res.message = 'First name is required.';
        res.error = true;
    } else if (password !== confirmPassword) {
        errors.push("Passwords do not match.");
        res.message = 'Passwords do not match.';
        res.error = true;
    }
    return res;
}

export const validateChangePassForm = ({ password, newPassword }) => {

    let errors = [];

    let res = {
        message: undefined,
        error: false,
    };

    if (!password) {
        errors.push("Old Password is required.");
        res.message = 'Old Password is required.';
        res.error = true;
    }
    else if (!newPassword) {
        errors.push("New password is required.");
        res.message = 'New password is required.';
        res.error = true;
    }
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(newPassword)) {
        errors.push("Password must contain at least one uppercase letter, one lowercase letter, one number and one special character");
        res.message = 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character';
        res.error = true;
    }

    return res;
}
