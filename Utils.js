const generateRandomId = (min, max) => {
    let randomId = Math.random() * (max - min) + min;
    return parseInt(randomId);
};

export default generateRandomId;