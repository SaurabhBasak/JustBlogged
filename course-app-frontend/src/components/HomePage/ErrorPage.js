import React from "react";
import { useLocation } from "react-router-dom";

function ErrorPage() {
    const location = useLocation()
    return <div><h1 className="text-white">Could not find {location.pathname}{location.search}</h1></div>
}

export default ErrorPage;