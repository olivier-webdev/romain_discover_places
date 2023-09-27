const API_COUNTRIES = "/api/countries";

export async function getCountry(country) {
    const response = await fetch(API_COUNTRIES, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(country)
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

export async function getOnlyCountry(id) {
    // const encodedId = encodeURIComponent(idPays);
    const response = await fetch(`${API_COUNTRIES}/getcountry?id=${id}`);
    if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
            return data[0];
        } else {
            throw new Error("No country found")
        }
    } else {
        throw new Error("Failed to get country")
    }
}