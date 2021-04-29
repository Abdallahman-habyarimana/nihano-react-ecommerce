import bcrypt from 'bcryptjs'
const data = {
    users: [
        {
            name: 'Nailat',
            email: 'nailat@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
            isSeller: true,
            seller: {
                name: 'Valan',
                logo: '/images/avalan.jpg',
                description: 'best seller',
                rating: 4.5,
                numReviews: 90
            }
        },

        {
            name: 'John Doe',
            email: 'john@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        }
    ],
    products: [
        {
            name: 'Red dress 1',
            category: 'Dress',
            image:'/images/001.jpg',
            price: 80,
            brand: 'Kleish',
            rating: 4.5,
            numReviews: 10,
            description: 'Hight quality product',
            countInStock: 8
        },
        {
            name: 'Haryo Setyadi t-shirt',
            category: 'T-shirt',
            image:'/images/006.jpg',
            price: 80,
            brand: 'Kleish',
            rating: 4.5,
            numReviews: 10,
            description: 'Hight quality product',
            countInStock: 5
        },
        {
            name: 'Red dress 2',
            category: 'Dress',
            image:'/images/003.jpg',
            price: 80,
            brand: 'Kleish',
            rating: 4.5,
            numReviews: 10,
            description: 'Hight quality product',
            countInStock: 9
        },
        {
            name: 'White leave the road',
            category: 'T-shirt',
            image:'/images/007.jpg',
            price: 80,
            brand: 'Kleish',
            rating: 4.5,
            numReviews: 10,
            description: 'Hight quality product',
            countInStock: 2
        },
        {
            name: 'Red dress 3',
            category: 'Dress',
            image:'/images/005.jpg',
            price: 80,
            brand: 'Kleish',
            rating: 4.5,
            numReviews: 6,
            description: 'Hight quality product',
            countInStock: 5
        },
        {
            name: 'Red dress 4',
            category: 'Dress',
            image:'/images/004.jpg',
            price: 180,
            brand: 'Kleish',
            rating: 3.5,
            numReviews: 4,
            description: 'Hight quality product',
            countInStock: 4
        },
    ]
}

export default data