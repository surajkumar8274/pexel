import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import "./pexel.css";
import { saveAs } from 'file-saver';


const PexelsPhotos = ({ searchTerm }) => {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const API_KEY = '5RjTYBKP6ahQFLBIFPEbJIoJiz5fapPsmlRVLZJO1fZeId3Xtu87NHMx';
    const PER_PAGE = 10;

    useEffect(() => {
        fetchPhotos();
    }, [page, searchTerm]);

    useEffect(() => {
        setPhotos([]);
        setPage(1);
        setHasMore(true);
    }, [searchTerm]);

    const fetchPhotos = () => {
        let apiUrl = `https://api.pexels.com/v1/curated?per_page=${PER_PAGE}&page=${page}`;

        if (searchTerm) {
            apiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
                searchTerm
            )}&per_page=${PER_PAGE}&page=${page}`;
        }

        axios
            .get(apiUrl, {
                headers: {
                    Authorization: API_KEY,
                },
            })
            .then((response) => {
                const newPhotos = response.data.photos.map((photo) => ({
                    id: photo.id,
                    src: photo.src.medium,
                    alt: photo.url,
                    title: photo.photographer,
                }));
                if (page === 1) {
                    setPhotos(newPhotos);
                } else {
                    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
                }
                setHasMore(response.data.photos.length === PER_PAGE);
            })
            .catch((error) => {
                console.error('Error fetching photos:', error);
            });
    };

    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo);
    };

    const handleDownloadClick = () => {
        if (selectedPhoto) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', selectedPhoto.src, true);
            xhr.responseType = 'blob';
    
            xhr.onload = function () {
                if (xhr.status === 200) {
                    const blob = new Blob([xhr.response], { type: 'image/jpeg' });
                    saveAs(blob, selectedPhoto.title + '.jpg');
                }
            };
    
            xhr.send();
        }
    };
    const handleCloseClick = () => {
        setSelectedPhoto(null);
    };

    return (
        <div className='block'>
            <div>
                <h1>Photos from Pexels</h1>
            </div>
            <Box sx={{ width: '100%' }}>
                <InfiniteScroll
                    dataLength={photos.length}
                    next={() => setPage((prevPage) => prevPage + 1)}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    <ImageList variant="masonry" cols={4} gap={8}  >
                        {photos.map((photo, index) => (
                            <ImageListItem key={`${photo.id}-${index}`} sx={{ borderRadius: '15px' }}>
                                <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    loading="lazy"
                                    style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '15px', boxShadow :' 0 3px 5px rgba(0, 0, 0, 0.5)',
                                    border : '0'}}
                                    onClick={() => handlePhotoClick(photo)}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </InfiniteScroll>
            </Box>
            {selectedPhoto && (
                <div className="selected-photo-overlay">
                    <div className="selected-photo-container">
                        <img className='immg'
                            src={selectedPhoto.src}
                            alt={selectedPhoto.alt}
                            
                        />
                        <div className="selected-photo-options">
                            <button onClick={handleDownloadClick}>Download</button>
                            <button onClick={handleCloseClick}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PexelsPhotos;
