// @see https://andrewlock.net/simple-obfuscation-of-email-addresses-using-javascript/

export const decodeEmail = function (encodedString: string) {
    // Holds the final output
    let email = ''

    // Extract the first 2 letters
    const keyInHex = encodedString.substr(0, 2)

    // Convert the hex-encoded key into decimal
    const key = parseInt(keyInHex, 16)

    // Loop through the remaining encoded characters in steps of 2
    for (let n = 2; n < encodedString.length; n += 2) {
        // Get the next pair of characters
        const charInHex = encodedString.substr(n, 2)

        // Convert hex to decimal
        const char = parseInt(charInHex, 16)

        // XOR the character with the key to get the original character
        const output = char ^ key

        // Append the decoded character to the output
        email += String.fromCharCode(output)
    }
    return email
}

export const encodeEmail = function (email: string, key: number) {
    // Hex encode the key
    const encodedKey = key.toString(16)

    // ensure it is two digits long
    let encodedString = make2DigitsLong(encodedKey)

    // loop through every character in the email
    for (let n = 0; n < email.length; n++) {
        // Get the code (in decimal) for the nth character
        const charCode = email.charCodeAt(n)

        // XOR the character with the key
        const encoded = charCode ^ key

        // Hex encode the result, and append to the output string
        const value = encoded.toString(16)
        encodedString += make2DigitsLong(value)
    }
    return encodedString
}

function make2DigitsLong (value: string) {
    return value.length === 1
        ? '0' + value
        : value
}
