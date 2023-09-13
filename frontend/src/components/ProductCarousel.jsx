import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import Message from "./Message";

const ProductCarousel = () => {
	const { data: products, isLoading, error } = useGetTopProductsQuery();

	return isLoading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<Carousel pause='hover' className='bg-primary mb-4'>
			{products.map((product) => (
				<Carousel.Item key={product._id}>
					<Link to={`/product/${product._id}`}>
						<Image src={product.image} alt={product.name} fluid />
						<Carousel.Caption className='carousel-caption'>
							<h2>
								{product.name} (${product.price})
							</h2>
						</Carousel.Caption>
					</Link>
					<div className='position-absolute top-0 end-0 h-75 w-50 d-flex align-items-center bg-primary text-white p-5 rounded-start'>
						<p>{product.description}</p>
					</div>
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export default ProductCarousel;
