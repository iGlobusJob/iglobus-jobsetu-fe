import { useParams } from 'react-router-dom';

import { JobPostForm } from '../components/job/addJob';

export const EditJobPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  return <JobPostForm jobId={jobId} />;
};

export default EditJobPage;
