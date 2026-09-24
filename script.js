/* =========================================================
   CONNECTHUB - COMPLETE JAVASCRIPT
   ========================================================= */


/* =========================================================
   GLOBAL NOTIFICATION
========================================================= */

function showNotification(title, message) {

    const existing =
        document.querySelector(".app-notification");

    if (existing) {
        existing.remove();
    }

    const notification =
        document.createElement("div");

    notification.className =
        "app-notification";

    notification.innerHTML = `
        <div class="app-notification-icon">✓</div>

        <div class="app-notification-content">
            <strong>${title}</strong>
            <span>${message}</span>
        </div>

        <button
            type="button"
            class="app-notification-close"
            aria-label="Close notification">
            ×
        </button>
    `;

    document.body.appendChild(notification);

    setTimeout(function () {
        notification.classList.add("show");
    }, 50);

    const closeButton =
        notification.querySelector(
            ".app-notification-close"
        );

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function () {

                notification.classList.remove("show");

                setTimeout(function () {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);

            }
        );

    }

    setTimeout(function () {

        if (!notification.parentElement) {
            return;
        }

        notification.classList.remove("show");

        setTimeout(function () {

            if (notification.parentElement) {
                notification.remove();
            }

        }, 300);

    }, 3500);
}


/* =========================================================
   AUTH HELPERS
========================================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


function isValidPassword(password) {

    return password.length >= 8;

}


function isUserLoggedIn() {

    return (
        localStorage.getItem(
            "connectHubLoggedIn"
        ) === "true"
    );

}


function getCurrentUser() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "connectHubCurrentUser"
            )
        );

    } catch (error) {

        return null;

    }

}


/* =========================================================
   LOGOUT
========================================================= */

function logoutUser() {

    localStorage.removeItem(
        "connectHubLoggedIn"
    );

    localStorage.removeItem(
        "connectHubCurrentUser"
    );

    localStorage.removeItem(
        "currentUser"
    );

    window.location.href = "login.html";

}


