import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useLazyGetPersonQuery } from 'redux/endpoints/person.endpoints';
import PersonModal from 'components/Modals/PersonModal';

const PersonModalContainer = () => {
  const [getPerson, { data: actorData, isLoading: isActorLoading }] =
    useLazyGetPersonQuery();

  const router = useRouter();
  const [isOpen, setOpen] = useState(router.query.movieId != null);

  const personId = useMemo(() => {
    if (!router.isReady) {
      return null;
    }

    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('personId');
  }, [router.isReady, router.asPath]);

  const handleLoadData = useCallback(() => {
    if (isOpen) {
      getPerson(parseInt(personId || ''));
    }
  }, [isOpen, personId, getPerson]);

  useEffect(() => {
    setOpen(personId != null);
  }, [personId]);

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  function handleClose() {
    router.push(router.route, undefined, { scroll: false });
  }

  return (
    <PersonModal
      open={isOpen}
      person={actorData}
      onClose={handleClose}
      isActorLoading={isActorLoading}
    />
  );
};

export default PersonModalContainer;
