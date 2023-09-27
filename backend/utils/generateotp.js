
const generateOtp = async() => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`
        return otp
    } catch (error) {
        throw error
    }
}

function generateRandomString(length){
    const characters= '009920233034'

    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
}

const trackingId = async() => {
    try {
        const trackingNumber = generateRandomString(12);
        return `AIRNXX${trackingNumber}`
    } catch (error) {
        throw error
    }
}
module.exports = {generateOtp, trackingId}