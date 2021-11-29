import { useEffect, useState } from 'react';
import axios from 'axios'

const useProductSearch = (query, pageNumber) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [products, setProducts] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setProducts([])
    }, [query])
    
    useEffect(() => {
        if(query.length > 1) {
            setLoading(true)
            setError(false)
            let cancel
            axios({
                method: "GET",
                url: "backend/search/products",
                params: {searchTerm: query, start: pageNumber, itemPerPage: 24 },
                cancelToken: new axios.CancelToken(c => cancel = c)
            }).then(res => {
                setProducts(prevProducts => {
                    return [...prevProducts, ...res?.data?.data?.products]
                })
                setHasMore(res?.data?.data?.products.length > 0)
                setLoading(false)
                console.log(res.data)
            }).catch(e => {
                if(axios.isCancel(e)) return;
                setError(true)
            }) 
            return () => cancel()
        }      
    }, [query, pageNumber])
    return {loading, error, products, hasMore};
}

export default useProductSearch;
