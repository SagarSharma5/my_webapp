const githubJsonUrl = 'https://raw.githubusercontent.com/SagarSharma5/my_webapp/main/data.json';
const liveApiUrl = 'https://jsonplaceholder.typicode.com/users';

let currentPage = 1;
let jsonCurrentPage = 1;
const itemsPerPage = 3;

// Fetch Live API data and implement sorting and filtering
function loadUsers() {
    fetch(liveApiUrl)
        .then(response => response.json())
        .then(users => {
            const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
            const sortCriteria = document.getElementById('sortSelect')?.value || '';

            let filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm));

            if (sortCriteria === 'name') {
                filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortCriteria === 'email') {
                filteredUsers.sort((a, b) => a.email.localeCompare(b.email));
            }

            displayUsers(filteredUsers);
        })
        .catch(error => console.error('Error fetching live API data:', error));
}

// Display Users with pagination
function displayUsers(users) {
    const usersContainer = document.getElementById('usersContainer');
    if (!usersContainer) return;

    usersContainer.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedUsers = users.slice(start, end);

    paginatedUsers.forEach(user => {
        const userElement = document.createElement('div');
        userElement.classList.add('bg-white', 'p-4', 'rounded', 'shadow');
        userElement.innerHTML = `
            <h3 class="text-xl font-bold">${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
        `;
        usersContainer.appendChild(userElement);
    });
}

// Fetch GitHub JSON data and implement sorting and filtering
function loadCourses() {
    fetch(githubJsonUrl)
        .then(response => response.json())
        .then(courses => {
            const searchTerm = document.getElementById('jsonSearchInput')?.value.toLowerCase() || '';
            const sortCriteria = document.getElementById('jsonSortSelect')?.value || '';

            let filteredCourses = courses.filter(course => course.name.toLowerCase().includes(searchTerm));

            if (sortCriteria === 'name') {
                filteredCourses.sort((a, b) => a.name.localeCompare(b.name));
            }

            displayCourses(filteredCourses);
        })
        .catch(error => console.error('Error fetching GitHub data:', error));
}

// Display Courses with pagination
function displayCourses(courses) {
    const coursesContainer = document.getElementById('coursesContainer');
    if (!coursesContainer) return;

    coursesContainer.innerHTML = '';

    const start = (jsonCurrentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedCourses = courses.slice(start, end);

    paginatedCourses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.classList.add('bg-white', 'p-4', 'rounded', 'shadow');
        courseElement.innerHTML = `
            <h3 class="text-xl font-bold">${course.name}</h3>
            <p>${course.description}</p>
        `;
        coursesContainer.appendChild(courseElement);
    });
}

// Event listeners for sorting and filtering (Live API)
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (searchInput) {
        searchInput.addEventListener('input', loadUsers);
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', loadUsers);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                loadUsers();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentPage++;
            loadUsers();
        });
    }

    // Load initial data
    loadUsers();
});

// Event listeners for sorting and filtering (GitHub JSON)
document.addEventListener('DOMContentLoaded', () => {
    const jsonSearchInput = document.getElementById('jsonSearchInput');
    const jsonSortSelect = document.getElementById('jsonSortSelect');
    const jsonPrevBtn = document.getElementById('jsonPrevBtn');
    const jsonNextBtn = document.getElementById('jsonNextBtn');

    if (jsonSearchInput) {
        jsonSearchInput.addEventListener('input', loadCourses);
    }

    if (jsonSortSelect) {
        jsonSortSelect.addEventListener('change', loadCourses);
    }

    if (jsonPrevBtn) {
        jsonPrevBtn.addEventListener('click', () => {
            if (jsonCurrentPage > 1) {
                jsonCurrentPage--;
                loadCourses();
            }
        });
    }

    if (jsonNextBtn) {
        jsonNextBtn.addEventListener('click', () => {
            jsonCurrentPage++;
            loadCourses();
        });
    }

    // Load initial data
    loadCourses();
});
