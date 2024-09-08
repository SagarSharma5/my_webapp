// GitHub raw URL for the JSON file
const githubJsonUrl = 'https://raw.githubusercontent.com/SagarSharma5/my_webapp/main/data.json?token=GHSAT0AAAAAACVYZ2KWOG2LPJF47LIJMBNUZW55CMA';

// Live API URL to fetch users
const liveApiUrl = 'https://jsonplaceholder.typicode.com/users';

// Pagination variables
let currentPage = 1;
const itemsPerPage = 3;

// Fetch and display courses from GitHub
function loadCourses() {
    fetch(githubJsonUrl)
        .then(response => response.json())
        .then(data => {
            displayCourses(data);
        })
        .catch(error => console.error('Error fetching GitHub data:', error));
}

// Fetch and display users from live API
function loadUsers() {
    fetch(liveApiUrl)
        .then(response => response.json())
        .then(users => {
            displayUsers(users);
        })
        .catch(error => console.error('Error fetching live API data:', error));
}

// Display courses on the page
function displayCourses(data) {
    const coursesContainer = document.getElementById('coursesContainer');
    const filterValue = document.getElementById('filterInput').value.toLowerCase();
    const sortValue = document.getElementById('sortSelect').value;
    
    let filteredCourses = data
        .filter(course => course.name.toLowerCase().includes(filterValue));

    if (sortValue === 'asc') {
        filteredCourses.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        filteredCourses.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

    coursesContainer.innerHTML = '';
    paginatedCourses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.classList.add('bg-white', 'p-4', 'rounded', 'shadow');
        courseElement.innerHTML = `
            <h3 class="text-xl font-bold">${course.name}</h3>
            <p class="mt-2">${course.description}</p>
        `;
        coursesContainer.appendChild(courseElement);
    });

    // Disable buttons if no more pages
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = endIndex >= filteredCourses.length;
}

// Display users on the page
function displayUsers(users) {
    const usersContainer = document.getElementById('usersContainer');
    usersContainer.innerHTML = ''; // Clear previous users

    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.classList.add('bg-white', 'p-4', 'rounded', 'shadow', 'mb-4');
        userElement.innerHTML = `
            <h3 class="text-xl font-bold">${user.name}</h3>
            <p class="mt-2">Email: ${user.email}</p>
            <p class="mt-2">Phone: ${user.phone}</p>
        `;
        usersContainer.appendChild(userElement);
    });
}

// Pagination buttons
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadCourses();
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentPage++;
    loadCourses();
});

// Filter and sort functionality
document.getElementById('filterInput').addEventListener('input', loadCourses);
document.getElementById('sortSelect').addEventListener('change', loadCourses);

// Form validation
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault(); // prevent form submission
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (name === '' || !email.includes('@')) {
        alert('Please enter valid details.');
    } else {
        alert(`Thank you for signing up, ${name}!`);
        document.getElementById('signupForm').reset(); // Clear form after submission
    }
});

// Load users and courses on page load
loadCourses();
loadUsers();
