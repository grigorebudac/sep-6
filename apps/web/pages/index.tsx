import { Box, Stack } from "@mui/material";
import { useRouter } from "next/router";

import { ApplicationLayout } from "components/Layouts/ApplicationLayout";
import { ProfilePicture } from "components/Avatars/ProfilePicture";
import { PageTitle } from "components/Titles/PageTitle";
import { SectionLayout } from "components/Layouts/SectionLayout";

const Home = () => {

  const userFullName = "Tata Albert"
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <ApplicationLayout title="Home">
      <Box>
        <PageTitle
          title="My Dashboard"
          subtitle={userFullName}
          icon={<ProfilePicture src={''} alt={userFullName} />}
        />
      </Box>

      <Box marginTop="4rem">
        <SectionLayout title="Upcoming">
          <Stack spacing="4rem">
            
          </Stack>
        </SectionLayout>
      </Box>
    </ApplicationLayout>
  );
};

export default Home;
