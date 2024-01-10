import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { ItemTypes } from "../../Data/itemType";
import { Identifier, XYCoord } from "dnd-core";
import styled from "styled-components";

// 컨트롤 컴포넌트의 매개변수 정의
export interface ControlProps {
  id: string;
  text: string;
  index: number;
  moveControl: (dragIndex: number, hoverIndex: number) => void;
}

// 스타일드 컴포넌트에서 사용할 프롭스 타입 정의
interface StyledControlProps {
  isDragging: boolean;
}

// 드래그 아이템 매개변수 정의
interface DragItem {
  index: number;
  id: string;
  type: string;
}

// 컨트롤 컴포넌트 정의
function Control({ id, text, index, moveControl }: ControlProps) {
  // 컨트롤의 DOM 요소에 대한 참조 생성
  const ref = useRef<HTMLDivElement>(null);

  // 드래그 앤 드롭을 위한 훅 사용
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CONTROL,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item: DragItem, monitor) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      // 같은 아이템끼리는 교체하지 않음
      if (dragIndex === hoverIndex) return;

      // 화면에서 아이템의 사각 영역 결정
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      // 수직 중앙 위치 확인
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // 마우스 위치 확인
      const clientOffset = monitor.getClientOffset();

      // 위쪽부터의 픽셀 값 확인
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // 마우스가 아이템 높이의 반 이상을 넘어간 경우에만 이동 수행
      // 아래로 드래깅할 때는 커서가 50% 이상 아래에 있을 때만 이동
      // 위로 드래깅할 때는 커서가 50% 이상 위에 있을 때만 이동
      // 아닌 경우에는 이동하지 않음

      // 아래로 드래깅
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

      // 위로 드래깅
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      // 실제로 이동 수행
      moveControl(dragIndex, hoverIndex);

      // 주의: 여기서 모니터 아이템을 직접 변경하고 있습니다!
      // 일반적으로 불변성을 유지하는 것이 좋습니다.
      // 그러나 성능을 위해 여기서는 비싼 인덱스 검색을 피하기 위해 변경하고 있습니다.
      // TODO: 나중에 스테이트 관리로 변경
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CONTROL,
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  return (
    <StyledControl
      ref={ref}
      isDragging={isDragging}
      data-handler-id={handlerId}
    >
      {text}
    </StyledControl>
  );
}

export default Control;

const StyledControl = styled.div<StyledControlProps>`
  border: 1px dashed gray;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  background-color: gray;
  cursor: move;
  opacity: ${(props) => (props.isDragging ? "0.5" : "1")};
`;
