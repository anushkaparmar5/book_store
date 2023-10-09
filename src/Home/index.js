import React from 'react'

const Home = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="container">
                    {Array.from({ length: 10 }, (v, i) => {
                        return (
                            <h1> {i}</h1>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home