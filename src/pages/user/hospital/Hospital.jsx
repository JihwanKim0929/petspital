import React from 'react'
import './Hospital.scss';
import { Map } from 'react-kakao-maps-sdk';

const Hospital = () => {
  return (
      <div className="hospital">
        <Map 
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: '800px', height: '600px' }}
        level={3}
        />
      </div>
    );
};

export default Hospital