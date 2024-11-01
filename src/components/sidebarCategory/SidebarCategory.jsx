import React from 'react';
import './SidebarCategory.scss';
import { Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SidebarCategory = ({ CategoryIcon, categoryName, categoryLink }) => {
  return (
    <Link to={categoryLink} style={{ textDecoration: "none" }}>
      <li className="sidebarCategory">
        <Icon className="SidebarIcon" w="1.25rem" h="1.25rem" marginRight='0.6rem'>
          <CategoryIcon />
        </Icon>
        {categoryName}
      </li>
    </Link>
  );
}

export default SidebarCategory