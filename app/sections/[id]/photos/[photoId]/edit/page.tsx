import PhotoEditPage from '@/components/Photos/PhotoEditPage/PhotoEditPage';

const Page = async ({
  params,
}: {
  params: Promise<{ id: string; photoId: string }>;
}) => {
  const { id, photoId } = await params;
  return <PhotoEditPage sectionId={id} photoId={photoId} />;
};

export default Page;
