import React from 'react'
import Carousel from 'react-material-ui-carousel'
import AddToBagDialog from './addToBagDialog.js'

const Products = ({lastProductRef, product, handleSubmitATB}) => {
    console.log(lastProductRef);
    return (
        <>   
            <div className="item" ref={lastProductRef}>
                <div className="product_image">
                    <Carousel
                    indicatorIconButtonProps={{
                        style: {
                            padding: '10px',    // 1
                            color: 'lightgray',
                            width: '5px',
                            height: '5px'       // 3
                        }
                    }}
                    activeIndicatorIconButtonProps={{
                        style: {
                            color: 'blue' // 2
                        }
                    }}
                    >
                    {
                        product.images.map((image, index) => (
                            
                            <img src={image} alt="img" />
                            
                        ))
                    }
                    </Carousel>
                </div>
                <div className="product_name">
                    {product.name}
                </div>
                <div className="product_price">
                    {product.price.priceDisplay}
                </div>
                <div className="discount_price">
                    <span className="strike-price">{product?.price?.strikeThroughPriceDisplay}</span>
                    <span className="discount">{product?.price?.discount}%</span>
                </div>
                <div className="product_location">
                    {product.location}
                </div>
                <div className="product_rating">
                    <span className="rating">{product?.review.absoluteRating}</span>
                    <span className="count">({product?.review?.count})</span>
                </div>
                <div className="product_atc">
                    <AddToBagDialog />
                </div>
            </div> 
        </>
    )
}

export default Products;
