import { useState, useEffect } from "react";

import axios from "axios";

export default function useAxiosGet(url: string) {

    url = `${import.meta.env.APP_API_URL}${url}`

    const [data, setData] = useState([])
    const [error, setError] = useState(null as null | string)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let isMounted = true
        const source = axios.CancelToken.source()
    
        const fetchData = async (fetchUrl: string) => {
            setIsLoading(true)

            try {
                const response = await axios.get(fetchUrl, {
                    cancelToken: source.token
                })
    
                if(isMounted) {
                    setData(response.data.data)
                    setError(null)
                }
    
            } catch (err) {
                const error = err as Error
                if(isMounted) {
                    setError(error.message)
                    setData([])
                }
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        fetchData(url)

        return () => {
            isMounted = false
            source.cancel()
        }
        
    }, [url])

    return { data, error, isLoading }
}