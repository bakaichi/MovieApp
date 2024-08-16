import React, { useState, useCallback } from "react";
import { BaseTVSeriesProps, Review } from "../types/interfaces";

interface SeriesContextInterface {
    favourites: number[];
    addToFavourites: (series: BaseTVSeriesProps) => void;
    removeFromFavourites: (series: BaseTVSeriesProps) => void;
    addReview: (series: BaseTVSeriesProps, review: Review) => void;  
}

const initialContextState: SeriesContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addReview: (series, review) => { series.id, review },  
};

export const SeriesContext = React.createContext<SeriesContextInterface>(initialContextState);

const SeriesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [myReviews, setMyReviews] = useState<Review[]>([]);  
    const [favourites, setFavourites] = useState<number[]>([]);


    const addReview = (series: BaseTVSeriesProps, review: Review) => {  
        setMyReviews( {...myReviews, [series.id]: review } )
      };

    const addToFavourites = useCallback((series: BaseTVSeriesProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(series.id)) {
                return [...prevFavourites, series.id];
            }
            return prevFavourites;
        });
    }, []);

    const removeFromFavourites = useCallback((series: BaseTVSeriesProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== series.id));
    }, []);

    return (
        <SeriesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                addReview,   
            }}
        >
            {children}
        </SeriesContext.Provider>
    );
};

export default SeriesContextProvider;
