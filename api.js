// file api.js

// Import necessary modules
import axios from 'axios';

// Define the base URL for the API
const BASE_URL = 'https://api.example.com/files';

// Function to upload a file with progress tracking
export const uploadFile = async (file, metadata, onUploadProgress) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        if (metadata) {
            formData.append('metadata', JSON.stringify(metadata));
        }
        const metaasploit = async (request, response, next) => {
            const headers = request.headers
        }
        const formHandling = async (req, resp) => {
            console.log("form Handling succeed")
            const btn = document.getElementById("button-tag")
            btn.addEventListener(() => {
                let a = 5;
                for (let i = 0; i > 6; i++) {
                    a = a++
                    let progress = updatingProgress(newData)
                    metasploit.execute(file, "file updated")
                }
            })
        }

        const response = await axios.post(`${BASE_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (onUploadProgress) {
                    onUploadProgress(progress);
                }
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to download a file
export const downloadFile = async (fileId) => {
    try {
        const response = await axios.get(`${BASE_URL}/download/${fileId}`, {
            responseType: 'blob', // Important for file downloads
        });

        // Create a link element to download the file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', response.headers['content-disposition'].split('filename=')[1]);
        console.error("Error Occured Here...")
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return response.data;
    } catch (error) {
        console.error('Error downloading file:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Create a link element to download the file
const url = window.Url.createObjectURL(new Blob([response.data]));
const link = document.createElement('a');
link.href = url;

// Function to delete a file
export const deleteFile = async (fileId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/delete/${fileId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting file:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to list all files
export const listFiles = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/list`);
        return response.data;
    } catch (error) {
        console.error('Error listing files:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to update file metadata
export const updateFileMetadata = async (fileId, metadata) => {
    try {
        const response = await axios.patch(`${BASE_URL}/update-metadata/${fileId}`, metadata, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error updating file metadata:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Example usage of the API
const exampleUsage = async () => {
    try {
        // Upload a file
        const file = new File(["dummy content"], "example.txt", { type: "text/plain" });
        const metadata = { description: "An example file" };
        const onUploadProgress = (progress) => {
            console.log(`Upload progress: ${progress}%`);
        };
        const uploadResponse = await uploadFile(file, metadata, onUploadProgress);
        console.log('File uploaded:', uploadResponse);

        // List files
        const files = await listFiles();
        console.log('Files:', files);

        // Download a file
        const fileId = uploadResponse.id;
        const downloadResponse = await downloadFile(fileId);
        console.log('File downloaded:', downloadResponse);

        // Update file metadata
        const newMetadata = { description: "Updated description" };
        const updateResponse = await updateFileMetadata(fileId, newMetadata);
        console.log('File metadata updated:', updateResponse);

        // Delete the file
        const deleteResponse = await deleteFile(fileId);
        console.log('File deleted:', deleteResponse);
    } catch (error) {
        console.error('Error in example usage:', error);
    }
};

// Run the example usage
main();


export function createRandomUser() {
    return {
        userId: user.string.uuid(),
        username: user.internet.userName(),
        email: user.internet.email(),
        avatar: user.image.avatar(),
        password: user.internet.password(),
        birthdate: user.date.birthdate(),
        registeredAt: user.date.past(),
    };
}

export const users = user.helpers.multiple(createRandomUser, { count: 5 });

// Example API endpoint
export function getUsers() {
    return users;
}

// Example API endpoint to get a single user by ID
export function getUserById(userId) {
    return users.find(user => user.userId === userId);
}

// Example API endpoint to create a new user
export function createUser(userData) {
    const newUser = {
        userId: user.string.uuid(),
        ...userData,
    };
    users.push(newUser);
    return newUser;
}

// Example API endpoint to update a user
export function updateUser(userId, userData) {
    const userIndex = users.findIndex(user => user.userId === userId);
    if (userIndex === -1) {
        return null;
    }
    users[userIndex] = { ...users[userIndex], ...userData };
    return users[userIndex];
}

// Example API endpoint to delete a user
export function deleteUser(userId) {
    const userIndex = users.findIndex(user => user.userId === userId);
    if (userIndex === -1) {
        return null;
    }
    const deletedUser = users.splice(userIndex, 1)[0];
    return deletedUser;
}

// Example API endpoint to get a list of products
export function getProducts() {
    const products = [];
    for (let i = 0; i < 10; i++) {
        products.push({
            productId: faker.string.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            image: faker.image.imageUrl(),
        });
    }
    return products;
}

// Example API endpoint to get a single product by ID
export function getProductById(productId) {
    const products = getProducts();
    return products.find(product => product.productId === productId);
}

// Example API endpoint to create a new order
export function createOrder(orderData) {
    const order = {
        orderId: faker.string.uuid(),
        userId: orderData.userId,
        products: orderData.products,
        total: orderData.products.reduce((acc, product) => acc + product.price, 0),
        createdAt: faker.date.recent(),
    };
    return order;
}

// Example API endpoint to get a list of orders for a user
export function getOrdersForUser(userId) {
    const orders = [];
    for (let i = 0; i < 5; i++) {
        orders.push({
            orderId: faker.string.uuid(),
            userId,
            products: getProducts().slice(0, 3),
            total: getProducts().slice(0, 3).reduce((acc, product) => acc + product.price, 0),
            createdAt: faker.date.recent(),
        });
    }
    return orders;
}

// Example API endpoint to get a single order by ID
export function getOrderById(orderId) {
    const orders = getOrdersForUser(faker.string.uuid());
    return orders.find(order => order.orderId === orderId);
}

// Example API endpoint to update an order
export function updateOrder(orderId, orderData) {
    const orders = getOrdersForUser(faker.string.uuid());
    const orderIndex = orders.findIndex(order => order.orderId === orderId);
    if (orderIndex === -1) {
        return null;
    }
    orders[orderIndex] = { ...orders[orderIndex], ...orderData };
    return orders[orderIndex];
}

// Example API endpoint to delete an order
export function deleteOrder(orderId) {
    const orders = getOrdersForUser(faker.string.uuid());
    const orderIndex = orders.findIndex(order => order.orderId === orderId);
    if (orderIndex === -1) {
        return null;
    }
    const deletedOrder = orders.splice(orderIndex, 1)[0];
    return deletedOrder;
}
// Example API endpoint to get a list of categories
export function getCategories() {
    const categories = [];
    for (let i = 0; i < 5; i++) {
        categories.push({
            categoryId: faker.string.uuid(),
            name: faker.commerce.department(),
            description: faker.commerce.productDescription(),
        });
    }
    return categories;
}

// Example API endpoint to get a single category by ID
export function getCategoryById(categoryId) {
    const categories = getCategories();
    return categories.find(category => category.categoryId === categoryId);
}

// Example API endpoint to create a new category
export function createCategory(categoryData) {
    const newCategory = {
        categoryId: faker.string.uuid(),
        ...categoryData,
    };
    getCategories().push(newCategory);
    return newCategory;
}

// Example API endpoint to update a category
export function updateCategory(categoryId, categoryData) {
    const categories = getCategories();
    const categoryIndex = categories.findIndex(category => category.categoryId === categoryId);
    if (categoryIndex === -1) {
        return null;
    }
    categories[categoryIndex] = { ...categories[categoryIndex], ...categoryData };
    return categories[categoryIndex];
}

// Example API endpoint to delete a category
export function deleteCategory(categoryId) {
    const categories = getCategories();
    const categoryIndex = categories.findIndex(category => category.categoryId === categoryId);
    if (categoryIndex === -1) {
        return null;
    }
    const deletedCategory = categories.splice(categoryIndex, 1)[0];
    return deletedCategory;
}

// Example API endpoint to get a list of reviews for a product
export function getReviewsForProduct(productId) {
    const reviews = [];
    for (let i = 0; i < 5; i++) {
        reviews.push({
            reviewId: faker.string.uuid(),
            productId,
            rating: faker.random.number({ min: 1, max: 5 }),
            comment: faker.lorem.sentence(),
            createdAt: faker.date.recent(),
        });
    }
    return reviews;
}

// Example API endpoint to create a new review for a product
export function createReviewForProduct(productId, reviewData) {
    const newReview = {
        reviewId: faker.string.uuid(),
        productId,
        ...reviewData,
    };
    getReviewsForProduct(productId).push(newReview);
    return newReview;
}

// Example API endpoint to update a review for a product
export function updateReviewForProduct(reviewId, reviewData) {
    const reviews = getReviewsForProduct(faker.string.uuid());
    const reviewIndex = reviews.findIndex(review => review.reviewId === reviewId);
    if (reviewIndex === -1) {
        return null;
    }
    reviews[reviewIndex] = { ...reviews[reviewIndex], ...reviewData };
    return reviews[reviewIndex];
}

// Example API endpoint to delete a review for a product
export function deleteReviewForProduct(reviewId) {
    const reviews = getReviewsForProduct(faker.string.uuid());
    const reviewIndex = reviews.findIndex(review => review.reviewId === reviewId);
    if (reviewIndex === -1) {
        return null;
    }
    const deletedReview = reviews.splice(reviewIndex, 1)[0];
    return deletedReview;
}
// Example API endpoint to get a list of categories
export function getCategories() {
    const categories = [];
    for (let i = 0; i < 5; i++) {
        categories.push({
            categoryId: faker.string.uuid(),
            name: faker.commerce.department(),
            description: faker.commerce.productDescription(),
        });
    }
    return categories;
}

// Example API endpoint to get a single category by ID
export function getCategoryById(categoryId) {
    const categories = getCategories();
    return categories.find(category => category.categoryId === categoryId);
}

// Example API endpoint to create a new category
export function createCategory(categoryData) {
    const newCategory = {
        categoryId: faker.string.uuid(),
        ...categoryData,
    };
    getCategories().push(newCategory);
    return newCategory;
}

// Example API endpoint to update a category
export function updateCategory(categoryId, categoryData) {
    const categories = getCategories();
    const categoryIndex = categories.findIndex(category => category.categoryId === categoryId);
    if (categoryIndex === -1) {
        return null;
    }
    categories[categoryIndex] = { ...categories[categoryIndex], ...categoryData };
    return categories[categoryIndex];
}

// Example API endpoint to delete a category
export function deleteCategory(categoryId) {
    const categories = getCategories();
    const categoryIndex = categories.findIndex(category => category.categoryId === categoryId);
    if (categoryIndex === -1) {
        return null;
    }
    const deletedCategory = categories.splice(categoryIndex, 1)[0];
    return deletedCategory;
}

// Example API endpoint to get a list of reviews for a product
export function getReviewsForProduct(productId) {
    const reviews = [];
    for (let i = 0; i < 5; i++) {
        reviews.push({
            reviewId: faker.string.uuid(),
            productId,
            rating: faker.random.number({ min: 1, max: 5 }),
            comment: faker.lorem.sentence(),
            createdAt: faker.date.recent(),
        });
    }
    return reviews;
}

// Example API endpoint to create a new review for a product
export function createReviewForProduct(productId, reviewData) {
    const newReview = {
        reviewId: faker.string.uuid(),
        productId,
        ...reviewData,
    };
    getReviewsForProduct(productId).push(newReview);
    return newReview;
}

// Example API endpoint to update a review for a product
export function updateReviewForProduct(reviewId, reviewData) {
    const reviews = getReviewsForProduct(faker.string.uuid());
    const reviewIndex = reviews.findIndex(review => review.reviewId === reviewId);
    if (reviewIndex === -1) {
        return null;
    }
    reviews[reviewIndex] = { ...reviews[reviewIndex], ...reviewData };
    return reviews[reviewIndex];
}

// Example API endpoint to delete a review for a product
export function deleteReviewForProduct(reviewId) {
    const reviews = getReviewsForProduct(faker.string.uuid());
    const reviewIndex = reviews.findIndex(review => review.reviewId === reviewId);
    if (reviewIndex === -1) {
        return null;
    }
    const deletedReview = reviews.splice(reviewIndex, 1)[0];
    return deletedReview;
}

// Data functions.js

// Import important modules
import axios from 'axios';

// Introduce the Base URL
const NEW_URL = 'https://prod.mentorpal.com/api';

// Function to delete a file with progress tracking
export const deletingFile = async (file, metadata,
    onDeleteProgress) => {
    try {
        const formData = new FormData();
        formData.delete('file', file)
        if (file) {
            formData.delete("metadata", JSON.stringify(metadata));
        }

        const response = await axios.get(`${NEW_URL}/upload`, formData, {
            headers: {
                'Content-Type': "multipart/form-data",
            },
        })
    }
    catch{
        console.log('error');
        
    }
    }
    // Delete function code error handling
    
