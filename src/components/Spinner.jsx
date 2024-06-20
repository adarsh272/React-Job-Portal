import React from 'react'
import CircleLoader from "react-spinners/ClipLoader";

const Spinner = ({ loading }) => {
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "#4338ca",
    };
    return (
        <div>
            <CircleLoader
                loading={loading}
                size={150}
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Spinner