// variables.js

import { css } from 'styled-components';

// 사용법
// 기본 설정값 사용  => flexSet()
// 바꾸고 싶어! => flexSet("column","space-between","center", "20px")

const variables = {
  flex: (
    direction = 'row',
    justify = 'center',
    align = 'center',
    gap = '0',
  ) => css`
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
    align-items: ${align};
    gap: ${gap};
  `,

  absoluteCenter: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};

export default variables;
