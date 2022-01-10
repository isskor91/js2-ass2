import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useLocation, useParams } from 'react-router-dom';
import AdminBar from '../../components/AdminBar';
import Box from '../../components/Box/Box';
import Button from '../../components/Button';
import Card from '../../components/Card';
import FileUpload from '../../components/FileUpload';
import { FlexBox } from '../../components/FlexBox/FlexBox';
import Form from '../../components/Form';
import Grid from '../../components/Grid';
import { auth, db } from '../../firebase';
import NewAlbum from '../../modules/NewAlbum';
import { TImage } from '../../types';

export default function Album() {
  const [user] = useAuthState(auth);
  const [newAlbum, setNewAlbum] = useState(false);
  const [addingImages, setAddingImages] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [copyToNew, setCopyToNew] = useState(false);
  const [selected, setSelected] = useState<TImage[] | []>([]);
  const newNameRef = useRef<HTMLInputElement | null>(null);
  const [editName, setEditName] = useState(false);
  const [reviewLink, setReviewLink] = useState<string | null>(null);
  const params = useParams<{ id: string }>();

  const location = useLocation();
  const parentLoc = location.pathname
    .substring(0, location.pathname.lastIndexOf('/'))
    .split('/');
  const [images] = useDocumentData(
    doc(
      db,
      'users',
      user?.uid ?? '_',
      parentLoc[parentLoc.length - 1],
      params.id ?? '_'
    ),
    {
      idField: 'uid',
      refField: 'ref',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const handleSelect = (item: TImage) => {
    if (selected.some(i => item === i)) {
      setSelected(selected.filter(i => i !== item));
      return;
    }
    setSelected([...selected, item]);
  };

  const updateName = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (images?.ref && newNameRef.current?.value) {
      updateDoc(images.ref, {
        name: newNameRef.current.value,
      });
    }
  };

  const createPreviewAlbum = async () => {
    try {
      const docRef = await addDoc(
        collection(db, 'users', user?.uid ?? '_', 'previewAlbums'),
        {
          name: `${images?.name}-${Date.now()}`,
          images: images?.images ?? [],
        }
      );
      if (docRef) {
        const domainPath = window.location.href.replace(location.pathname, '');
        setReviewLink(`${domainPath}/preview/${user?.uid}/${docRef.id}`);
      }
    } catch (e) {}
  };

  useEffect(() => {
    setReviewLink(null);
    setAddingImages(false);
    setIsEditing(false);
    setEditName(false);
  }, [images]);

  return (
    <Box>
      <FlexBox flex={1} flexDirection={'column'} gap={20} width='100%'>
        {parentLoc[parentLoc.length - 1] === 'albums' && (
          <>
            <AdminBar>
              <Button
                onClick={() => {
                  setNewAlbum(!newAlbum);
                  setAddingImages(false);
                }}
                active={newAlbum}
              >
                New Album
              </Button>
              <Button
                onClick={() => {
                  setAddingImages(!addingImages);
                  setNewAlbum(false);
                }}
              >
                Add Images
              </Button>
              <Button
                active={isEditing}
                onClick={() => {
                  setIsEditing(!isEditing);
                  isEditing && setCopyToNew(false);
                }}
              >
                Edit Album
              </Button>
              <Button
                disabled={!isEditing}
                onClick={() => setCopyToNew(!copyToNew)}
                active={copyToNew}
              >
                Copy to New
              </Button>
              <Button onClick={createPreviewAlbum}>Request Review</Button>
            </AdminBar>

            {(newAlbum || copyToNew) && (
              <NewAlbum
                onComplete={() => setNewAlbum(false)}
                title={
                  copyToNew ? 'Copy selected images to new album' : 'new album'
                }
                images={selected}
              />
            )}
            {(addingImages ||
              (Array.isArray(images?.images) && !images?.images.length)) && (
              <Box padding={'0 0 0 20px'}>
                <FlexBox flexDirection={'column'} gap={20}>
                  no images found add some!
                  <FileUpload docRef={images?.ref} />
                </FlexBox>
              </Box>
            )}
          </>
        )}
        {!newAlbum && images && (
          <Box padding={'0 0 0 20px'}>
            <FlexBox gap={20} align={'flex-end'}>
              <h2>{images.name}</h2>
              <Button onClick={() => setEditName(!editName)}>edit name</Button>
            </FlexBox>
            {editName && (
              <Form onSubmit={updateName}>
                <FlexBox align={'center'}>
                  <input type={'text'} ref={newNameRef} />
                  <Button type={'submit'}>ok</Button>
                </FlexBox>
              </Form>
            )}
            {parentLoc[parentLoc.length - 1] === 'albums' && reviewLink && (
              <div>
                <p>Review link</p>
                <textarea
                  style={{ minWidth: '50%' }}
                  value={reviewLink}
                  readOnly
                ></textarea>
              </div>
            )}
            <Grid>
              {images?.images?.map((image: TImage, index: number) => (
                <Card
                  key={index}
                  selected={selected.some(i => image === i)}
                  onClick={() => {
                    if (!isEditing) return;
                    handleSelect(image);
                  }}
                  noModal={isEditing}
                >
                  <img src={image.url} alt='' />
                </Card>
              ))}
            </Grid>
          </Box>
        )}
      </FlexBox>
    </Box>
  );
}
