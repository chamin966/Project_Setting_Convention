export const initFormData = {
  form: {
    id: 'form',
    sectionOrder: ['section-1'],
    sections: [
      {
        id: 'section-1',
        title: 'Section1',
        rowOrder: ['row-1', 'row-2'],
        rows: [
          {
            id: 'row-1',
            title: 'row1-title',
            columnOrder: ['column-1', 'column-2'],
            columns: [
              {
                id: 'column-1',
                title: 'column1',
                controlOrder: ['con-1', 'con-2'],
                controls: [
                  {
                    id: 'con-1',
                    title: 'con1',
                    parents: {
                      form: 'form',
                      section: 'section-1',
                      row: 'row-1',
                      column: 'column-1',
                    },
                  },
                  {
                    id: 'con-2',
                    title: 'con2',
                    parents: {
                      form: 'form',
                      section: 'section-1',
                      row: 'row-1',
                      column: 'column-1',
                    },
                  },
                ],
              },
              {
                id: 'column-2',
                title: 'column2',
                controlOrder: ['con-3', 'con-4'],
                controls: [
                  {
                    id: 'con-3',
                    title: 'con3',
                    parents: {
                      form: 'form',
                      section: 'section-1',
                      row: 'row-1',
                      column: 'column-2',
                    },
                  },
                  {
                    id: 'con-4',
                    title: 'con4',
                    parents: {
                      form: 'form',
                      section: 'section-1',
                      row: 'row-1',
                      column: 'column-2',
                    },
                  },
                ],
              },
            ],
          },
          {
            id: 'row-2',
            title: 'row2',
            columnOrder: ['column-4', 'column-5', 'column-6'],
            columns: [
              {
                id: 'column-4',
                title: 'column4',
                controlOrder: ['con-5', 'con-6'],
                controls: [
                  {
                    id: 'con-5',
                    title: 'con5',
                    parents: {
                      form: 'form',
                      section: 'section-1',
                      row: 'row-2',
                      column: 'column-4',
                    },
                  },
                  {
                    id: 'con-6',
                    title: 'con6',
                    parents: {
                      form: 'form',
                      section: 'section-1',
                      row: 'row-2',
                      column: 'column-4',
                    },
                  },
                ],
              },
              {
                id: 'column-5',
                title: 'column5',
                controlOrder: ['con-7', 'con-8'],
                controls: [
                  {
                    id: 'con-7',
                    title: 'con7',
                    parents: {
                      form: 'form',
                      section: 'section-1',
                      row: 'row-2',
                      column: 'column-5',
                    },
                  },
                  {
                    id: 'con-8',
                    title: 'con8',
                    parents: {
                      form: 'form',
                      section: 'section-1',
                      row: 'row-2',
                      column: 'column-5',
                    },
                  },
                ],
              },
              {
                id: 'column-6',
                title: 'column6',
                controlOrder: ['con-9', 'con-10'],
                controls: [
                  {
                    id: 'con-9',
                    title: 'con9',
                    parents: {
                      form: 'form',
                      section: 'section-1',
                      row: 'row-2',
                      column: 'column-6',
                    },
                  },
                  {
                    id: 'con-10',
                    title: 'con10',
                    parents: {
                      form: 'form',
                      section: 'section-1',
                      row: 'row-2',
                      column: 'column-6',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};