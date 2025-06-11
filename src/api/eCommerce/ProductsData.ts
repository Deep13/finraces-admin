import mock from '../mock';
import { sub } from 'date-fns';
import { Chance } from 'chance';

import s5 from '/src/assets/images/products/s5.jpg';
import super_games from "/src/assets/images/products/Updated_Products/new-games.jpg";
import psalms_book from "/src/assets/images/products/Updated_Products/new-book.jpg";
import boat_headphone from "/src/assets/images/products/Updated_Products/boat-headphone.jpg";
import macbook_air_pro from "/src/assets/images/products/Updated_Products/advance-macbook.jpg";
import gaming_console from "/src/assets/images/products/Updated_Products/super-games.jpg";
import red_dress from "/src/assets/images/products/Updated_Products/red-valvet-dress.jpg";
import girls_shoes from "/src/assets/images/products/Updated_Products/shoes.jpg";
import sweet_purse from "/src/assets/images/products/Updated_Products/short-sweet-purse.jpg";
import soft_teddybear from "/src/assets/images/products/Updated_Products/teddybear.jpg";
import little_toy from "/src/assets/images/products/Updated_Products/little-angel-toy.jpg";
import dino_toy from "/src/assets/images/products/Updated_Products/toy-dino.jpg";

const chance = new Chance();

const ProductsData = [
  {
    title: 'Super Games',
    price: 275,
    discount: 25,
    related: false,
    salesPrice: 350,
    category: ['toys','electronics'],
    gender: 'Men',
    rating: 5,
    stock: true,
    qty: 1,
    colors: ['#1890FF'],
    photo: super_games,
    id: 1,
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Psalms Book ',
    price: 89,
    discount: 10,
    related: true,
    salesPrice: 99,
    category: ['books'],
    gender: 'Women',
    rating: 4,
    stock: false,
    qty: 1,
    colors: ['#1890FF', '#94D82D', '#FF4842'],
    photo: psalms_book,
    id: 2,
    created: sub(new Date(), { days: 10, hours: 8, minutes: 69 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Derma-E',
    price: 125,
    discount: 12,
    related: false,
    salesPrice: 137,
    category: ['fashion',],
    gender: 'Kids',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#FF4842', '#1890FF', '#94D82D'],
    photo: s5,
    id: 3,
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Boat Headphone',
    price: 50,
    discount: 15,
    related: true,
    salesPrice: 65,
    category: ['electronics'],
    gender: 'Men',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#1890FF', '#94D82D', '#FFC107'],
    photo: boat_headphone,
    id: 4,
    created: sub(new Date(), { days: 4, hours: 9, minutes: 40 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'MacBook Air Pro',
    price: 650,
    discount: 250,
    related: true,
    salesPrice: 900,
    category: [ 'electronics'],
    gender: 'Women',
    rating: 3,
    stock: false,
    qty: 1,
    colors: ['#00AB55', '#000000'],
    photo: macbook_air_pro,
    id: 5,
    created: sub(new Date(), { days: 2, hours: 5, minutes: 50 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Gaming Console',
    price: 25,
    discount: 6,
    related: true,
    salesPrice: 31,
    category: ['electronics'],
    gender: 'Men',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#FFC0CB', '#FF4842'],
    photo: gaming_console,
    id: 6,
    created: sub(new Date(), { days: 2, hours: 9, minutes: 45 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Red Valvet Dress',
    price: 150,
    discount: 50,
    related: false,
    salesPrice: 200,
    category: ['fashion'],
    gender: 'Women',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#FF4842', '#1890FF', '#94D82D'],
    photo: red_dress,
    id: 7,
    created: sub(new Date(), { days: 6, hours: 10, minutes: 0 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Shoes for Girls',
    price: 300,
    discount: 80,
    related: false,
    salesPrice: 380,
    category: ['fashion',],
    gender: 'Women',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#1890FF', '#94D82D', '#FFC107'],
    photo: girls_shoes,
    id: 8,
    created: sub(new Date(), { days: 7, hours: 5, minutes: 20 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Short & Sweet Purse',
    price: 175,
    discount: 25,
    related: false,
    salesPrice: 200,
    category: ['fashion'],
    gender: 'Women',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#00AB55', '#000000'],
    photo: sweet_purse,
    id: 9,
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Toy Dino for Fun',
    price: 210,
    discount: 40,
    related: false,
    salesPrice: 250,
    category: ['toys'],
    gender: 'Kids',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#FFC0CB', '#FF4842'],
    photo: dino_toy,
    id: 10,
    created: sub(new Date(), { days: 6, hours: 6, minutes: 20 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Cute Soft Teddybear',
    price: 285,
    discount: 60,
    related: false,
    salesPrice: 345,
    category: ['toys'],
    gender: 'Kids',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#FF4842', '#1890FF', '#94D82D'],
    photo: soft_teddybear,
    id: 11,
    created: sub(new Date(), { days: 1, hours: 6, minutes: 20 }),
    description: chance.paragraph({ sentences: 2 }),
  },
  {
    title: 'Little Angel Toy',
    price: 5,
    discount: 5,
    related: false,
    salesPrice: 10,
    category: ['toys'],
    gender: 'Kids',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#1890FF', '#94D82D', '#FFC107'],
    photo: little_toy,
    id: 12,
    created: sub(new Date(), { days: 9, hours: 6, minutes: 20 }),
    description: chance.paragraph({ sentences: 2 }),
  },
];

mock.onGet('/api/data/eCommerce/ProductsData').reply(() => {
  return [200, ProductsData];
});


// Endpoint to add a product to the cart
mock.onPost('/api/data/eCommerce/add').reply(config => {
  const { productId } = JSON.parse(config.data);
  const productToAdd = ProductsData.find(product => product.id === productId);

  if (!productToAdd) {
    return [404, { error: 'Product not found' }];
  }

  // Simulate a delay before adding to cart (optional)
  return [200, productToAdd];
});

export default ProductsData;
