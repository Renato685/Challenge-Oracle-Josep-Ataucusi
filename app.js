function encodeText(text) {
    const replacements = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat'
    };

    return text.split('').map(char => replacements[char] || char).join('');
}

function decodeText(text) {
    const replacements = {
        'ai': 'a',
        'enter': 'e',
        'imes': 'i',
        'ober': 'o',
        'ufat': 'u'
    };

    let decodedText = '';
    let index = 0;

    while (index < text.length) {
        let found = false;

        for (let key in replacements) {
            if (text.startsWith(key, index)) {
                decodedText += replacements[key];
                index += key.length;
                found = true;
                break;
            }
        }

        if (!found) {
            decodedText += text[index];
            index++;
        }
    }

    return decodedText;
}

document.getElementById('btnEncrypt').addEventListener('click', () => {
    const userInput = document.getElementById('inputText').value;

    if (validateInput(userInput)) {
        const encryptedText = encodeText(userInput);
        displayResult(encryptedText);
    }
});

document.getElementById('btnDecrypt').addEventListener('click', () => {
    const userInput = document.getElementById('inputText').value;

    if (validateInput(userInput)) {
        const decryptedText = decodeText(userInput);
        displayResult(decryptedText);
    }
});

function displayResult(text) {
    document.getElementById('outputText').value = text;
    document.getElementById('outputText').style.height = '100%';
    document.getElementById('statusImage').style.display = 'none';
    document.getElementById('statusText').style.display = 'none';
    document.getElementById('btnCopy').style.visibility = 'visible';
}

function validateInput(text) {
    const invalidChars = /[^a-z\s]/;

    if (invalidChars.test(text)) {
        document.getElementById('errorText').textContent = 'Solo letras minúsculas y espacios.';
        setTimeout(() => {
            document.getElementById('errorText').textContent = '';
        }, 1500);
        return false;
    }

    return true;
}

document.getElementById('btnCopy').addEventListener('click', () => {
    const outputText = document.getElementById('outputText');

    outputText.select();
    document.execCommand('copy');

    document.getElementById('copyNotification').textContent = '¡Texto copiado!';
    setTimeout(() => {
        document.getElementById('copyNotification').textContent = '';
    }, 1500);
});
