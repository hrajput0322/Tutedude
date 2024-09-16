import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Loading.css';

const Loading = () => {
    return (
        <div className="d-flex justify-content-center align-items-center main-container" style={{ height: "100vh" }}>
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    );
}

export default Loading;