import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import dummyData from "../dummyData";
import { useState } from "react";
import Card from "./Card";

const Main = () => {
  const onDragEnd = (result) => {
    const { source, destination } = result;

    //別のカラムに移動したとき
    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const destColIndex = data.findIndex((e) => e.id === destination.droppableId);

      const sourceCol = data[sourceColIndex];
      const destCol = data[destColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destTask = [...destCol.tasks];

      //タスクを削除
      const [removed] = sourceTask.splice(source.index, 1);

      //タスクを追加
      destTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;
      data[destColIndex].tasks = destTask;
      setData(data);
    } else {
      //同じカラム内でのタスクの入れ替え
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);

      const sourceCol = data[sourceColIndex];

      const sourceTask = [...sourceCol.tasks];

      //タスクを削除
      const [removed] = sourceTask.splice(source.index, 1);

      //タスクを追加
      sourceTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;
      setData(data);
    }
  };

  const [data, setData] = useState(dummyData);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="trello">
        {data.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div
                className="trello__section"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="trello-section-title">{section.title}</div>
                <div className="trello-section-content">
                  {section.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? "0.5" : "1",
                          }}
                        >
                          <Card>{task.title}</Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Main;
