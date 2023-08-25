const filterButton = document.querySelector('#filter-button');
const keywordsInput = document.querySelector('#keywords');
const locationInput = document.querySelector('#location')
const featuredJobsContainer = document.querySelector('.featured-jobs');

filterButton.addEventListener('click', event => {
    event.preventDefault();

    const keywords = keywordsInput.value.trim().toLowerCase();
    const location = locationInput.value.trim().toLowerCase();

    document.addEventListener("DOMContentLoaded", function () {
        // Access the element you want to manipulate after the DOM has fully loaded
        var featuredJobsContainer = document.getElementById("featuredJobsContainer");

        // Check if the element exists before manipulating it
        if (featuredJobsContainer) {
            // Example: Setting the innerHTML of the element
            featuredJobsContainer.innerHTML = "This is the new content.";
        } else {
            console.error("featuredJobsContainer not found in the DOM.");
        }
    });


    fetch('jobs-data.json')
        .then(response => response.json())
        .then(jobs => {
            // Filter the jobs by keywords and location
            const filteredJobs = jobs.filter(job => {
                return (job.title.toLowerCase().includes(keywords) && job.location.toLowerCase().includes(location)
                );
            });
            filteredJobs.forEach(generateJobElement);
        });
});

function generateJobElement(job) {

    const jobELement = document.createElement('div');
    const titleElement = document.createElement('h3');
    const companyElement = document.createElement('p');
    const locationElement = document.createElement('p');
    const descriptionElement = document.createElement('p');
    const applyButton = document.createElement('a');

    titleElement.textContent = job.title;
    companyElement.textContent = job.company;
    locationElement.textContent = job.location;
    descriptionElement.textContent = job.description;
    applyButton.textContent = 'Apply Now';
    applyButton.href = job.apply_url;

    //append the elemnts to the job element

    jobELement.appendChild(titleElement);
    jobELement.appendChild(companyElement);
    jobELement.appendChild(locationElement);
    jobELement.appendChild(descriptionElement);
    jobELement.appendChild(applyButton);

    featuredJobsContainer.appendChild(jobELement);
}