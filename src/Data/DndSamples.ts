export interface IControl {
  id: string;
  text: string;
}

export const controlsHorizontalSample: IControl[] = [
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
  {
    id: "con-4",
    text: "Create some examples",
  },
  {
    id: "con-5",
    text: "Spam in Twitter and IRC to promote it (note that this element is taller than the others)Spam in Twitter and IRC to promote it (note that this element is taller than the others)Spam in Twitter and IRC to promote it (note that this element is taller than the others)Spam in Twitter and IRC to promote it (note that this element is taller than the others)Spam in Twitter and IRC to promote it (note that this element is taller than the others)Spam in Twitter and IRC to promote it (note that this element is taller than the others)Spam in Twitter and IRC to promote it (note that this element is taller than the others)Spam in Twitter and IRC to promote it (note that this element is taller than the others)Spam in Twitter and IRC to promote it (note that this element is taller than the others)",
  },
  {
    id: "con-6",
    text: "I want go Home.",
  },
  {
    id: "con-7",
    text: "PROFIT",
  },
];

export const ControlsSample: IControl[] = [
  {
    id: "con-8",
    text: "가나다라마바사",
  },
  {
    id: "con-9",
    text: "아자차카타파하",
  },
  {
    id: "con-10",
    text: "한글로 쓰면 구분이 잘되겠죠?",
  },
  {
    id: "con-11",
    text: "이건 컬럼이에요",
  },
  {
    id: "con-12",
    text: "말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠",
  },
  {
    id: "con-13",
    text: "새벽 2시",
  },
  {
    id: "con-14",
    text: "프로이트",
  },
];

export interface IColumn {
  id: string;
  type: string;
  text: string;
  controls: IControl[];
}

export const ColumnSample: IColumn[] = [
  {
    id: "column-1",
    type: "column",
    text: "column1",
    controls: [
      {
        id: "con-15",
        text: "가나다라마바사",
      },
      {
        id: "con-16",
        text: "아자차카타파하",
      },
    ],
  },
  {
    id: "column-2",
    type: "column",
    text: "column2",
    controls: [
      {
        id: "con-17",
        text: "말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠말 그대로 세로죠",
      },
      {
        id: "con-18",
        text: "새벽 3시",
      },
      {
        id: "con-19",
        text: "라이브 코딩 디엔디",
      },
      {
        id: "con-20",
        text: "작명은 어려워요",
      },
    ],
  },
  {
    id: "column-3",
    type: "column",
    text: "column3",
    controls: [
      {
        id: "con-21",
        text: "룰루랄라",
      },
      {
        id: "con-22",
        text: "유튜브로 음악 들으면서 할 걸",
      },
      {
        id: "con-23",
        text: "뭐라고 써야 좋을 지 생각이 안나",
      },
      {
        id: "con-24",
        text: "새벽이야",
      },
    ],
  },
];
