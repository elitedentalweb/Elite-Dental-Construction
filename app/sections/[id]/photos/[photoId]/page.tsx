import PhotoPage from '@/components/Photos/PhotoPage/PhotoPage';

const Page = async ({
  params,
}: {
  params: Promise<{ id: string; photoId: string }>;
}) => {
  const { id, photoId } = await params;
  return <PhotoPage photoId={photoId} sectionId={id} />;
};

export default Page;
