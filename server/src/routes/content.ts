import { Router } from 'express';
import { services, projects, valuePropositions, contactInfo } from '../data/content';

const router = Router();

router.get('/services', (_req, res) => {
  res.json(services);
});

router.get('/projects', (_req, res) => {
  res.json(projects);
});

router.get('/values', (_req, res) => {
  res.json(valuePropositions);
});

router.get('/contact-info', (_req, res) => {
  res.json(contactInfo);
});

export default router;