/* =========================================================
   SIGNUP
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const signupForm =
            document.getElementById("signupForm");

        if (!signupForm) {
            return;
        }

        signupForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const firstName =
                    document.getElementById(
                        "firstName"
                    ).value.trim();

                const lastName =
                    document.getElementById(
                        "lastName"
                    ).value.trim();

                const email =
                    document.getElementById(
                        "signupEmail"
                    ).value.trim();

                const password =
                    document.getElementById(
                        "signupPassword"
                    ).value;


                if (firstName.length < 2) {

                    showNotification(
                        "Invalid name",
                        "Please enter your first name."
                    );

                    return;
                }


                if (lastName.length < 2) {

                    showNotification(
                        "Invalid name",
                        "Please enter your last name."
                    );

                    return;
                }


                if (!isValidEmail(email)) {

                    showNotification(
                        "Invalid email",
                        "Please enter a valid email address."
                    );

                    return;
                }


                if (!isValidPassword(password)) {

                    showNotification(
                        "Weak password",
                        "Password must contain at least 8 characters."
                    );

                    return;
                }


                let existingUser = null;

                try {

                    existingUser =
                        JSON.parse(
                            localStorage.getItem(
                                "connectHubUser"
                            )
                        );

                } catch (error) {

                    existingUser = null;

                }


                if (
                    existingUser &&
                    existingUser.email &&
                    existingUser.email.toLowerCase() ===
                    email.toLowerCase()
                ) {

                    showNotification(
                        "Account already exists",
                        "Please login with your existing account."
                    );

                    return;
                }


                const user = {

                    firstName: firstName,

                    lastName: lastName,

                    email: email.toLowerCase(),

                    password: password,

                    createdAt:
                        new Date().toISOString()

                };


                localStorage.setItem(
                    "connectHubUser",
                    JSON.stringify(user)
                );


                showNotification(
                    "Account created!",
                    "Your ConnectHub account is ready."
                );


                setTimeout(function () {

                    window.location.href =
                        "login.html";

                }, 1200);

            }
        );

    }
);
/* =========================================================
   LOGIN
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const loginForm =
            document.getElementById("loginForm");

        if (!loginForm) {
            return;
        }


        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const email =
                    document.getElementById(
                        "email"
                    ).value.trim();

                const password =
                    document.getElementById(
                        "password"
                    ).value;


                if (!isValidEmail(email)) {

                    showNotification(
                        "Invalid email",
                        "Please enter a valid email address."
                    );

                    return;
                }


                if (!password) {

                    showNotification(
                        "Password required",
                        "Please enter your password."
                    );

                    return;
                }


                let user = null;

                try {

                    user =
                        JSON.parse(
                            localStorage.getItem(
                                "connectHubUser"
                            )
                        );

                } catch (error) {

                    user = null;

                }


                if (!user) {

                    showNotification(
                        "No account found",
                        "Please create an account first."
                    );

                    return;
                }


                if (
                    email.toLowerCase() !==
                    String(user.email).toLowerCase() ||
                    password !==
                    user.password
                ) {

                    showNotification(
                        "Login failed",
                        "Email or password is incorrect."
                    );

                    return;
                }


                const currentUser = {

                    firstName:
                        user.firstName,

                    lastName:
                        user.lastName,

                    email:
                        user.email

                };


                localStorage.setItem(
                    "connectHubLoggedIn",
                    "true"
                );


                localStorage.setItem(
                    "connectHubCurrentUser",
                    JSON.stringify(currentUser)
                );


                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(currentUser)
                );


                showNotification(
                    "Welcome back!",
                    "Login successful."
                );


                setTimeout(function () {

                    window.location.href =
                        "discover.html";

                }, 1000);

            }
        );

    }
);


/* =========================================================
   PASSWORD SHOW / HIDE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const passwordToggles =
            document.querySelectorAll(
                ".password-toggle"
            );


        passwordToggles.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const targetId =
                            button.getAttribute(
                                "data-target"
                            );

                        const input =
                            document.getElementById(
                                targetId
                            );

                        if (!input) {
                            return;
                        }


                        if (input.type === "password") {

                            input.type = "text";

                            button.textContent =
                                "Hide";

                        } else {

                            input.type =
                                "password";

                            button.textContent =
                                "Show";

                        }

                    }
                );

            }
        );

    }
);


/* =========================================================
   DYNAMIC NAVBAR
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const navLogin =
            document.getElementById("navLogin");

        const navSignup =
            document.getElementById("navSignup");

        const navProfile =
            document.getElementById("navProfile");

        const navLogout =
            document.getElementById("navLogout");


        const currentUser =
            getCurrentUser();


        if (currentUser) {

            if (navLogin) {
                navLogin.style.display = "none";
            }

            if (navSignup) {
                navSignup.style.display = "none";
            }

            if (navProfile) {
                navProfile.style.display =
                    "inline-flex";
            }

            if (navLogout) {
                navLogout.style.display =
                    "inline-flex";
            }

        }


        if (navLogout) {

            navLogout.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    logoutUser();

                }
            );

        }

    }
);


/* =========================================================
   DYNAMIC PROFILE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const profileName =
            document.getElementById(
                "profileName"
            );

        const profileEmail =
            document.getElementById(
                "profileEmail"
            );


        const currentUser =
            getCurrentUser();


        if (!currentUser) {

            if (profileName) {
                profileName.textContent =
                    "Guest";
            }

            if (profileEmail) {
                profileEmail.textContent =
                    "Please login to view your profile";
            }

            return;
        }


        const fullName =
            (
                (currentUser.firstName || "") +
                " " +
                (currentUser.lastName || "")
            ).trim();


        if (profileName) {

            profileName.textContent =
                fullName || "User";

        }


        if (profileEmail) {

            profileEmail.textContent =
                currentUser.email ||
                "No email available";

        }

    }
);
/* =========================================================
   COMMUNITY PROFILES / DISCOVER
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const discoverCard =
            document.getElementById(
                "discoverCard"
            );

        if (!discoverCard) {
            return;
        }


        /*
           IMPORTANT:
           Keep your existing profile list here.
           If your current file already has the 25 profiles,
           paste that same array in this place.
        */

        let profiles = [];

        try {

            profiles =
                JSON.parse(
                    localStorage.getItem(
                        "connectHubProfiles"
                    )
                ) || [];

        } catch (error) {

            profiles = [];

        }


        if (!profiles.length) {

            profiles = [

                {
                    id: 1,
                    name: "Aarav",
                    age: 20,
                    city: "Mumbai",
                    avatar: "👨🏻",
                    online: true,
                    interests: [
                        "Coding",
                        "Music",
                        "Gaming"
                    ],
                    compatibility: 92
                },

                {
                    id: 2,
                    name: "Aisha",
                    age: 21,
                    city: "Pune",
                    avatar: "👩🏻",
                    online: true,
                    interests: [
                        "Books",
                        "Travel",
                        "Art"
                    ],
                    compatibility: 89
                },

                {
                    id: 3,
                    name: "Kabir",
                    age: 20,
                    city: "Nashik",
                    avatar: "👨🏽",
                    online: false,
                    interests: [
                        "Football",
                        "Coding",
                        "Movies"
                    ],
                    compatibility: 86
                },

                {
                    id: 4,
                    name: "Ananya",
                    age: 19,
                    city: "Nagpur",
                    avatar: "👩🏽",
                    online: true,
                    interests: [
                        "Dance",
                        "Music",
                        "Photography"
                    ],
                    compatibility: 84
                },

                {
                    id: 5,
                    name: "Rohan",
                    age: 21,
                    city: "Thane",
                    avatar: "👨🏻",
                    online: false,
                    interests: [
                        "Fitness",
                        "Gaming",
                        "Tech"
                    ],
                    compatibility: 81
                }

            ];

            localStorage.setItem(
                "connectHubProfiles",
                JSON.stringify(profiles)
            );

        }


        let currentIndex =
            Number(
                localStorage.getItem(
                    "connectHubDiscoverIndex"
                )
            ) || 0;


        function getConnections() {

            try {

                return JSON.parse(
                    localStorage.getItem(
                        "connectHubConnections"
                    )
                ) || [];

            } catch (error) {

                return [];

            }

        }


        function saveConnection(profile) {

            const connections =
                getConnections();


            const exists =
                connections.some(
                    function (item) {

                        return (
                            Number(item.id) ===
                            Number(profile.id)
                        );

                    }
                );


            if (!exists) {

                const newProfile =
                    Object.assign(
                        {},
                        profile,
                        {
                            unread: 0
                        }
                    );

                connections.push(newProfile);

                localStorage.setItem(
                    "connectHubConnections",
                    JSON.stringify(connections)
                );

            }

        }


        function renderProfile() {

            if (!profiles.length) {
                return;
            }


            if (currentIndex >= profiles.length) {
                currentIndex = 0;
            }


            if (currentIndex < 0) {
                currentIndex = 0;
            }


            const profile =
                profiles[currentIndex];


            discoverCard.innerHTML = `

                <div class="profile-avatar">
                    ${profile.avatar || "👤"}
                </div>

                <h2>
                    ${profile.name || "User"}
                </h2>

                <p>
                    ${profile.age || ""} •
                    ${profile.city || "India"}
                </p>

                <div class="interest-list">

                    ${
                        (profile.interests || [])
                        .slice(0, 5)
                        .map(function (interest) {

                            return `
                                <span class="interest-tag">
                                    ${interest}
                                </span>
                            `;

                        })
                        .join("")
                    }

                </div>

                <div class="profile-compatibility">

                    <strong>
                        ${profile.compatibility || 0}%
                    </strong>

                    <span>
                        Shared Interests
                    </span>

                </div>

                <div class="discover-actions">

                    <button
                        type="button"
                        class="btn btn-outline discover-skip">
                        Skip
                    </button>

                    <button
                        type="button"
                        class="btn btn-primary discover-connect">
                        Connect
                    </button>

                </div>
            `;


            const skip =
                discoverCard.querySelector(
                    ".discover-skip"
                );

            const connect =
                discoverCard.querySelector(
                    ".discover-connect"
                );


            if (skip) {

                skip.addEventListener(
                    "click",
                    function () {

                        currentIndex++;

                        localStorage.setItem(
                            "connectHubDiscoverIndex",
                            currentIndex
                        );

                        renderProfile();

                    }
                );

            }


            if (connect) {

                connect.addEventListener(
                    "click",
                    function () {

                        saveConnection(profile);

                        addConnectionNotification(
                            "New connection",
                            "You connected with " +
                            (profile.name || "a community member") +
                            "."
                        );

                        showNotification(
                            "Connection added!",
                            "You can now message " +
                            (profile.name || "this person") +
                            "."
                        );

                        currentIndex++;

                        localStorage.setItem(
                            "connectHubDiscoverIndex",
                            currentIndex
                        );

                        renderProfile();

                    }
                );

            }

        }


        const filterBtn =
            document.getElementById(
                "filterBtn"
            );

        const filterPanel =
            document.getElementById(
                "filterPanel"
            );


        if (filterBtn && filterPanel) {

            filterBtn.addEventListener(
                "click",
                function () {

                    filterPanel.classList.toggle(
                        "show"
                    );

                }
            );

        }


        renderProfile();

    }
);


