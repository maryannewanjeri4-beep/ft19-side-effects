import { useEffect, useState } from 'react';
import ProductCard from './components/product-card';
import RandomProduct from './components/random-product';

const BASE_URL = 'https://fakestoreapi.com';

function App() {
	// fetch data using useEffect hook

	const [products, setProducts] = useState([]);

	useEffect(() => {
		// fetch from https://fakestoreapi.com/products
		// default behaviour of fetch is GET

		fetch(`${BASE_URL}/products`)
			.then((res) => res.json()) //RESPONSE:• This unpacks that raw response and converts it from raw internet text (JSON) into a clean, usable JavaScript array of 20 product objects.

			.then((data) => setProducts(data));
	}, []);

	return (
		<div className="min-h-screen p-5">
			<RandomProduct />
			<div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
				{products.map((product) => (
					<ProductCard {...product} key={product.id} />
				))}
			</div>
		</div>
	);
}

export default App;

/**
 * import { useState, useEffect } from 'react';
import ProductCard from './product-card';

export default function RandomProduct() {
	// 1. State to track which product ID to fetch (starts at 1)
	const [productId, setProductId] = useState(1);

	// 2. State to store the fetched product object (starts as null while loading)
	const [product, setProduct] = useState(null);

	// 3. Fetch product whenever productId changes
	useEffect(() => {
		async function fetchProduct() {
			try {
				const response = await fetch(
					`https://fakestoreapi.com/products/${productId}`
				);
				const data = await response.json();
				setProduct(data);
			} catch (error) {
				console.error('Error fetching product:', error);
			}
		}

		fetchProduct();
	}, [productId]);

	// 4. Generate a random number from 1 to 20 and update productId
	function randomize() {
		const randomId = Math.floor(Math.random() * 20) + 1;
		setProductId(randomId);
	}

	return (
		<div className="max-w-md mx-auto p-5 flex flex-col gap-4">
			<button
				onClick={randomize}
				className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 cursor-pointer"
			>
				Get Random Product (Current ID: {productId})
			</button>

			{/* Show a loading message until product data arrives, then render ProductCard */
			/**{product ? (
				<ProductCard
					title={product.title}
					price={product.price}
					image={product.image}
					description={product.description}
					category={product.category}
					rating={product.rating}
				/>
			) : (
				<p className="text-center text-gray-500">Loading product...</p>
			)}
		</div>
	);
}
 */