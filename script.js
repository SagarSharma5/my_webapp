const proxyUrl = 'https://api.allorigins.win/raw?url=';
const liveApiUrl = 'https://api.coursera.org/api/courses.v1'; // Live API URL
const githubJsonUrl = 'https://raw.githubusercontent.com/SagarSharma5/my_webapp/main/data.json'; // Replace with your GitHub raw URL

let currentPage = 1;
const itemsPerPage = 3;

// Fetch Live API data
function loadLiveApiCourses() {
    fetch(proxyUrl + encodeURIComponent(liveApiUrl))
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => {
            console.log('Parsed Live API Data:', data); // Log the parsed JSON data

            const courses = data.elements || []; // Adjust if the actual structure is different

            // Sorting and filtering logic for live API
            const searchTerm = document.getElementById('liveSearchInput')?.value.toLowerCase() || '';
            const sortCriteria = document.getElementById('liveSortSelect')?.value || '';

            let filteredCourses = courses.filter(course =>
                (course.name || '').toLowerCase().includes(searchTerm)
            );

            if (sortCriteria === 'name') {
                filteredCourses.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
            }

            displayLiveCourses(filteredCourses); // Display courses with pagination
        })
        .catch(error => console.error('Error fetching live API data:', error));
}

// Fetch GitHub JSON data
function loadGitHubData() {
    fetch(githubJsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => {
            console.log('Parsed GitHub JSON Data:', data); // Log the parsed JSON data

            const courses = data.courses || []; // Adjust if the actual structure is different

            // Sorting and filtering logic for GitHub data
            const searchTerm = document.getElementById('jsonSearchInput')?.value.toLowerCase() || '';
            const sortCriteria = document.getElementById('jsonSortSelect')?.value || '';

            let filteredCourses = courses.filter(course =>
                (course.name || '').toLowerCase().includes(searchTerm)
            );

            if (sortCriteria === 'name') {
                filteredCourses.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
            } else if (sortCriteria === 'instructor') {
                filteredCourses.sort((a, b) => (a.instructor || '').localeCompare(b.instructor || ''));
            } else if (sortCriteria === 'rating') {
                filteredCourses.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            }

            displayGitHubCourses(filteredCourses, 'coursesContainer'); // Display courses with pagination
        })
        .catch(error => console.error('Error fetching GitHub JSON data:', error));
}

// Display Live API Courses with pagination
function displayLiveCourses(courses, containerId = 'liveCoursesContainer') {
    const coursesContainer = document.getElementById(containerId);
    if (!coursesContainer) return;

    coursesContainer.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedCourses = courses.slice(start, end);

    paginatedCourses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.classList.add('bg-white', 'p-4', 'rounded', 'shadow');

        courseElement.innerHTML = `
            <h3 class="text-xl font-bold">${course.name || 'N/A'}</h3>
            <p>Instructor: ${course.instructor || 'N/A'}</p>
            <p>Rating: ${course.rating || 'N/A'}</p>
        `;
        coursesContainer.appendChild(courseElement);
    });
}

// Display GitHub JSON Courses with pagination
function displayGitHubCourses(courses, containerId = 'jsonCoursesContainer') {
    const coursesContainer = document.getElementById(containerId);
    if (!coursesContainer) return;

    coursesContainer.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedCourses = courses.slice(start, end);

    paginatedCourses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.classList.add('bg-white', 'p-4', 'rounded', 'shadow');

        courseElement.innerHTML = `
            <h3 class="text-xl font-bold">${course.name || 'N/A'}</h3>
            <p>Instructor: ${course.instructor || 'N/A'}</p>
            <p>Duration: ${course.duration || 'N/A'}</p>
            <p>Rating: ${course.rating || 'N/A'}</p>
            <p>Category: ${course.category || 'N/A'}</p>
            <p>Price: ${course.price || 'N/A'}</p>
            <p>Enrolled: ${course.enrolled || 'N/A'}</p>
        `;
        coursesContainer.appendChild(courseElement);
    });
}

// Event listeners for sorting and filtering on both pages
document.addEventListener('DOMContentLoaded', () => {
    // Live API page
    if (document.getElementById('liveSearchInput')) {
        document.getElementById('liveSearchInput').addEventListener('input', loadLiveApiCourses);
    }

    if (document.getElementById('liveSortSelect')) {
        document.getElementById('liveSortSelect').addEventListener('change', loadLiveApiCourses);
    }

    if (document.getElementById('livePrevBtn')) {
        document.getElementById('livePrevBtn').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                loadLiveApiCourses();
            }
        });
    }

    if (document.getElementById('liveNextBtn')) {
        document.getElementById('liveNextBtn').addEventListener('click', () => {
            currentPage++;
            loadLiveApiCourses();
        });
    }

    // GitHub JSON page
    if (document.getElementById('jsonSearchInput')) {
        document.getElementById('jsonSearchInput').addEventListener('input', loadGitHubData);
    }

    if (document.getElementById('jsonSortSelect')) {
        document.getElementById('jsonSortSelect').addEventListener('change', loadGitHubData);
    }

    if (document.getElementById('jsonPrevBtn')) {
        document.getElementById('jsonPrevBtn').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                loadGitHubData();
            }
        });
    }

    if (document.getElementById('jsonNextBtn')) {
        document.getElementById('jsonNextBtn').addEventListener('click', () => {
            currentPage++;
            loadGitHubData();
        });
    }

    // Load initial data
    if (document.getElementById('liveCoursesContainer')) {
        loadLiveApiCourses();
    }

    if (document.getElementById('jsonCoursesContainer')) {
        loadGitHubData();
    }
});
