async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error("Failed to fetch data.");
        const data = await response.json();
        console.log(data); // Display or further process the data
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

fetchData();
