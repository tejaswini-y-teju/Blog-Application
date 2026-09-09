const API_URL = "https://blog-application-69lz.onrender.com";


// ==================== LOGIN ====================

async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch(`${API_URL}/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert(data.message);
            window.location.href = "dashboard.html";
        } else {
            alert(data.message);
        }

    } catch (error) {
        alert("Unable to connect to the server.");
        console.error(error);
    }
}


// ==================== REGISTER ====================

async function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            window.location.href = "login.html";
        } else {
            alert(data.message);
        }

    } catch (error) {
        alert("Unable to connect to the server.");
        console.error(error);
    }
}


// ==================== CREATE BLOG ====================

async function createBlog(event) {
    event.preventDefault();

    const title = document.getElementById("blogTitle").value;
    const content = document.getElementById("blogContent").value;
    const author = "Tejaswini";

    if (!title || !content) {
        alert("Please enter title and content.");
        return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/blogs/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title,
                content: content,
                author: author
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            window.location.href = "dashboard.html";
        } else {
            alert(data.message);
        }

    } catch (error) {
        alert("Unable to connect to the server.");
        console.error(error);
    }
}


// ==================== GET BLOGS ====================

async function loadBlogs() {

    const blogContainer = document.getElementById("blogContainer");
    const totalBlogs = document.getElementById("totalBlogs");

    if (!blogContainer || !totalBlogs) {
        return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/blogs`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {

            const blogs = data.blogs;

            totalBlogs.textContent = blogs.length;

            blogContainer.innerHTML = "";

            blogs.forEach((blog) => {
                blogContainer.innerHTML += `
                    <div class="blog-card">
                        <h3>${blog.title}</h3>
                        <p>${blog.content}</p>
                        <p><strong>Author:</strong> ${blog.author}</p>

                        <button onclick="viewBlog('${blog._id}')">
                            Read More
                        </button>
                    </div>
                `;
            });

            if (blogs.length === 0) {
                blogContainer.innerHTML =
                    "<p>You haven't created any blogs yet.</p>";
            }

        } else {
            blogContainer.innerHTML = "<p>Unable to load blogs.</p>";
        }

    } catch (error) {
        console.error(error);
        blogContainer.innerHTML =
            "<p>Unable to connect to the server.</p>";
    }
}


// ==================== VIEW BLOG ====================

function viewBlog(id) {
    window.location.href = `blog-details.html?id=${id}`;
}


// ==================== BLOG DETAILS ====================

async function loadBlogDetails() {

    const blogDetails = document.getElementById("blogDetails");

    if (!blogDetails) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    try {
        const response = await fetch(
            `${API_URL}/api/blogs/${id}`
        );

        const data = await response.json();

        if (response.ok) {
            const blog = data.blog;

            blogDetails.innerHTML = `
                <div class="blog-card">
                    <h2>${blog.title}</h2>
                    <p>${blog.content}</p>
                    <p><strong>Author:</strong> ${blog.author}</p>
                    <p><strong>Created:</strong>
                        ${new Date(blog.createdAt).toLocaleString()}
                    </p>
                </div>
            `;
        } else {
            blogDetails.innerHTML = "<p>Blog not found.</p>";
        }

    } catch (error) {
        console.error(error);
        blogDetails.innerHTML = "<p>Unable to load blog.</p>";
    }
}


// ==================== PROTECT DASHBOARD ====================

function checkLogin() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
    }
}


// ==================== LOGOUT ====================

function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");

    window.location.href = "login.html";
}


// ==================== DISPLAY USER ====================

function displayUserName() {

    const userName = document.getElementById("userName");
    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {

        if (userName) {
            userName.textContent = user.name;
        }

        if (profileName) {
            profileName.textContent = user.name;
        }

        if (profileEmail) {
            profileEmail.textContent = user.email;
        }
    }
}


// ==================== DELETE BLOG ====================

async function deleteBlog() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const confirmDelete = confirm(
        "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) {
        return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(
            `${API_URL}/api/blogs/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            window.location.href = "dashboard.html";
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error(error);
        alert("Unable to connect to the server.");
    }
}


// ==================== PAGE LOAD ====================

document.addEventListener("DOMContentLoaded", loadBlogs);
document.addEventListener("DOMContentLoaded", loadBlogDetails);
document.addEventListener("DOMContentLoaded", displayUserName);

if (window.location.pathname.includes("dashboard.html")) {
    checkLogin();
}