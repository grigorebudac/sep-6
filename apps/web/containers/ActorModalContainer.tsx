import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import ActorModal from 'components/Modals/ActorModal';

const ActorModalContainer = () => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(router.query.movieId != null);

  const actorId = useMemo(() => {
    if (!router.isReady) {
      return null;
    }

    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('actorId');
  }, [router.isReady, router.asPath]);

  useEffect(() => {
    setOpen(actorId != null);
  }, [actorId]);

  function handleClose() {
    router.push(router.route, undefined, { scroll: false });
  }

  return <ActorModal open={isOpen} actorId={Number(actorId)} onClose={handleClose} />;
};

export default ActorModalContainer;
