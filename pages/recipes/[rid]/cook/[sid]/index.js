import React from 'react';
import { useRouter } from 'next/router';
import { MainLayout } from 'components/layouts';
import { MainPages } from 'globals';
import StepGuide from './StepGuide';

export default function Cook() {
  const router = useRouter();
  const { rid, sid } = router.query;

  return (
    <MainLayout page={MainPages.Recipes}>
      <StepGuide rid={rid} sid={sid} />
    </MainLayout>
  );
};
