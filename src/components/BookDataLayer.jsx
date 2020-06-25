export default class BookData {

    getAllBooks(callback) {
        fetch('http://127.0.0.1:8080/verifyaccount/all')
            .then(res => res.json())
            .then(values => callback(values))
    }

    getAllCartBook(callback) {
        fetch("http://127.0.0.1:8080/home/user/cart/getall", {
            method: 'GET',
            headers: {
                "content-type": "Application/json",
                "token": localStorage.getItem("token")
            }})
        .then(res => res.json())
        .then(values => callback(values))
    }

    getAllWishlistBook(callback) {
        fetch("http://127.0.0.1:8080/home/user/wishlist/getall", {
            method: 'GET',
            headers: {
                "token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(values => callback(values))
    }

    addToCart(bookId, quantity) {
        fetch("http://127.0.0.1:8080/home/user/cart/add-update", {
        method: 'PUT',
        headers: {
            "content-type": "Application/json",
            "token": localStorage.getItem("token")
        },
        body: JSON.stringify({"bookId": bookId, "bookQuantity": quantity})})
        .then(res => res.text())
        .then(res => console.log(res))
    }

    addToWishlist(userId, bookId) {
        fetch("http://127.0.0.1:8080/home/user/wishlist/add", {
        method: 'PUT',
        headers: {
            "content-type": "Application/json",
            "token": localStorage.getItem("token")
        },
        body: JSON.stringify({"bookId": bookId, "userId": userId})})
        .then(res => res.text())
        .then(res => console.log(res))
    }

    getAllBookAsc(callback) {
        fetch('http://127.0.0.1:8080/verifyaccount/sort-asc/price')
            .then(res => res.json())
            .then(values => callback(values))
    }

    getAllBookDesc(callback) {
        fetch('http://127.0.0.1:8080/verifyaccount/sort-desc/price')
            .then(res => res.json())
            .then(values => callback(values))
    }

    updateCart(bookId, quantity) {
        fetch("http://127.0.0.1:8080/home/user/cart/add-update", {
        method: 'PUT',
        headers: {
            "content-type": "Application/json",
            "token": localStorage.getItem("token")
        },
        body: JSON.stringify({"bookId": bookId, "bookQuantity": quantity})})
        .then(res => res.text())
        .then(res => console.log(res))
    }

    removeFromCart(bookId, quantity){
        fetch("http://127.0.0.1:8080/home/user/cart/remove", {
            method: 'PUT',
            headers: {
                "content-type": "Application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify({"bookId": bookId, "bookQuantity": quantity})})
            .then(res => res.text())
            .then(res => console.log(res))
    }    

    removeFromWishList(userId, bookId){
        fetch("http://127.0.0.1:8080/home/user/wishlist/remove", {
        method: 'PUT',
        headers: {
            "content-type": "Application/json",
            "token": localStorage.getItem("token")
        },
        body: JSON.stringify({"bookId": bookId, "userId": userId})})
        .then(res => res.text())
        .then(res => console.log(res))
    }
    
    getAllSearchBook(searchText, callback) {
        console.log("text", searchText)
        fetch(`http://127.0.0.1:8080/verifyaccount/searchbooks/${searchText}`)
        .then(res => res.json())
        .then(values => callback(values))
    }

    signUpData(username, password, email, phoneNo, role){
        fetch("http://127.0.0.1:8080/api/auth/signup", {
            method: 'POST',
            headers: {
                "content-type": "Application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "phoneNumber": phoneNo,
                "role": role,
                "username": username
              })})
            .then(res => res.text())
            .then(res => console.log(res))
    }

    signInData(username, password){
        fetch("http://127.0.0.1:8080/api/auth/signin", {
            method: 'POST',
            headers: {
                "content-type": "Application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
              })})
            .then(res => res.json())
            .then(res => localStorage.setItem("token", res.accessToken))
    }
}