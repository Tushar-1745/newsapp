import React,{ useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalResults, setTotalResults] = useState(0)
  const [page, setPage] = useState(0)


  const capitalize=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }                                
  

  const updateNews  =  async()=>{
    props.setProgress(10);
    let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`
    
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(70);
    console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100)  

  }

  useEffect(()=>{
    document.title=`NewsTime - ${capitalize(props.category)}`;
    updateNews();
    // eslint-disable-next-line
  }, [])
 
  const fetchMoreData = async () => {
    setPage(page+1)
    let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page+1}`
    
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };
 
    return (
      <>
        <h1 className="text-center" style={{marginTop: "90px"}}>Top HeadLines</h1>
        {loading && <Spinner/>}
        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
          <div className="row">
            {articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title.slice(0, 46):""} description={element.description?element.description.slice(0, 88):""} 
              imageurl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/></div>
            })}          
          </div>
        </div>
        </InfiniteScroll>
        </>
    )
}

News.defaultProps={
  country: 'in',
  pageSize: 6,
  category: 'general',
}

News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News
