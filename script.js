document.addEventListener('DOMContentLoaded', () => {
    const GITHUB_USERNAME = 'mohanpratapdev';
    const GITHUB_API_URL = 'https://api.github.com/users/';

    const avatarElement = document.getElementById('avatar');
    const nameElement = document.getElementById('name');
    const bioElement = document.getElementById('bio');
    const projectsContainer = document.getElementById('projects-container');

    // Function to fetch user profile
    function fetchGitHubUserProfile() {
        fetch(`${GITHUB_API_URL}${GITHUB_USERNAME}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(user => {
                avatarElement.src = user.avatar_url;
                avatarElement.alt = `${user.name || user.login}'s avatar`;
                nameElement.textContent = user.name || user.login;
                bioElement.textContent = user.bio || 'No bio available.';
            })
            .catch(error => {
                console.error('Error fetching GitHub user profile:', error);
                const header = document.querySelector('header');
                header.innerHTML = '<p style="color: red;">Could not load GitHub profile information.</p>';
            });
    }

    // Function to fetch user repositories
    function fetchGitHubRepos() {
        fetch(`${GITHUB_API_URL}${GITHUB_USERNAME}/repos?sort=pushed&per_page=6`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(repos => {
                projectsContainer.innerHTML = ''; // Clear loading/error messages
                repos.forEach(repo => {
                    const projectElement = document.createElement('div');
                    projectElement.classList.add('project');
                    projectElement.innerHTML = `
                        <h3><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h3>
                        <p>${repo.description || 'No description available.'}</p>
                    `;
                    projectsContainer.appendChild(projectElement);
                });
            })
            .catch(error => {
                console.error('Error fetching GitHub repos:', error);
                projectsContainer.innerHTML = '<p style="color: red;">Could not load GitHub projects.</p>';
            });
    }

    fetchGitHubUserProfile();
    fetchGitHubRepos();

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