/* =========================================================
   CONNECTIONS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const connectionsGrid =
            document.getElementById(
                "connectionsGrid"
            );

        const connectionsEmpty =
            document.getElementById(
                "connectionsEmpty"
            );

        const connectionSearch =
            document.getElementById(
                "connectionSearch"
            );


        if (!connectionsGrid) {
            return;
        }


        let connections = getStoredConnections();


        function renderConnections(list) {

            connectionsGrid.innerHTML = "";


            if (!list.length) {

                if (connectionsEmpty) {
                    connectionsEmpty.style.display =
                        "block";
                }

                return;
            }


            if (connectionsEmpty) {
                connectionsEmpty.style.display =
                    "none";
            }


            list.forEach(
                function (profile) {

                    const card =
                        document.createElement("div");

                    card.className =
                        "match-card connection-card";


                    const interests =
                        (profile.interests || [])
                        .slice(0, 3)
                        .map(
                            function (interest) {

                                return `
                                    <span class="interest-tag">
                                        ${interest}
                                    </span>
                                `;

                            }
                        )
                        .join("");


                    const unread =
                        Number(profile.unread) || 0;


                    card.innerHTML = `

                        <div class="match-avatar">
                            ${profile.avatar || "👤"}
                        </div>

                        <div class="connection-status">
                            ${
                                profile.online
                                ? "● Online"
                                : "● Offline"
                            }
                        </div>

                        <h3>
                            ${profile.name || "User"}

                            <span class="verified-badge">
                                ✓
                            </span>
                        </h3>

                        <p>
                            ${profile.age || ""} •
                            ${profile.city || "India"}
                        </p>

                        <div class="interest-list">
                            ${interests}
                        </div>

                        <span class="match-percent">
                            ${profile.compatibility || 0}%
                            Shared Interests
                        </span>

                        ${
                            unread > 0
                            ? `
                                <span class="connection-unread">
                                    ${unread > 99 ? "99+" : unread}
                                    unread
                                </span>
                            `
                            : ""
                        }

                        <div class="connection-card-actions">

                            <button
                                type="button"
                                class="btn btn-primary message-connection"
                                data-id="${profile.id}">
                                Message
                            </button>

                            <button
                                type="button"
                                class="btn btn-outline remove-connection"
                                data-id="${profile.id}">
                                Remove
                            </button>

                        </div>
                    `;


                    connectionsGrid.appendChild(card);

                }
            );


            setupConnectionButtons();

        }


        function setupConnectionButtons() {

            const messageButtons =
                document.querySelectorAll(
                    ".message-connection"
                );


            messageButtons.forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const id =
                                Number(
                                    button.dataset.id
                                );


                            const profile =
                                connections.find(
                                    function (item) {

                                        return (
                                            Number(item.id) ===
                                            id
                                        );

                                    }
                                );


                            if (!profile) {
                                return;
                            }


                            profile.unread = 0;

                            saveStoredConnections(
                                connections
                            );


                            localStorage.setItem(
                                "activeChatProfile",
                                JSON.stringify(profile)
                            );


                            window.location.href =
                                "chat.html";

                        }
                    );

                }
            );


            const removeButtons =
                document.querySelectorAll(
                    ".remove-connection"
                );


            removeButtons.forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const id =
                                Number(
                                    button.dataset.id
                                );


                            const confirmed =
                                confirm(
                                    "Remove this connection?"
                                );


                            if (!confirmed) {
                                return;
                            }


                            connections =
                                connections.filter(
                                    function (profile) {

                                        return (
                                            Number(profile.id) !==
                                            id
                                        );

                                    }
                                );


                            saveStoredConnections(
                                connections
                            );


                            renderConnections(
                                connections
                            );


                            showNotification(
                                "Connection removed",
                                "The connection was removed from your list."
                            );

                        }
                    );

                }
            );

        }


        if (connectionSearch) {

            connectionSearch.addEventListener(
                "input",
                function () {

                    const search =
                        connectionSearch.value
                        .trim()
                        .toLowerCase();


                    if (!search) {

                        renderConnections(
                            connections
                        );

                        return;

                    }


                    const filtered =
                        connections.filter(
                            function (profile) {

                                const name =
                                    (
                                        profile.name ||
                                        ""
                                    ).toLowerCase();


                                const city =
                                    (
                                        profile.city ||
                                        ""
                                    ).toLowerCase();


                                const interests =
                                    (
                                        profile.interests ||
                                        []
                                    )
                                    .join(" ")
                                    .toLowerCase();


                                return (
                                    name.includes(search) ||
                                    city.includes(search) ||
                                    interests.includes(search)
                                );

                            }
                        );


                    renderConnections(
                        filtered
                    );

                }
            );

        }


        renderConnections(
            connections
        );

    }
);
/* =========================================================
   CHAT SYSTEM
   ONE SINGLE CHAT SYSTEM
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const contactsList =
            document.getElementById(
                "contactsList"
            );

        const chatMessages =
            document.getElementById(
                "chatMessages"
            );

        const chatForm =
            document.getElementById(
                "chatForm"
            );

        const chatInput =
            document.getElementById(
                "chatInput"
            );

        const chatUserName =
            document.getElementById(
                "chatUserName"
            );

        const chatUserStatus =
            document.getElementById(
                "chatUserStatus"
            );

        const chatAvatar =
            document.getElementById(
                "chatAvatar"
            );

        const chatSearch =
            document.getElementById(
                "chatSearch"
            );


        if (
            !contactsList ||
            !chatMessages ||
            !chatForm ||
            !chatInput
        ) {
            return;
        }


        let connections =
            getStoredConnections();


        let selectedConnection = null;


        const activeChat =
            localStorage.getItem(
                "activeChatProfile"
            );


        if (activeChat) {

            try {

                selectedConnection =
                    JSON.parse(activeChat);

            } catch (error) {

                selectedConnection = null;

            }

        }


        function getMessages() {

            try {

                return JSON.parse(
                    localStorage.getItem(
                        "connectHubMessages"
                    )
                ) || {};

            } catch (error) {

                return {};

            }

        }


        function saveMessages(messages) {

            localStorage.setItem(
                "connectHubMessages",
                JSON.stringify(messages)
            );

        }


        function renderContacts(search) {

            connections =
                getStoredConnections();


            contactsList.innerHTML = "";


            const searchText =
                (search || "")
                .toLowerCase()
                .trim();


            const filtered =
                connections.filter(
                    function (profile) {

                        const name =
                            (
                                profile.name ||
                                ""
                            ).toLowerCase();


                        const city =
                            (
                                profile.city ||
                                ""
                            ).toLowerCase();


                        return (
                            name.includes(searchText) ||
                            city.includes(searchText)
                        );

                    }
                );


            if (!filtered.length) {

                contactsList.innerHTML = `

                    <div class="contacts-empty">

                        <div>💬</div>

                        <p>
                            ${
                                connections.length === 0
                                ? "Connect with someone first to start chatting."
                                : "No conversation found."
                            }
                        </p>

                    </div>
                `;

                updateUnreadTotal();

                return;
            }


            filtered.forEach(
                function (profile) {

                    const messages =
                        getMessages();


                    const conversation =
                        messages[profile.id] || [];


                    const lastMessage =
                        conversation.length
                        ? conversation[
                            conversation.length - 1
                          ]
                        : null;


                    const contact =
                        document.createElement("button");


                    contact.type = "button";

                    contact.className =
                        "chat-contact";


                    contact.dataset.id =
                        profile.id;


                    if (
                        selectedConnection &&
                        Number(
                            selectedConnection.id
                        ) ===
                        Number(profile.id)
                    ) {

                        contact.classList.add(
                            "active"
                        );

                    }


                    const unread =
                        Number(profile.unread) || 0;


                    contact.innerHTML = `

                        <div class="contact-avatar">
                            ${profile.avatar || "👤"}
                        </div>

                        <div class="contact-info">

                            <strong>
                                ${profile.name || "User"}
                            </strong>

                            <span>
                                ${
                                    lastMessage
                                    ? lastMessage.text
                                    : "Start a conversation"
                                }
                            </span>

                        </div>

                        ${
                            unread > 0
                            ? `
                                <span class="chat-unread-badge">
                                    ${
                                        unread > 99
                                        ? "99+"
                                        : unread
                                    }
                                </span>
                            `
                            : ""
                        }

                    `;


                    contact.addEventListener(
                        "click",
                        function () {

                            selectConnection(
                                profile
                            );

                        }
                    );


                    contactsList.appendChild(
                        contact
                    );

                }
            );


            updateUnreadTotal();

        }


        function selectConnection(profile) {

            selectedConnection =
                profile;


            /*
               Opening a chat marks messages as read.
            */

            connections =
                getStoredConnections();


            const actualProfile =
                connections.find(
                    function (item) {

                        return (
                            Number(item.id) ===
                            Number(profile.id)
                        );

                    }
                );


            if (actualProfile) {

                actualProfile.unread = 0;

                saveStoredConnections(
                    connections
                );

                selectedConnection =
                    actualProfile;

            }


            localStorage.setItem(
                "activeChatProfile",
                JSON.stringify(
                    selectedConnection
                )
            );


            if (chatUserName) {

                chatUserName.textContent =
                    selectedConnection.name ||
                    "User";

            }


            if (chatAvatar) {

                chatAvatar.textContent =
                    selectedConnection.avatar ||
                    "👤";

            }


            if (chatUserStatus) {

                chatUserStatus.textContent =
                    selectedConnection.online
                    ? "● Online"
                    : "Offline";

            }


            chatInput.placeholder =
                "Message " +
                (
                    selectedConnection.name ||
                    "User"
                ) +
                "...";


            renderContacts(
                chatSearch
                ? chatSearch.value
                : ""
            );


            renderMessages();

            chatInput.focus();

        }


        function renderMessages() {

            if (!selectedConnection) {

                chatMessages.innerHTML = `

                    <div class="chat-welcome">

                        <div class="chat-welcome-icon">
                            💬
                        </div>

                        <h3>
                            Welcome to your messages
                        </h3>

                        <p>
                            Select a connection and start chatting.
                        </p>

                    </div>
                `;

                return;
            }


            const messages =
                getMessages();


            const conversation =
                messages[
                    selectedConnection.id
                ] || [];


            chatMessages.innerHTML = "";


            if (!conversation.length) {

                chatMessages.innerHTML = `

                    <div class="chat-welcome">

                        <div class="chat-welcome-icon">
                            👋
                        </div>

                        <h3>
                            Say hello to ${
                                selectedConnection.name
                            }
                        </h3>

                        <p>
                            Start your conversation below.
                        </p>

                    </div>
                `;

                return;
            }


            conversation.forEach(
                function (message) {

                    const element =
                        document.createElement(
                            "div"
                        );


                    element.className =
                        "chat-message " +
                        (
                            message.sender === "me"
                            ? "message-sent"
                            : "message-received"
                        );


                    const bubble =
                        document.createElement(
                            "div"
                        );


                    bubble.className =
                        "message-bubble";


                    const text =
                        document.createElement(
                            "p"
                        );


                    text.textContent =
                        message.text || "";


                    const time =
                        document.createElement(
                            "span"
                        );


                    time.textContent =
                        message.time || "";


                    bubble.appendChild(text);

                    bubble.appendChild(time);

                    element.appendChild(bubble);

                    chatMessages.appendChild(element);

                }
            );


            chatMessages.scrollTop =
                chatMessages.scrollHeight;

        }


        chatForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                if (!selectedConnection) {

                    showNotification(
                        "Select a connection",
                        "Please select someone from your connections first."
                    );

                    return;
                }


                const text =
                    chatInput.value.trim();


                if (!text) {
                    return;
                }


                const messages =
                    getMessages();


                if (
                    !messages[
                        selectedConnection.id
                    ]
                ) {

                    messages[
                        selectedConnection.id
                    ] = [];

                }


                const now =
                    new Date();


                const time =
                    now.toLocaleTimeString(
                        [],
                        {
                            hour: "2-digit",
                            minute: "2-digit"
                        }
                    );


                messages[
                    selectedConnection.id
                ].push({

                    id: Date.now(),

                    sender: "me",

                    text: text,

                    time: time

                });


                saveMessages(messages);


                chatInput.value = "";


                renderMessages();


                renderContacts(
                    chatSearch
                    ? chatSearch.value
                    : ""
                );


                if (
                    messageNotificationsEnabled()
                ) {

                    showNotification(
                        "Message sent",
                        "Your message was added to the conversation."
                    );

                }

            }
        );


        if (chatSearch) {

            chatSearch.addEventListener(
                "input",
                function () {

                    renderContacts(
                        chatSearch.value
                    );

                }
            );

        }


        renderContacts(
            chatSearch
            ? chatSearch.value
            : ""
        );


        if (selectedConnection) {

            const current =
                connections.find(
                    function (item) {

                        return (
                            Number(item.id) ===
                            Number(
                                selectedConnection.id
                            )
                        );

                    }
                );


            if (current) {

                selectConnection(current);

            }

        } else {

            renderMessages();

        }

    }
);
/* =========================================================
   STORAGE HELPERS
========================================================= */

