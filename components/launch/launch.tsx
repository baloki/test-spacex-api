import { ReturnDataFormat } from '@/custom_types/returndataformat';

export const Launch = ({ name, date_utc, primary_core_id, payloads, image, success, reason }: ReturnDataFormat) => {
  // The data that we would like you to display are:

  //   - name
  //   - date_utc
  //   - The first core serial/name from cores
  //   - id and type from payloads
  //   - display the image from links.patch.small in links
  //   - use success and failures to show the user the success/failure of launch and reason of failure.

  return (
    <section>
      <h2>{name}</h2>
    </section>
  );
};
