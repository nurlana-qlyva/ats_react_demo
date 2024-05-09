export const upload = async (id, group, files) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
        throw new Error("Authentication token not found.");
    }

    const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/Photo/UploadPhoto?refId=${id}&refGroup=${group}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: files,
    });

    if (!response.ok) {
        throw new Error(`Failed to upload image. Status: ${response.status}`);
    }

    const data = await response.json();

    return data
}
