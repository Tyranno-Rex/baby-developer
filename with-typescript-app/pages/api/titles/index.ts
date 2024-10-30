import { NextApiRequest, NextApiResponse } from "next";
import { sampleTitleData } from "../../../utils/sample-data";
import { Title } from '../../../interfaces';

let titles = sampleTitleData;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(titles);
      break;
    case 'POST':
      const newTitle: Title = { id: titles.length + 1, name: req.body.name };
      titles.push(newTitle);
      res.status(201).json(newTitle);
      break;
    case 'PUT':
      const { id, name } = req.body;
      titles = titles.map((title) => (title.id === id ? { ...title, name } : title));
      res.status(200).json({ id, name });
      break;
    case 'DELETE':
      console.log(req.body);
      titles = titles.filter((title) => title.id !== req.body.id);
      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
