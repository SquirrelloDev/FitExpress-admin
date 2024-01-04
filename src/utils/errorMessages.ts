const errorMessages = {
    required: 'Wymagane',
    invalidMail: 'To nie wygląda jak adres email',
    shortPasswd: (len: number) => `Hasło musi mieć conajmniej ${len} znaków`,
    minMax: (minVal: number, maxVal = 100) => `Wartość powinna być w zakresie ${minVal} - ${maxVal}`
}
export default errorMessages