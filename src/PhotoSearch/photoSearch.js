import React, { useEffect, useState } from 'react';
import './photo.css'
// const url = "https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY"

function Photosearch() {
    let [imageData, setImageData] = useState([]);
    let [bookmarkImgs, setBookmarkImgs] = useState([]);
    let [photoId, setPhotoId] = useState(null);
    let [flag, setFlag] = useState(false);
    let [savedImg, setsavedImg] = useState(false);
    let [inputsearch,setInpusearch] = useState("");
    
    
    async function getData() {
        let resData = []
        await fetch(`https://api.unsplash.com/search/photos?page=1&query=${inputsearch}&client_id=B1lzTesZiWqyZsKOxa4bq3S7xwJ3kAJiA5oxg77LLEc`)
            .then((res)=>res.json())
            .then((res)=>{
                console.log(res.results[0].urls.small,)
                for(let i = 0; i < res.results.length; i++){
                    resData.push(res.results[i].urls.small)
                }
            })
            .catch((e)=>console.log(e));
        console.log(resData)
        setImageData(resData);

    }
    useEffect(() => {
        getData()
    }, [])

    function addImgToBM(i) {
        setBookmarkImgs([...bookmarkImgs, imageData[i]]);
        console.log(bookmarkImgs)
    }
    function addToBtn(i) {
        setPhotoId(i);
        setFlag(true);
    }
    function removeBtn() {
        setPhotoId(null);
        setFlag(false);
    }
    function showBookmarkedImg() {
        setsavedImg(true)
    }
    function showHomePage() {
        setsavedImg(false);
    }

    return (
        <div className='main_cont'>
            <div className='card_cont'>
                {savedImg ? <button className='btn' onClick={() => { showHomePage() }}>Home Page</button> : <button className='btn' onClick={() => { showBookmarkedImg() }}>Bookmark</button>}
                <h1>React Photo Search</h1>
                {
                    savedImg ? 
                    <div className='photo_cont'>
                                {bookmarkImgs?.map((val, i) => {
                                    return (
                                        <div className='img_cont' key={i} >
                                            <img src={val} alt='Saved Images'/>
                                        </div>
                                    )
                                })}
                            </div>
                     :
                        <>
                            <input id='searchInput' type='search' placeholder='search free images' onInput={(e)=>{setInpusearch(e.target.value)}}/>
                            <button  id='searchbtn' onClick={()=>{getData()}}>Search</button>
                            <div className='photo_cont'>
                                {imageData?.map((val, i) => {
                                    return (
                                        <div className='img_cont' key={i} onMouseOver={() => { addToBtn(i) }} onMouseLeave={() => { removeBtn() }}>
                                            <img src={val} alt={inputsearch} />
                                            {flag === true && photoId === i ? <button className='bookbtn' onClick={() => { addImgToBM(i) }}>Add TO Bookmark</button> : ""}
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                }
            </div>

        </div>
    )
}

export default Photosearch;