function getStoredConnections() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "connectHubConnections"
            )
        ) || [];

    } catch (error) {

        return [];

    }

}


function saveStoredConnections(connections) {

    localStorage.setItem(
        "connectHubConnections",
        JSON.stringify(connections)
    );

}


/* =========================================================
   UNREAD MESSAGE SYSTEM
========================================================= */

(function () {

    function updateUnreadTotal() {

        const info =
            document.getElementById(
                "chatUnreadInfo"
            );


        if (!info) {
            return;
        }


        const connections =
            getStoredConnections();


        let total = 0;


        connections.forEach(
            function (profile) {

                total +=
                    Number(profile.unread) || 0;

            }
        );


        info.textContent =
            total + " unread";

    }


    /*
       Global function.
       Can be called when an incoming message
       is received in the future.
    */

    window.markConnectHubUnread =
        function (profileId) {

            const connections =
                getStoredConnections();


            const profile =
                connections.find(
                    function (item) {

                        return (
                            Number(item.id) ===
                            Number(profileId)
                        );

                    }
                );


            if (!profile) {
                return;
            }


            profile.unread =
                (
                    Number(profile.unread) || 0
                ) + 1;


            saveStoredConnections(
                connections
            );


            addMessageNotification(
                "New message",
                "You have a new message."
            );


            updateUnreadTotal();

        };


    window.clearConnectHubUnread =
        function (profileId) {

            const connections =
                getStoredConnections();


            const profile =
                connections.find(
                    function (item) {

                        return (
                            Number(item.id) ===
                            Number(profileId)
                        );

                    }
                );


            if (!profile) {
                return;
            }


            profile.unread = 0;


            saveStoredConnections(
                connections
            );


            updateUnreadTotal();

        };


    updateUnreadTotal();


    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key ===
                "connectHubConnections"
            ) {

                updateUnreadTotal();

            }

        }
    );

})();


