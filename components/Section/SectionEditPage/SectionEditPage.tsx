'use client';
import { useEffect } from 'react';
import { useSectionStore } from '@/store/sectionStore';
import SectionForm from '../SectionForm/SectionForm';

const SectionEditPage = ({ id }: { id: string }) => {
  const { currentSection, fetchSectionById } = useSectionStore();

  useEffect(() => {
    fetchSectionById(id);
  }, [id]);

  if (!currentSection) return null;

  return (
    <SectionForm
      mode="edit"
      id={id}
      initialTitle={currentSection.title}
      initialDescription={currentSection.description}
    />
  );
};

export default SectionEditPage;
