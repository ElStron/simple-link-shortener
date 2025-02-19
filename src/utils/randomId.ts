export function generateCryptoId(minLength = 5, maxLength = 7) {
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);
  
    const id = Array.from(randomValues)
      .map(value => value.toString(36))
      .join('');
  
    return id.substring(0, length);
}