/* =========================================================
   NOTIFICATION STORAGE
========================================================= */

function addConnectHubNotification(
    icon,
    title,
    message
) {

    let notifications = [];


    try {

        notifications =
            JSON.parse(
                localStorage.getItem(
                    "connectHubNotifications"
                )
            ) || [];

    } catch (error) {

        notifications = [];

    }


    notifications.push({

        id: Date.now(),

        icon: icon,

        title: title,

        message: message,

        time: "Just now"

    });


    localStorage.setItem(
        "connectHubNotifications",
        JSON.stringify(notifications)
    );

}


/* =========================================================
   NOTIFICATION SETTINGS HELPERS
========================================================= */

function connectionNotificationsEnabled() {

    return (
        localStorage.getItem(
            "connectHubConnectionNotifications"
        ) !== "false"
    );

}


function messageNotificationsEnabled() {

    return (
        localStorage.getItem(
            "connectHubMessageNotifications"
        ) !== "false"
    );

}


function addConnectionNotification(
    title,
    message
) {

    if (
        !connectionNotificationsEnabled()
    ) {
        return;
    }


    addConnectHubNotification(
        "👥",
        title,
        message
    );

}


function addMessageNotification(
    title,
    message
) {

    if (
        !messageNotificationsEnabled()
    ) {
        return;
    }


    addConnectHubNotification(
        "💬",
        title,
        message
    );

}


