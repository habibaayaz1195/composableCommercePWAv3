import React, { useEffect, useState } from 'react'
import fetch from 'cross-fetch'
import { useQuery } from '@tanstack/react-query'
import Aboutuspage from '../../models/Aboutuspage';

import Believes from './believes'
import Information from './information'

const ProductContentful = () => {
    const [components, setComponents] = useState([])

    const spaceid = "s1f68g6uorjr"
    const access_token = "-ARLwOL7HbhyPv7a74sKBFRqMBUjNGk2APvqlI7_AO8"

    const { isLoading, error, data } = useQuery({ 
        queryKey: ['aboutuspage'],
        queryFn: () =>
            fetch(
                `https://cdn.contentful.com/spaces/s1f68g6uorjr/environments/master/entries?access_token=-ARLwOL7HbhyPv7a74sKBFRqMBUjNGk2APvqlI7_AO8&content_type=aboutuspage&include=10`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                }
            ).then((res) => res.json())
    })

    useEffect(() => {
        if (data) {
            const aboutUsData = Aboutuspage.fromJson(data)
            setComponents(aboutUsData.components)
        }
    }, [data])

    const believesData = components.filter((component) => component.componentType === 'believes');
    const informationData = components.filter((component) => component.componentType === 'information');
    return (
        <div className="px-5">
             {components?.map((component, index) => (
                    <div key={index}>
                        {component.componentType === "believes" ? ( 
                        <Believes components={believesData} componentsTitle={[component]}/>
                        ) : component.componentType === "information" ?
                            <Information componentsInfo={[component]}/>
                        
                        : ( <h1></h1>
                        )}
                    </div>
                ))}
            
        </div>
    )
}

export default ProductContentful
