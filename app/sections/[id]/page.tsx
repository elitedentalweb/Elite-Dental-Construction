import SectionPage from '@/components/Section/SectionPage/SectionPage';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <SectionPage id={id} />;
};

export default Page;
