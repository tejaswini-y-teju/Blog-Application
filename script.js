async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch("http://localhost:5000/api/users/login", {
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
        const response = await fetch("http://localhost:5000/api/users/register", {
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


async function createBlog(event) {
    event.preventDefault();

    const title = document.getElementById("blogTitle").value;
    const content = document.getElementById("blogContent").value;
    const author = "Tejaswini";

    if (!title || !content) {
        alert("Please enter title and content.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/blogs/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
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


// Get and Display All Blogs
async function loadBlogs() {

    const blogContainer = document.getElementById("blogContainer");
    const totalBlogs = document.getElementById("totalBlogs");

    // If we are not on dashboard.html, do nothing
    if (!blogContainer || !totalBlogs) {
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/blogs");
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

        } else {
            blogContainer.innerHTML = "<p>Unable to load blogs.</p>";
        }

    } catch (error) {
        console.error(error);
        blogContainer.innerHTML = "<p>Unable to connect to the server.</p>";
    }
}


// View Individual Blog
function viewBlog(id) {
    window.location.href = `blog-details.html?id=${id}`;
}


// Run when page loads
document.addEventListener("DOMContentLoaded", loadBlogs);
async function loadBlogDetails() {

    const blogDetails = document.getElementById("blogDetails");

    // Run only on blog-details.html
    if (!blogDetails) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    try {
        const response = await fetch(
            `http://localhost:5000/api/blogs/${id}`
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

document.addEventListener("DOMContentLoaded", loadBlogDetails);