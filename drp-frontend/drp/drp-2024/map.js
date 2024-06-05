import React from "react";
import GoogleMapReact from 'google-map-react';
import Marker from "./Marker";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){
  const defaultProps = {
    center: {
      lat: 51.48989420314289,
      lng: -0.44184891947392424
    },
    zoom: 17
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCKYPRLMGq_8ht5IsCwfBJtFkSi9DAFioQ" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          lat={51.48989420314289}
          lng={-0.44184891947392424}
        />
      </GoogleMapReact>
    </div>
  );
}