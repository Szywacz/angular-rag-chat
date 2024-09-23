import File from '../types/File';

const MOCK_FILES: File[] = [
  {
    id: '1',
    name: 'Project Proposal',
    description: 'Initial project proposal document.',
    content: 'This document outlines the project proposal...',
    createdAt: new Date('2024-08-01T10:00:00Z'),
    updatedAt: new Date('2024-08-15T10:00:00Z'),
  },
  {
    id: '2',
    name: 'Design Specification',
    description: 'Detailed design specification for the project.',
    content: 'The design specification includes all the technical details...',
    createdAt: new Date('2024-08-05T11:30:00Z'),
    updatedAt: new Date('2024-08-20T12:00:00Z'),
  },
  {
    id: '3',
    name: 'Meeting Notes',
    description: 'Notes from the project kick-off meeting.',
    content: 'During the kick-off meeting, we discussed the following points...',
    createdAt: new Date('2024-08-10T14:15:00Z'),
    updatedAt: new Date('2024-08-21T09:45:00Z'),
  },
  {
    id: '4',
    name: 'Final Report',
    description: 'Final report summarizing the project results.',
    content: 'The final report provides an overview of the project outcomes...',
    createdAt: new Date('2024-08-15T16:00:00Z'),
    updatedAt: new Date('2024-08-22T17:00:00Z'),
  },
  {
    id: '5',
    name: 'User Manual',
    description: 'User manual for the project deliverables.',
    content: 'The user manual includes instructions on how to use the project deliverables...',
    createdAt: new Date('2024-08-18T08:45:00Z'),
    updatedAt: new Date('2024-08-23T10:30:00Z'),
  },
];

export default MOCK_FILES;
