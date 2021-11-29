import React, {useState, useRef, useCallback} from 'react'
import useProductSearch from './useProductSearch'
import SearchBar from 'material-ui-search-bar'
import "../css/productlist.css"
import Product from './product.js'

const ProductList = () => {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(0);

    const {loading, error, products, hasMore} = useProductSearch(query, page)

    const observer = useRef()
    const lastProductRef = useCallback(node => {
        console.log(node);
        if(loading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage+1)
            }
        })
        if(node) observer.current.observe(node)
    }, [loading, hasMore])

    function handleSearch(query) {
        setQuery(query);
        setPage(0);
    }

    const handleSubmitATB = e => {
        e.preventDefault();
        console.log("add to bag");
    };
    
    return (
        <>
            <SearchBar
                value={query}
                onChange={handleSearch}
                onCancelSearch={() => setQuery("")}
            />
            <div id="id_product_list" className="grid">
           {
               products.map((product, index) => {
                    if(products.length === index+1)
                        return <Product lastProductRef={lastProductRef} key={product.id+"_"+index} product={product} handleSubmitATB={handleSubmitATB}/>
                    else
                        return <Product key={product.id+"_"+index} product={product} handleSubmitATB={handleSubmitATB}/>
               })
           }
           </div>
           <div>{loading && 'Loading...'}</div>
           <div>{error && 'Error...'}</div> 
        </>
    )
}

export default ProductList
