const API_CONTINENTS = "/api/continents";

export async function getContinents(continent) {
    const response = await fetch(API_CONTINENTS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(continent)
    })
    const responseFromBE = await response.json();
    if (response.ok) {
        return responseFromBE;
    } else {
        if (responseFromBE) {
            throw responseFromBE
        } else {
            throw new Error('Error Api Country')
        }
    }
}