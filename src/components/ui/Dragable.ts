interface DraggableElemEvents {
    dragStart: (e: DragEvent) => void;
    dragEnter?: (e: DragEvent) => void;
    dragLeave?: (e: DragEvent) => void;
    dragEnd?: (e: DragEvent) => void;
}

interface DroppableElemEvents {
    drop: (e: DragEvent) => void;
    dragEnter?: (e: DragEvent) => void;
    dragLeave?: (e: DragEvent) => void;
    dragOver?: (e: DragEvent) => void;
}

// Creates an element that can be dragged
// @param {DOM Node} elem - The element that can be dragged
// @param {Event[]} events - The events that need to be used in the drag process
export function CreateDraggable(elem: HTMLElement, events: DraggableElemEvents) {
    elem.setAttribute('draggable', 'true');
    elem.addEventListener('dragstart', events.dragStart);
    if(events.dragEnter) elem.addEventListener('dragenter', events.dragEnter);
    if(events.dragLeave) elem.addEventListener('dragleave', events.dragLeave);
    if(events.dragEnd) elem.addEventListener('dragend', events.dragEnd);
}
// Creates an area that can draggable items dropped in it
// @param {DOM Node} elem - The element that is going to be a drop zone
// @param {Event[]} events - The drop zone events used in the drap process
export function CreateDropable(elem: HTMLElement, events: DroppableElemEvents) {
    elem.addEventListener('drop', events.drop);
    if(events.dragEnter) elem.addEventListener('dragenter', events.dragEnter);
    if(events.dragLeave) elem.addEventListener('dragleave', events.dragLeave);
    if(events.dragOver) elem.addEventListener('dragover', events.dragOver);
}