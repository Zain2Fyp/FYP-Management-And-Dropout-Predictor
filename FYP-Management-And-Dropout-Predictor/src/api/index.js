export const sendDataToBackend = async (inputData) => {
    try {
        const response = await fetch('https://junaidkhattak252-zainapi.hf.space/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error sending data to backend:', error);
        throw error; // Re-throw the error so the calling code can handle it
    }
};