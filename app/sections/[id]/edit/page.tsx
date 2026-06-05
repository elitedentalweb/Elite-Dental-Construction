import SectionEditPage from '@/components/Section/SectionEditPage/SectionEditPage';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <SectionEditPage id={id} />;
};

export default Page;
