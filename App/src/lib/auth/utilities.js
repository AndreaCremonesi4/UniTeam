import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';

export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePassword = (password, minLength = 6) => {
    //password.value.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,}$')
    if(password.trim().length < minLength)
        return `La password deve contenere almeno ${minLength} caratteri`;
    else if(!password.match(/[a-z]/g))
        return 'La password deve contenere almeno una lettera minuscola';
    else if(!password.match(/[A-Z]/g))
        return 'La password deve contenere almeno una lettera maiuscola';
    else if(!password.match(/[0-9]/g))
        return 'La password deve contenere almeno un numero';
    else if(!password.match(/[ -/:-@[-`{-~]/g))
        return 'La password deve contenere almeno un carattere speciale';

    return null;
}

export const generateAvatar = (seed) => {
    const avatar = createAvatar(initials, {
        seed: seed
    });
    
    return avatar.toDataUriSync();
}