/* =========================================================
   NOTIFICATION SETTINGS PAGE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const connectionNotifications =
            document.getElementById(
                "connectionNotifications"
            );

        const messageNotifications =
            document.getElementById(
                "messageNotifications"
            );


        if (
            connectionNotifications
        ) {

            if (
                localStorage.getItem(
                    "connectHubConnectionNotifications"
                ) === "false"
            ) {

                connectionNotifications.checked =
                    false;

            }


            connectionNotifications.addEventListener(
                "change",
                function () {

                    localStorage.setItem(
                        "connectHubConnectionNotifications",
                        connectionNotifications.checked
                    );

                }
            );

        }


        if (
            messageNotifications
        ) {

            if (
                localStorage.getItem(
                    "connectHubMessageNotifications"
                ) === "false"
            ) {

                messageNotifications.checked =
                    false;

            }


            messageNotifications.addEventListener(
                "change",
                function () {

                    localStorage.setItem(
                        "connectHubMessageNotifications",
                        messageNotifications.checked
                    );

                }
            );

        }

    }
);


/* =========================================================
   EDIT PROFILE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const editProfileBtn =
            document.getElementById(
                "editProfileBtn"
            );


        if (!editProfileBtn) {
            return;
        }


        editProfileBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const currentUser =
                    getCurrentUser() || {};


                const firstName =
                    prompt(
                        "Enter your first name:",
                        currentUser.firstName || ""
                    );


                if (firstName === null) {
                    return;
                }


                const lastName =
                    prompt(
                        "Enter your last name:",
                        currentUser.lastName || ""
                    );


                if (lastName === null) {
                    return;
                }


                if (
                    firstName.trim().length < 2
                ) {

                    showNotification(
                        "Invalid name",
                        "First name must contain at least 2 characters."
                    );

                    return;

                }


                if (
                    lastName.trim().length < 2
                ) {

                    showNotification(
                        "Invalid name",
                        "Last name must contain at least 2 characters."
                    );

                    return;

                }


                const updatedUser = {

                    firstName:
                        firstName.trim(),

                    lastName:
                        lastName.trim(),

                    email:
                        currentUser.email || ""

                };


                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(updatedUser)
                );


                localStorage.setItem(
                    "connectHubCurrentUser",
                    JSON.stringify(updatedUser)
                );


                showNotification(
                    "Profile updated!",
                    "Your profile details have been saved."
                );


                setTimeout(
                    function () {

                        window.location.reload();

                    },
                    800
                );

            }
        );

    }
);


/* =========================================================
   PROFILE / DASHBOARD SYNC
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const user =
            getCurrentUser();


        if (!user) {
            return;
        }


        const fullName =
            (
                (user.firstName || "") +
                " " +
                (user.lastName || "")
            ).trim() ||
            "User";


        const email =
            user.email ||
            "No email";


        const profileName =
            document.getElementById(
                "profileName"
            );


        const profileEmail =
            document.getElementById(
                "profileEmail"
            );


        const welcomeName =
            document.getElementById(
                "welcomeName"
            );


        const settingsName =
            document.getElementById(
                "settingsUserName"
            );


        const settingsEmail =
            document.getElementById(
                "settingsUserEmail"
            );


        if (profileName) {
            profileName.textContent =
                fullName;
        }


        if (profileEmail) {
            profileEmail.textContent =
                email;
        }


        if (welcomeName) {
            welcomeName.textContent =
                fullName;
        }


        if (settingsName) {
            settingsName.textContent =
                fullName;
        }


        if (settingsEmail) {
            settingsEmail.textContent =
                email;
        }

    }
);


/* =========================================================
   PROFILE VISIBILITY
========================================================= */

