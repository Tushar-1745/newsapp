import React from 'react'

const NewsItem=(props)=>{

    let{title, description, imageurl, url, author, date, source} = props;
    return (
      <div className='my-3' >
        <div className="card" style={{width: "18rem"}}>
            <img src={imageurl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}
                  <div style={{display: "flex", justifyContent: "flex-end", position: "absolute", top: "0", right: "0" }}>
                    <span className="badge rounded-pill bg-danger">{source}</span>
                  </div>
                </h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-body-secondary">By {author? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                <a rel="nonreferrer" href={url} target="_blank" className="btn btn-sm btn-primary">Read More</a>
            </div>
        </div>
      </div>
    )

}

export default NewsItem
