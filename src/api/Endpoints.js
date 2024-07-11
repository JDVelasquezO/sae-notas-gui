const url = "http://localhost:5000";

export async function sendFiles(formData) {
    return fetch(`${url}/process`, {
        method: "POST",
        body: formData
    });
}
