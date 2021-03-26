import bcrypt from 'bcryptjs'
const data = {
    users: [
        {
            name: 'Nailat',
            email: 'nailat@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
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
            _id: '1',
            name: 'Red dress',
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
            _id: '2',
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
            _id: '3',
            name: 'Red dress',
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
            _id: '4',
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
            _id: '5',
            name: 'Red dress',
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
            _id: '1',
            name: 'Red dress',
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