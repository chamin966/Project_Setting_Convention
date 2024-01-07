import styled, { css } from 'styled-components';
import theme from '../../styles/theme';

/**
 * **label**: 버튼 텍스트
 * **theme**: primary(default), secondary
 * **size**: large(default), medium, small
 * */
interface ButtonProps {
  label?: string; // 버튼에 표시되는 텍스트
  theme: string; // 버튼의 테마 설정: primary(기본값), secondary
  size: string; // 버튼의 크기 설정: large(기본값), medium, small
}

/**
 * CommonButton의 기본 속성을 설정합니다.
 */
CommonButton.defaultProps = {
  theme: 'primary',
  size: 'medium',
};

/**
 * CommonButton 함수는 ButtonProps를 입력값으로 받아 Button 컴포넌트를 반환합니다.
 */
function CommonButton(props: ButtonProps) {
  return (
    <Button size={props.size} theme={props.theme}>
      {props.label}
    </Button>
  );
}

export default CommonButton;

/**
 * 버튼의 크기에 대한 속성을 정의한 Size 타입입니다.
 */
type Size = {
  [key: string]: {
    padding: string;
    fontSize: string;
  };
};

/**
 * 버튼의 테마에 대한 속성을 정의한 Theme 타입입니다.
 */
type ButtonTheme = {
  [key: string]: {
    backgroundColor: string;
    color: string;
    border?: string;
  };
};

/**
 * 버튼의 크기에 대한 기본값을 정의한 객체입니다.
 */
const sizes: Size = {
  large: {
    padding: '20px 25px',
    fontSize: '20px',
  },
  medium: {
    padding: '15px 20px',
    fontSize: '17px',
  },
  small: {
    padding: '10px 15px',
    fontSize: '15px',
  },
};

/**
 * 버튼의 테마에 대한 기본값을 정의한 객체입니다.
 */
// css 코드가 아닌 js 객체 코드에서는 파일로 임포트 해오면 된다.
const buttonThemes: ButtonTheme = {
  primary: {
    backgroundColor: theme.palette.white,
    color: theme.palette.black,
  },
  secondary: {
    backgroundColor: theme.palette.main,
    color: theme.palette.black,
  },
  pink: {
    backgroundColor: theme.palette.pink,
    color: theme.palette.black,
    border: `5px solid ${theme.palette.green}`,
  },
};

/**
 * 버튼의 크기에 따른 스타일을 설정하는 CSS 코드입니다.
 */
const sizeStyles = css<ButtonProps>`
  ${(props) => css`
    padding: ${sizes[props.size].padding};
    font-size: ${sizes[props.size].fontSize};
  `}
`;

/**
 * 버튼의 테마에 따른 스타일을 설정하는 CSS 코드입니다.
 */
const themeStyles = css<ButtonProps>`
  ${(props) => css`
    background-color: ${buttonThemes[props.theme].backgroundColor};
    color: ${buttonThemes[props.theme].color};
    border: ${buttonThemes[props.theme].border};
  `}
`;

/**
 * 버튼 컴포넌트를 styled-components를 사용하여 생성합니다.
 */
const Button = styled.button<ButtonProps>`
  /* 기본값 */
  border-radius: 6px;
  border: 1px solid ${theme.palette.main};
  font-weight: 700;

  /* size */
  ${sizeStyles}

  /* theme */
  ${themeStyles}
`;
