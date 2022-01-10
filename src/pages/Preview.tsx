import { addDoc, collection, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import Box from '../components/Box/Box';
import Button from '../components/Button';
import Card from '../components/Card';
import { FlexBox } from '../components/FlexBox/FlexBox';
import Grid from '../components/Grid';
import LikeIcon from '../components/Icons/Heart';
import Trash from '../components/Icons/Trash';
import Masonry from '../components/Masonry';
import { db } from '../firebase';
import { TImage } from '../types';

export default function Preview() {
  const params = useParams<{ authId: string; previewId: string }>();
  const [liked, setLiked] = useState<TImage[] | []>([]);
  const [disliked, setDisliked] = useState<TImage[] | []>([]);
  const [complete, setComplete] = useState(false);
  const [curImages, setCurImages] = useState<TImage[] | []>([]);

  const [images] = useDocumentData(
    doc(
      db,
      'users',
      params?.authId ?? '_',
      'previewAlbums',
      params.previewId ?? '_'
    ),
    {
      idField: 'uid',
      refField: 'ref',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  useEffect(() => {
    if (images) {
      setCurImages(images.images);
    }
  }, [images]);

  const handleSelect = (item: TImage, type: 'liked' | 'disliked') => {
    if (type === 'liked') {
      if (liked.some(i => item === i)) {
        setLiked(liked.filter(i => i !== item));
        setCurImages([...curImages, item]);
        return;
      }
      setLiked([...liked, item]);
      setCurImages(curImages.filter(i => i !== item));
      setDisliked(disliked.filter(i => i !== item));
    } else {
      if (disliked.some(i => item === i)) {
        setDisliked(disliked.filter(i => i !== item));

        setCurImages([...curImages, item]);
        return;
      }
      setDisliked([...disliked, item]);

      setCurImages(curImages.filter(i => i !== item));
      setLiked(liked.filter(i => i !== item));
    }
  };

  const createAlbum = async () => {
    try {
      const docRef = await addDoc(
        collection(db, 'users', params?.authId ?? '_', 'reviewedAlbums'),
        {
          name: images?.name,
          images: liked ?? [],
        }
      );
      if (docRef) {
        setComplete(true);
      }
    } catch (e) {}
  };
  if (complete) {
    return (
      <Box padding={'20px'}>
        <FlexBox align={'center'} justify={'center'}>
          Thank you for your review
        </FlexBox>
      </Box>
    );
  }

  return (
    <Box padding='15px'>
      <FlexBox flex={1} flexDirection={'column'} gap={20} width='100%'>
        {images && (
          <Box>
            <h2>{images?.name}</h2>
            <Button
              disabled={liked.length + disliked.length !== images.images.length}
              onClick={createAlbum}
            >
              Submit Review
            </Button>
            <Masonry>
              {Array.isArray(curImages) &&
                curImages?.map((image: TImage, index: number) => (
                  <Box background='#f8f8f8' key={index} margin={'0 0 20px 0'}>
                    <Card>
                      <img src={image.url} alt='' />
                    </Card>
                    <FlexBox justify={'space-between'}>
                      <Button onClick={() => handleSelect(image, 'liked')}>
                        <LikeIcon selected={liked.some(i => image === i)} />
                      </Button>
                      <Button onClick={() => handleSelect(image, 'disliked')}>
                        <Trash selected={disliked.some(i => image === i)} />
                      </Button>
                    </FlexBox>
                  </Box>
                ))}
            </Masonry>
            {liked.length > 0 && (
              <>
                <h1>me like! {liked.length}</h1>
                <Masonry>
                  {liked?.map((image: TImage, index: number) => (
                    <Box background='#f8f8f8' key={index} margin={'0 0 20px 0'}>
                      <Card>
                        <img src={image.url} alt='' />
                      </Card>
                      <FlexBox justify={'space-between'}>
                        <Button onClick={() => handleSelect(image, 'liked')}>
                          <LikeIcon selected={liked.some(i => image === i)} />
                        </Button>
                        <Button onClick={() => handleSelect(image, 'disliked')}>
                          <Trash selected={disliked.some(i => image === i)} />
                        </Button>
                      </FlexBox>
                    </Box>
                  ))}
                </Masonry>
              </>
            )}
            {disliked.length > 0 && (
              <>
                <h1>fugly! {disliked.length}</h1>
                <Masonry>
                  {disliked?.map((image: TImage, index: number) => (
                    <Box background='#f8f8f8' key={index} margin={'0 0 20px 0'}>
                      <Card>
                        <img src={image.url} alt='' />
                      </Card>
                      <FlexBox justify={'space-between'}>
                        <Button onClick={() => handleSelect(image, 'liked')}>
                          <LikeIcon selected={liked.some(i => image === i)} />
                        </Button>
                        <Button onClick={() => handleSelect(image, 'disliked')}>
                          <Trash selected={disliked.some(i => image === i)} />
                        </Button>
                      </FlexBox>
                    </Box>
                  ))}
                </Masonry>
              </>
            )}
          </Box>
        )}
      </FlexBox>
    </Box>
  );
}
