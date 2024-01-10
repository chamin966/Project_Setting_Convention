export interface Control {
  id: string;
  text: string;
}

export interface row {
  id: string;
  text: string;
  controls: Control[];
}

export const DndSample2: row[] = [
  {
    id: "row-1",
    text: "row1",
    controls: [
      {
        id: "con-1",
        text: "Write a cool JS library",
      },
      {
        id: "con-2",
        text: "Make it generic enough",
      },
      {
        id: "con-3",
        text: "Write README",
      },
    ],
  },
  {
    id: "row-1",
    text: "row2",
    controls: [
      {
        id: "con-1",
        text: "Write a cool JS library",
      },
      {
        id: "con-2",
        text: "Make it generic enough",
      },
      {
        id: "con-3",
        text: "Write README",
      },
    ],
  },
];
