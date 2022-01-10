import React from 'react';
import { Link } from 'react-router-dom';
import Box from '../../components/Box/Box';
import Card from '../../components/Card';
import Grid from '../../components/Grid';
import useUserAlbums from '../../hooks/useUserAlbums';

function Dashboard() {
  const userAlbums = useUserAlbums();
  const { albums, reviewedAlbums } = userAlbums;
  return (
    <Box padding={'0 0 0 20px'}>
      <div>
        <h2>My Albums</h2>
      </div>
      <Grid>
        {albums?.map((a, index) => (
          <Link to={`albums/${a.uid}`} key={index}>
            {a?.name && <p>{a.name}</p>}
            <Card key={index}>
              {a.images && a.images[0] && <img src={a.images[0].url} />}
            </Card>
          </Link>
        ))}
      </Grid>
      <Box padding={'20px 0 0 0'}>
        <h2>Reviewed Albums</h2>
      </Box>
      <Grid>
        {reviewedAlbums?.map((a, index) => (
          <Link to={`reviewedAlbums/${a.uid}`} key={index}>
            <p>{a.name}</p>
            <Card key={index}>
              {a.images && a.images[0] && <img src={a.images[0].url} />}
            </Card>
          </Link>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;
