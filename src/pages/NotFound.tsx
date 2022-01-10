import React from 'react';
import { Link } from 'react-router-dom';
import Box from '../components/Box/Box';
import Button from '../components/Button';
import { FlexBox } from '../components/FlexBox/FlexBox';

function NotFound() {
  return (
    <Box padding='50px 20px'>
      <FlexBox flexDirection={'column'} gap={20} align={'center'}>
        <h1 style={{ textAlign: 'center' }}>Ooopsie doobsie, page not found</h1>
        <Button>
          <Link to='/'>Go to Home</Link>
        </Button>
      </FlexBox>
    </Box>
  );
}

export default NotFound;
