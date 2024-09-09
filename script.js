const proxyUrl = 'https://api.allorigins.win/raw?url=';
const liveApiUrl = 'https://api.coursera.org/api/courses.v1'; // Live API URL
const githubJsonUrl = 'https://raw.githubusercontent.com/yourusername/yourrepo/main/data.json'; // Replace with your GitHub raw URL

let currentPage = 1;
const itemsPerPage = 3;

// Fetch Live API data and log the response
function loadCourses() {
    fetch(proxyUrl + encodeURIComponent(liveApiUrl))
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => {
            console.log('Parsed Data:', data); // Log the parsed JSON data

            // Check the structure of the response
            const courses = data.elements || []; // Adjust if the actual structure is different

            // Sorting and filtering logic
            const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
            const sortCriteria = document.getElementById('sortSelect')?.value || '';

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

            displayCourses(filteredCourses); // Display courses with pagination
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
            console.log('GitHub Data:', data); // Log the parsed JSON data

            // Check the structure of the response
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

            displayCourses(filteredCourses, 'coursesContainer'); // Display courses with pagination
        })
        .catch(error => console.error('Error fetching GitHub JSON data:', error));
}

// Display Courses with pagination
function displayCourses(courses, containerId = 'coursesContainer') {
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

// Event listeners for sorting and filtering on live API page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('searchInput')) {
        document.getElementById('searchInput').addEventListener('input', loadCourses);
    }

    if (document.getElementById('sortSelect')) {
        document.getElementById('sortSelect').addEventListener('change', loadCourses);
    }

    if (document.getElementById('prevBtn')) {
        document.getElementById('prevBtn').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                loadCourses();
            }
        });
    }

    if (document.getElementById('nextBtn')) {
        document.getElementById('nextBtn').addEventListener('click', () => {
            currentPage++;
            loadCourses();
        });
    }

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

    // Load initial data for both pages
    if (document.getElementById('coursesContainer')) {
        loadCourses();
    }

    if (document.getElementById('jsonSearchInput')) {
        loadGitHubData();
    }
});
