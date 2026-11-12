import { useEffect, useState } from 'react';
import ProductCard from './product-card';

export default function randomProduct() {
	const [productId, setProductId] = useState(1);
	const [product, setProduct] = useState(null);

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

	function randomize() {
		let randomId = productId;
		while (randomId === productId) {
			randomId = Math.floor(Math.random() * 20) + 1;
		}
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
			{product ? (
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