function isProfileVisible() {

    const visibility =
        localStorage.getItem(
            "connectHubProfileVisibility"
        );


    return visibility !== "false";

}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        const profileVisibility =
            document.getElementById(
                "profileVisibility"
            );


        if (!profileVisibility) {
            return;
        }


        const savedVisibility =
            localStorage.getItem(
                "connectHubProfileVisibility"
            );


        if (savedVisibility !== null) {

            profileVisibility.checked =
                savedVisibility === "true";

        }


        profileVisibility.addEventListener(
            "change",
            function () {

                localStorage.setItem(
                    "connectHubProfileVisibility",
                    profileVisibility.checked
                );


                showNotification(
                    "Privacy Updated",
                    profileVisibility.checked
                    ? "Your profile is now visible."
                    : "Your profile is now hidden."
                );

            }
        );

    }
);


/* =========================================================
   DISCOVER VISIBILITY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (
            !window.location.pathname.includes(
                "discover.html"
            )
        ) {
            return;
        }


        if (isProfileVisible()) {
            return;
        }


        const discoverCard =
            document.getElementById(
                "discoverCard"
            );


        if (!discoverCard) {
            return;
        }


        discoverCard.innerHTML = `

            <div class="empty-state">

                <div style="font-size:40px;">
                    🔒
                </div>

                <h3>
                    Profile Hidden
                </h3>

                <p>
                    Your profile visibility is turned off.
                </p>

                <a
                    href="settings.html"
                    class="btn btn-primary">
                    Privacy Settings
                </a>

            </div>
        `;

    }
);
/* =========================================================
   DISCOVER SEARCH
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const discoverSearch =
            document.getElementById(
                "discoverSearch"
            );


        if (!discoverSearch) {
            return;
        }


        discoverSearch.addEventListener(
            "input",
            function () {

                const searchText =
                    discoverSearch.value
                    .toLowerCase()
                    .trim();


                const cards =
                    document.querySelectorAll(
                        ".profile-card"
                    );


                cards.forEach(
                    function (card) {

                        const text =
                            card.textContent
                            .toLowerCase();


                        card.style.display =
                            text.includes(
                                searchText
                            )
                            ? ""
                            : "none";

                    }
                );

            }
        );

    }
);


/* =========================================================
   DARK MODE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const darkModeToggle =
            document.getElementById(
                "darkMode"
            );


        const savedDarkMode =
            localStorage.getItem(
                "connectHubDarkMode"
            );


        if (
            savedDarkMode === "true"
        ) {

            document.body.classList.add(
                "dark-mode"
            );


            if (darkModeToggle) {

                darkModeToggle.checked =
                    true;

            }

        }


        if (darkModeToggle) {

            darkModeToggle.addEventListener(
                "change",
                function () {

                    document.body.classList.toggle(
                        "dark-mode",
                        darkModeToggle.checked
                    );


                    localStorage.setItem(
                        "connectHubDarkMode",
                        darkModeToggle.checked
                    );

                }
            );

        }

    }
);


/* =========================================================
   SETTINGS: COMPACT MODE / ONLINE STATUS / LOGOUT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const compactMode =
            document.getElementById(
                "compactMode"
            );


        const onlineStatus =
            document.getElementById(
                "onlineStatus"
            );


        const logoutButton =
            document.getElementById(
                "logoutButton"
            );


        if (compactMode) {

            const saved =
                localStorage.getItem(
                    "connectHubCompactMode"
                );


            if (saved === "true") {

                compactMode.checked =
                    true;

                document.body.classList.add(
                    "compact-mode"
                );

            }


            compactMode.addEventListener(
                "change",
                function () {

                    document.body.classList.toggle(
                        "compact-mode",
                        compactMode.checked
                    );


                    localStorage.setItem(
                        "connectHubCompactMode",
                        compactMode.checked
                    );

                }
            );

        }


        if (onlineStatus) {

            const saved =
                localStorage.getItem(
                    "connectHubOnlineStatus"
                );


            if (saved !== null) {

                onlineStatus.checked =
                    saved === "true";

            }


            onlineStatus.addEventListener(
                "change",
                function () {

                    localStorage.setItem(
                        "connectHubOnlineStatus",
                        onlineStatus.checked
                    );

                }
            );

        }


        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                function () {

                    logoutUser();

                }
            );

        }

    }
);


/* =========================================================
   PAGE LOADER
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const pageLoader =
            document.getElementById(
                "pageLoader"
            );


        if (!pageLoader) {
            return;
        }


        setTimeout(
            function () {

                pageLoader.classList.add(
                    "hidden"
                );

            },
            500
        );

    }
);


/* =========================================================
   NAVBAR SCROLL
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const navbar =
            document.getElementById(
                "navbar"
            );


        if (!navbar) {
            return;
        }


        function handleNavbarScroll() {

            if (
                window.scrollY > 20
            ) {

                navbar.classList.add(
                    "scrolled"
                );

            } else {

                navbar.classList.remove(
                    "scrolled"
                );

            }

        }


        window.addEventListener(
            "scroll",
            handleNavbarScroll
        );


        handleNavbarScroll();

    }
);


/* =========================================================
   MOBILE MENU
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const mobileMenuBtn =
            document.getElementById(
                "mobileMenuBtn"
            );


        const mobileNav =
            document.getElementById(
                "mobileNav"
            );


        if (
            !mobileMenuBtn ||
            !mobileNav
        ) {
            return;
        }


        mobileMenuBtn.addEventListener(
            "click",
            function () {

                const isOpen =
                    mobileMenuBtn.classList.toggle(
                        "open"
                    );


                mobileNav.classList.toggle(
                    "show"
                );


                mobileMenuBtn.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                document.body.classList.toggle(
                    "menu-open",
                    isOpen
                );

            }
        );


        const links =
            mobileNav.querySelectorAll(
                "a"
            );


        links.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        mobileMenuBtn.classList.remove(
                            "open"
                        );


                        mobileNav.classList.remove(
                            "show"
                        );


                        mobileMenuBtn.setAttribute(
                            "aria-expanded",
                            "false"
                        );


                        document.body.classList.remove(
                            "menu-open"
                        );

                    }
                );

            }
        );

    }
);


/* =========================================================
   EMPTY LINKS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const emptyLinks =
            document.querySelectorAll(
                'a[href="#"]'
            );


        emptyLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                    }
                );

            }
        );

    }
);


/* =========================================================
   FEATURE CARDS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const featureCards =
            document.querySelectorAll(
                ".feature-card"
            );


        featureCards.forEach(
            function (card) {

                card.addEventListener(
                    "mouseenter",
                    function () {

                        card.style.transform =
                            "translateY(-7px)";

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    function () {

                        card.style.transform =
                            "";

                    }
                );

            }
        );

    }
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const elements =
            document.querySelectorAll(
                ".feature-card, .step-card, .stat-item, .cta-card"
            );


        if (
            !"IntersectionObserver" in window
        ) {
            return;
        }


        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        elements.forEach(
            function (element) {

                element.classList.add(
                    "reveal"
                );


                observer.observe(
                    element
                );

            }
        );

    }
);