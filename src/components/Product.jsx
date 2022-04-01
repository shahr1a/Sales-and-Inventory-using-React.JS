import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { getImage } from "../api"

function Product({ product }) {
	const [imgSrc, setImgSrc] = useState(null)

	useEffect(() => {
		if (product?.image)
			getImage(product.image)
				.then(({ data }) => {
					console.log(data);
					const base64ImageString = Buffer.from(data, 'binary').toString('base64')
					setImgSrc(("data:image/png;base64," + base64ImageString))
				})
				.catch(e => console.log(e.response))
	}, [product])

	return (
		<Card sx={{ maxWidth: 500, minHeight: 500 }}>
			<CardMedia
				component="img"
				height="400"
				image={imgSrc ?? "/images/inventory/default.PNG"}
				alt="green iguana"
			/>
			<CardContent style={{ backgroundColor: "#9FC8CB" }}>
				<Link to={`/productDetails/${product.productId}`}>
					<Typography
						gutterBottom
						variant="h5"
						component="div"
						p={2}
						style={{ color: "white" }}
					>
						{product.productName}
					</Typography>
				</Link>

				<Typography color="text.secondary" pl={2}>
					<Rating
						name="half-rating-read"
						defaultValue={product.rating}
						precision={0.5}
						readOnly
					/>
				</Typography>
				<Typography
					color="text.secondary"
					pb={2}
					pl={2}
					style={{ color: "white" }}
				>
					{product.numReviews && product.numReviews} Reviews
				</Typography>
				<Typography variant="p" color="text.secondary" component="div" pl={2} pb={2}>
					{product.description}
				</Typography>
				<Typography variant="h4" pl={2}>
					${product.buyingPrice}
				</Typography>
				<Typography color="text.secondary" pb={2} pl={2}>
					<strong>Status: </strong>
					{product.inStock ? "Available" : "Currently OUT OF STOCK"}
				</Typography>
				<Typography color="text.secondary" pb={2} pl={2}>
					{product.category.title}
				</Typography>
			</CardContent>
			<CardActions pb={3}>
				<Link
					to={`/productDetails/${product.productId}`}
					underline="none"
					pl={2}
				>
					<Button variant="contained" color="success" size="large">
						Details
					</Button>
				</Link>
				<Button variant="contained" size="large">
					<i className="bx bxs-cart-add"></i> Add to Cart
				</Button>
			</CardActions>
		</Card>
	);
}

export default Product;
