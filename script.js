const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const liveApiUrl = 'https://api.coursera.org/api/courses.v1';

let currentPage = 1;
const itemsPerPage = 3;

// Fetch Live API data and implement sorting and filtering
function loadCourses() {
    fetch(proxyUrl + liveApiUrl)
        .then(response => response.json())
        .then(data => {
            const courses = data.elements || []; // Adjust this based on the actual response structure

            const searchTerm = document.getElementById('jsonSearchInput')?.value.toLowerCase() || '';
            const sortCriteria = document.getElementById('jsonSortSelect')?.value || '';

            let filteredCourses = courses.filter(course => 
                (course.title || '').toLowerCase().includes(searchTerm)
            );

            if (sortCriteria === 'name') {
                filteredCourses.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
            } else if (sortCriteria === 'instructor') {
                filteredCourses.sort((a, b) => (a.instructor || '').localeCompare(b.instructor || ''));
            } else if (sortCriteria === 'rating') {
                filteredCourses.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            }

            displayCourses(filteredCourses);
        })
        .catch(error => console.error('Error fetching live API data:', error));
}

// Display Courses with pagination
function displayCourses(courses) {
    const coursesContainer = document.getElementById('coursesContainer');
    if (!coursesContainer) return;

    coursesContainer.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedCourses = courses.slice(start, end);

    paginatedCourses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.classList.add('bg-white', 'p-4', 'rounded', 'shadow');
        
        courseElement.innerHTML = `
            <h3 class="text-xl font-bold">${course.title || 'N/A'}</h3>
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

// Event listeners for sorting and filtering
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('jsonSearchInput');
    const sortSelect = document.getElementById('jsonSortSelect');
    const prevBtn = document.getElementById('jsonPrevBtn');
    const nextBtn = document.getElementById('jsonNextBtn');

    if (searchInput) {
        searchInput.addEventListener('input', loadCourses);
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', loadCourses);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                loadCourses();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentPage++;
            loadCourses();
        });
    }

    // Load initial data
    loadCourses();
});
