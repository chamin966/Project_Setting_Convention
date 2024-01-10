import React, { useRef, forwardRef, useContext, useEffect } from "react";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";
import { useAutoAnimate } from "@formkit/auto-animate/react";

// Context
import demoData from "../Data/demoData";
import { blockContext } from "../pages/DemoPage";
const debounce = (func, timeout = 1000) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};

const findBy = (find) => (tree, _parent) => {
  for (const key in tree) {
    // console.log(" tree: ", tree);
    // console.log(" _parent: ", _parent);
    // console.log("key값: ", key);
    // console.log("tree[key]값: ", tree[key]);
    if (find(tree[key])) return [tree[key], _parent || tree];
    if (typeof tree[key] === "object") {
      const result = findBy(find)(tree[key], tree);
      if (result) return result;
    }
  }
  return false;
};

const removeBy = (find) => (tree) => {
  for (const key in tree) {
    if (find(tree[key])) {
      tree.splice(tree.indexOf(tree[key]), 1);
      return tree;
    }
    if (typeof tree[key] === "object") {
      const result = removeBy(find)(tree[key]);
      if (result) return tree;
    }
  }
  return false;
};

const deepCopyObj = (obj) => {
  let clone, value, key;

  if (typeof obj !== "object" || obj === null) return obj;
  clone = Array.isArray(obj) ? [] : {};

  for (key in obj) {
    value = obj[key];
    clone[key] = deepCopyObj(value);
  }

  return clone;
};

const findIndex = (id, array) => array.findIndex((x) => x.id === id);

// --------------------------------------------------

const COLUMN = forwardRef((props, ref) => {
  const { blockState, isDragging, className, ...rest } = props;
  let classNames = [
    "column",
    className,
    isDragging ? "is-dragging" : "is-not-dragging",
  ];

  return (
    <div ref={ref} className={`${classNames.join(" ")}`}>
      <p>
        {blockState.type} - {blockState.id}
      </p>
      {props.children}
    </div>
  );
});
COLUMN.displayName = "column";

const SLOT = forwardRef((props, ref) => {
  const { blockState, isDragging, className, ...rest } = props;
  let classNames = [
    "slot",
    className,
    isDragging ? "is-dragging" : "is-not-dragging",
  ];

  return (
    <div ref={ref} className={`${classNames.join(" ")}`}>
      <p>
        {blockState.type} - {blockState.id}
      </p>
      {props.children}
    </div>
  );
});
SLOT.displayName = "slot";

const COMPONENT = forwardRef((props, ref) => {
  const { blockState, isDragging, className, ...rest } = props;
  let classNames = [
    "component",
    className,
    isDragging ? "is-dragging" : "is-not-dragging",
  ];

  return (
    <div ref={ref} className={`${classNames.join(" ")}`}>
      <p>
        {blockState.type} - {blockState.id}
      </p>
      {props.children}
    </div>
  );
});
COMPONENT.displayName = "com";

// prettier-ignore
const resolvePath = (id, _return = {}) => (blocks, _depth = 0) => {
  _depth++
  const parent = findBy((x) => x.id === id)(blocks);
  if(_return && Object.keys(_return).length === 0) _return = { blockIndex: null, slotIndex: null, componentIndex: null }
  
  if(parent.length === 2 && parent[1].hasOwnProperty("id")){
    if(parent[0].type === "SLOT" && parent[1].children) _return.slotIndex = findIndex(parent[0].id, parent[1].children);
    if(parent[0].type === "COMPONENT" && parent[1].type === "SLOT" && parent[1].children) _return.componentIndex = findIndex(parent[0].id, parent[1].children);
    
    resolvePath(parent[1].id, _return)(blocks, _depth);
  }else{
    _return.blockIndex = findIndex(id, blocks);
  }
  
  return _return;
};

// prettier-ignore
const moveTo = (node, target, path = null) => (tree, _parent = null, _treeOriginal) => {
  if(_parent === null) _treeOriginal = tree;
  
  for (const key in tree) {
    if (target(tree[key])) {
      
      // Top level
      if(_parent === null){
        if(node[0].type === "SLOT" && tree[key].type === "COLUMN") tree[key].children.push(node[0]);
        else tree.splice(path.blockIndex, 0, node[0]);
      }else{
        if(node[0].type === "COMPONENT"){
          if(tree[key].type === "SLOT") tree[path.slotIndex].children.unshift(node[0]);
          else _parent.children.splice(path.componentIndex, 0, node[0]);
        }
        if(node[0].type === "COLUMN"){
          if(tree[key].type === "SLOT" || tree[key].type === "COMPONENT")_treeOriginal.splice(path.blockIndex, 0, node[0]);
        }
        if(node[0].type === "SLOT"){
          if(tree[key].type === "COMPONENT" && _parent.type === "SLOT" && _treeOriginal[path.blockIndex].type === "COLUMN") {
            _treeOriginal[path.blockIndex].children.splice(path.slotIndex, 0, node[0]);
          }
          else _parent.children.splice(path.slotIndex, 0, node[0]);
        }
      }
      
      return tree
    }
    if (typeof tree[key] === "object") {
      const result = moveTo(node, target, path)(tree[key], tree, _treeOriginal);
      if (result) return result;
    }
  }
};

