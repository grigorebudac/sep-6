import React from 'react';
import { DialogProps, IconButton } from '@mui/material';

import * as Styles from './VideoModal.styles';
import { Close } from '@mui/icons-material';

interface VideoModalProps {
  open: DialogProps['open'];
  videoId: string;
  onClose: () => void;
}

const VideoModal = ({ videoId, open, onClose }: VideoModalProps) => {
  return (
    <Styles.Dialog open={open} fullWidth maxWidth="md" onClose={onClose}>
      <Styles.CloseBtnContainer>
        <IconButton color="inherit" onClick={onClose}>
          <Close />
        </IconButton>
      </Styles.CloseBtnContainer>
      <Styles.ContentContainer>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          height={500}
          width={'100%'}
          title="Embedded youtube"
        />
      </Styles.ContentContainer>
    </Styles.Dialog>
  );
};

export default VideoModal;
