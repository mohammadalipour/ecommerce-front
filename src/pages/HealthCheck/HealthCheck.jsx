import React, { useState, useEffect } from "react";
import "./HealthCheck.css";

const HealthCheck = () => {
    const [services, setServices] = useState({});

    useEffect(() => {
        // Fetch data from the health check API
        fetch(process.env.REACT_APP_API_GATEWAY_URL)
            .then((response) => response.json())
            .then((data) => setServices(data))
            .catch((error) => console.error("Error fetching health status:", error));
    }, []);

    return (
        <div className="health-check-page">
            {Object.entries(services).map(([serviceName, status], index) => (
                <div
                    key={serviceName}
                    className={`node service ${
                        status === "connected" ? "connected-service" : "disconnected-service"
                    }`}
                >
                    <div>
                        <b>{serviceName.replace("-", " ")}</b> <br />
                        <span className="status-service">{status}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HealthCheck;
