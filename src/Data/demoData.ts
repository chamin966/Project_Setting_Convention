const demoData = [
  { id: 1, type: 'COMPONENT', render: 'Image' },
  { id: 2, type: 'COMPONENT', render: 'Image' },
  {
    id: 3,
    type: 'COLUMN',
    children: [
      {
        id: 4,
        type: 'SLOT',
        children: [
          { id: 5, type: 'COMPONENT', render: 'Image' },
          { id: 6, type: 'COMPONENT', render: 'Image' },
        ],
      },
    ],
  },
  { id: 7, type: 'COMPONENT', render: 'Image' },
  {
    id: 8,
    type: 'COLUMN',
    children: [
      {
        id: 9,
        type: 'SLOT',
        children: [{ id: 10, type: 'COMPONENT', render: 'Image' }],
      },
      {
        id: 11,
        type: 'SLOT',
        children: [
          { id: 12, type: 'COMPONENT', render: 'Image' },
          { id: 13, type: 'COMPONENT', render: 'Image' },
          { id: 14, type: 'COMPONENT', render: 'Image' },
          { id: 15, type: 'COMPONENT', render: 'Image' },
        ],
      },
      {
        id: 16,
        type: 'SLOT',
        children: [
          { id: 17, type: 'COMPONENT', render: 'Image' },
          { id: 18, type: 'COMPONENT', render: 'Image' },
        ],
      },
    ],
  },
];

export default demoData;
