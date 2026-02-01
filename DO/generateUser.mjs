function generateUserID(length) {

    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let randomLetters = "";
    let randomNumbers = "";

    let combinedResult = "";

        for (i = 0; i < length; i++){
            randomLetters += alphabet.charAt(Math.floor(Math.random() * alphabet.length));

            randomNumbers += Math.ceil(Math.random() * length);

            combinedResult += randomLetters + randomNumbers;
            
        }

    return randomLetters + randomNumbers;
}

generateUserID(3);