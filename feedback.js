//  the DOM elements
const addContactBtn = document.getElementById('addContactBtn');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const contactList = document.getElementById('contactList');

// An array to store the contacts
const contacts = [];

// Function to add a new contact to the contacts array and display it on the page
const addContact = ()=> {
    // Get the values from the input fields
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Check if any of the fields are empty
    if (name === '' || email === '' || message === '') {
        alert('TaskMaster user: Please fill in all fields.');
        return;
    }

    // Check for valid email format using a regular expression
    const emailFormat = /^\S+@\S+\.\S+$/;
    if (!emailFormat.test(email)) {
        alert('TaskMaster user: Please enter a valid email address.');
        return;
    }


    // Create a new contact object
    const contact = {
        name,
        email,
        message
    };

    contacts.push(contact);
    displayContacts();
    clearInputs();
}

// Function to display all contacts on the page
const displayContacts =()=> {
    // Clear the existing content in the contactList element
    contactList.innerHTML = '';

    // use foreach loop
    contacts.forEach((contact, index) => {
        // Create a div element to represent the contact card
        const contactCard = document.createElement('div');
        contactCard.classList.add('contact-card');

        // Set the inner HTML of the contact card
        contactCard.innerHTML = `
            <p>Name: ${contact.name}</p>
            <p>Email: ${contact.email}</p>
            <p>message: ${contact.message}</p>
            <span class="delete-btn" onclick="deleteContact(${index})">&times;</span>
        `;

        // Append the contact card to the contactList element
        contactList.appendChild(contactCard);
    });
}

// Function to delete a contact from the contacts array and update the display
const deleteContact =(index)=> {
    contacts.splice(index, 1);
    displayContacts();
}

// Function to clear the input fields
const clearInputs =()=> {
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
}

// Add a click event listener to the addContactBtn to trigger adding a new contact
addContactBtn.addEventListener('click', addContact);

// Display all contacts on the page when the script is first loaded
displayContacts();