const handleHover = debounce((obj) => {
  const { dragItem, dragId, dropId, movement, blocks, setBlocks } = obj;
  const draggingBlock = findBy((x) => x.id === dragId)(blocks); // returns [block, parent]
  const hoveringOnTopOfBlock = findBy((x) => x.id === dropId)(blocks); // returns [block, parent]

  // Restrict drag movement (nesting of non nestable objects)
  if (
    draggingBlock[1]?.id === dropId ||
    !hoveringOnTopOfBlock[0] ||
    !draggingBlock[0]
  )
    return;
  if (
    dragItem.type === "SLOT" &&
    hoveringOnTopOfBlock[0].type === "COMPONENT" &&
    !hoveringOnTopOfBlock[1].hasOwnProperty("type")
  )
    return;

  // Resolve path From and to drag (in state)
  const pathFrom = resolvePath(dragId)(blocks);
  const pathTo = resolvePath(dropId)(blocks);

  console.log("pathFrom: ", pathFrom);
  console.log("pathTo: ", pathTo);

  // Clone block statex
  const blocksClone = deepCopyObj(blocks);

  // Move dragged block to new position
  removeBy((x) => x.id === dragId)(blocksClone);
  moveTo(draggingBlock, (x) => x.id === dropId, pathTo)(blocksClone);

  // Update state
  setBlocks(blocksClone);
  dragItem.lastUpdate = Date.now();
}, 120);

const RenderChildren = (props) => {
  const { blockState, ...rest } = props;
  return (
    blockState &&
    blockState.children &&
    blockState.children.map((child) => {
      return <RenderBlocks key={child.id} blockState={child} {...rest} />;
    })
  );
};

const RenderBlocks = (props) => {
  const { blockState, ...rest } = props;

  const { blocks, setBlocks } = useContext(blockContext);
  const [ref, enableAnimations] = useAutoAnimate({ duration: 0 });

  // const ref = useRef(null); // No animations

  const [{ isOver, dragId, dropId, movement }, drop] = useDrop({
    accept: "ITEM",
    hover: (dragItem, monitor) => {
      if (!dragId || !isOver || dragId === dropId || !dragItem) return;
      if (dragItem.prevId === dropId) return;
      if (Date.now() - dragItem.lastUpdate < 250) return;

      handleHover({ dragItem, dragId, dropId, movement, blocks, setBlocks });

      dragItem.prevId = dropId;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      dropId: blockState.id || null,
      dragId: monitor.getItem()?.id || null,
      movement: {
        x: monitor.getDifferenceFromInitialOffset()?.x,
        y: monitor.getDifferenceFromInitialOffset()?.y,
        dominant:
          Math.abs(monitor.getDifferenceFromInitialOffset()?.x) >
          Math.abs(monitor.getDifferenceFromInitialOffset()?.y)
            ? "x"
            : "y",
        direction:
          Math.abs(monitor.getDifferenceFromInitialOffset()?.x) >
          Math.abs(monitor.getDifferenceFromInitialOffset()?.y)
            ? monitor.getDifferenceFromInitialOffset()?.x > 0
              ? "right"
              : "left"
            : Math.abs(monitor.getDifferenceFromInitialOffset()?.x) <
                Math.abs(monitor.getDifferenceFromInitialOffset()?.y)
              ? monitor.getDifferenceFromInitialOffset()?.y > 0
                ? "down"
                : "up"
              : null,
      },
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    type: "ITEM",
    item: (monitor) => {
      return {
        id: blockState.id,
        type: blockState.type,
        previousActions: [],
        prevId: null,
        lastUpdate: null,
      };
    },
    isDragging(monitor) {
      return monitor.getItem().id === blockState.id;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  if (blockState.type === "COLUMN")
    return (
      <COLUMN
        ref={ref}
        blockState={blockState}
        isDragging={isDragging}
        {...rest}
      >
        <RenderChildren {...props} blockState={blockState} />
      </COLUMN>
    );
  else if (blockState.type === "SLOT")
    return (
      <SLOT ref={ref} blockState={blockState} isDragging={isDragging} {...rest}>
        <RenderChildren {...props} blockState={blockState} />
      </SLOT>
    );
  else if (blockState.type === "COMPONENT")
    return (
      <COMPONENT
        ref={ref}
        blockState={blockState}
        isDragging={isDragging}
        {...rest}
      />
    );
  else
    return (
      // prettier-ignore
      <p><strong>Error:</strong> the component could not be loaded!</p>
    );
};

const DemoTest = () => {
  const { blocks, setBlocks } = useContext(blockContext);
  // const [ref] = useAutoAnimate({ duration: 0 });
  const ref = useRef(null); // No animations

  useEffect(() => {
    setBlocks(demoData);
  }, [setBlocks]);

  return (
    <Component className="App" ref={ref}>
      <h1>React DnD nested</h1>

      {blocks && (
        <DndProvider>
          {blocks.map((block) => (
            <RenderBlocks key={block.id} blockState={block} />
          ))}
        </DndProvider>
      )}
    </Component>
  );
};

export default DemoTest;

// Styles
const Component = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: black;
  padding: 20px;
  color: white;

  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  .column,
  .slot,
  .component {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    width: 100%;
    min-height: 60px;

    padding: 1.5rem;

    background: #000;
    border-radius: 4px;
    cursor: grab;

    p {
      position: absolute;
      top: -6px;
      left: 10px;
      color: white;

      padding: 0.2rem;

      line-height: 90%;
      font-size: 0.7rem;

      border-radius: 1000px;
      background: #000;
      z-index: 100;
    }
  }

  .column {
    border: solid blue 1px;
    flex-direction: row;
  }
  .slot {
    border: solid yellow 1px;
    flex: 1;
  }
  .component {
    border: solid green 1px;
  }

  &:active {
    cursor: grabbing;
  }

  .is-dragging {
    pointer-events: none;
    opacity: 0.2 !important;
  }
`;
