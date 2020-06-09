export default class BookData {

    getBooks(callback){
        fetch("http://192.168.43.53:8080/home")
            .then(res => res.json()
            .then(values => callback(values))
        )
    }

    getWishList(callback){
        fetch("http://192.168.43.53:8080/home")
            .then(res => res.json()
            .then(values => callback(values))
        )
    }

    getCartItems(callback){
        fetch("http://192.168.43.53:8080/home")
            .then(res => res.json()
            .then(values => callback(values))
        )
    }
}