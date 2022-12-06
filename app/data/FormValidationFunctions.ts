
export function validazioneCampoMail(input: FormDataEntryValue) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) {
        return true;
    } else {
        return null;

    }
}
export function validazioneCampoPassword(input: FormDataEntryValue) {
    console.log('test',);
    if (input.trim().length < 8 || !input.length) {
        return null;
    } else {
        return true;
    }
}
export function validazionePasswordControllo(input1: FormDataEntryValue, input2: FormDataEntryValue) {
    console.log(input1.length);

    if ((input1 !== input2) || !input1.length) {
        return false
    } else {
        return null
    }
}