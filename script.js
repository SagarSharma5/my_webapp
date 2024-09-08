const githubJsonUrl = 'https://raw.githubusercontent.com/SagarSharma5/my_webapp/main/data.json';
const liveApiUrl = 'https://jsonplaceholder.typicode.com/users';

let currentPage = 1;
const itemsPerPage = 3;

// Fetch GitHub JSON data
function loadCourses() {
    fetch(githubJsonUrl)
        .then(response => response.json())
        .then(data => {
            displayCourses(data);
        })
        .catch(error => console.error('Error fetching GitHub data:', error));
}

// Fetch Live API data
function loadUsers() {
    fetch(liveApiUrl)
        .then(response => response.json())
        .then(users => {
            displayUsers(users);
        })
        .catch(error => console.error('Error fetching live API data:', error));
}

// Display Courses
function displayCourses(data) {
    const coursesContainer = document.getElementById('coursesContainer');
    coursesContainer.innerHTML = '';
    
    data.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.classList.add('bg-white', 'p-4', 'rounded', 'shadow');
        courseElement.innerHTML = `
            <h3 class="text-xl font-bold">${course.name}</h3>
            <p>${course.description}</p>
        `;
        coursesContainer.appendChild(courseElement);
    });
}

// Display Users
function displayUsers(users) {
    const usersContainer = document.getElementById('usersContainer');
    usersContainer.innerHTML = ''; 

    users.forEach(user => {
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

// Pagination buttons for Live API
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadUsers();
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentPage++;
    loadUsers();
});

// Load initial data
if (document.getElementById('coursesContainer')) {
    loadCourses();
}

if (document.getElementById('usersContainer')) {
    loadUsers();
}
