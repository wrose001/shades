import React from 'react'

export default ({ title, subTitle, bodySub }) => {
  return (
    <div>
      {/* <div className="row">
        <div className="col-10 mx-auto my-2 text-center text-title">
            <h1 className="text-capitalize font-weight-bold">
                {name} 
                <strong className="text-blue">{title}</strong>
            </h1>
        </div>
      </div> */}
      <div className="content text-center mb-5">
        <h1 className="display-4 text-dark text-uppercase col-10 mx-auto my-5 text-center text-title">{title}</h1>
        <p className="lead text-uppercase">{subTitle}</p>
        <p className="text-uppercase pb-5">{bodySub}</p>
      </div>

    </div>
  )
}
