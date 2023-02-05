import { ReturnDataFormat } from '@/custom_types/returndataformat';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  data?: ReturnDataFormat[];
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    const result = await fetch('https://api.spacexdata.com/latest/launches');
    const data = await result.json();

    const formattedData: ReturnDataFormat[] = [];
    for (let i = 0; i < 10; i++) {
      const element = data[i];
      const newElement = {
        name: element.name,
        date_utc: element.date_utc,
        primary_core_id: element.cores[0].core,
        payloads: element.payloads,
        image: element.links.patch.small,
        success: element.success,
        reason: element.failures[0]?.reason as string | undefined,
      };

      formattedData.push(newElement);
    }

    res.status(200).json({ data: formattedData });
  } catch (err) {
    res.status(500).json({ error: 'failed to fetch data' });
  }
}
