import PhotoForm from '@/components/Photos/PhotoForm/PhotoForm';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <PhotoForm mode="create" sectionId={id} />;
};

export default Page;
